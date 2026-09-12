#!/usr/bin/env node
// Scans content/ and writes catalogue.json.
//   - Markdown files: metadata comes from the YAML frontmatter header.
//   - HTML decks: metadata comes from <meta name="catalogue:*"> tags in <head>.
// Folders whose name starts with "_" or "." are ignored (e.g. content/_legacy).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(ROOT, 'content');
const OUT = path.join(ROOT, 'catalogue.json');

const TYPES = ['article', 'deck', 'linkedin', 'script'];
const REQUIRED = ['title', 'date', 'type', 'tags', 'summary'];
const WORDS_PER_MINUTE = 230;
const SEARCH_TEXT_LIMIT = 8000;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith('_') || entry.name.startsWith('.')) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

// Minimal YAML subset: `key: value`, quoted strings, inline `[a, b]` lists and block `- item` lists.
export function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: null, body: source };
  const data = {};
  let listKey = null;
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && listKey) { data[listKey].push(scalar(item[1])); continue; }
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, raw] = kv;
    listKey = null;
    if (raw === '') { data[key] = []; listKey = key; }
    else if (raw.startsWith('[') && raw.endsWith(']')) {
      data[key] = raw.slice(1, -1).split(',').map((s) => scalar(s.trim())).filter(Boolean);
    } else data[key] = scalar(raw);
  }
  return { data, body: source.slice(match[0].length) };
}

function scalar(raw) {
  const s = raw.trim();
  if (s.startsWith('"') && s.endsWith('"')) return JSON.parse(s);
  if (s.startsWith("'") && s.endsWith("'")) return s.slice(1, -1).replace(/''/g, "'");
  return s;
}

function markdownToText(md) {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^[#>\-*|\s]+/gm, '')
    .replace(/[*_`|\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function decodeEntities(s) {
  return s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
}

function readDeckMeta(html) {
  const head = html.slice(0, html.indexOf('</head>') > 0 ? html.indexOf('</head>') : 20000);
  const meta = {};
  for (const m of head.matchAll(/<meta\s+name="([^"]+)"\s+content="([^"]*)"\s*\/?>/g)) {
    meta[m[1]] = decodeEntities(m[2]);
  }
  const title = head.match(/<title>([^<]*)<\/title>/);
  return {
    title: meta['catalogue:title'] || (title && decodeEntities(title[1])),
    date: meta['catalogue:date'],
    type: meta['catalogue:type'] || 'deck',
    series: meta['catalogue:series'],
    topic: meta['catalogue:topic'],
    tags: (meta.keywords || '').split(',').map((t) => t.trim()).filter(Boolean),
    summary: meta.description,
    cover: meta['catalogue:cover'],
  };
}

const toPosix = (p) => p.split(path.sep).join('/');
const idFrom = (rel) => toPosix(rel).replace(/\.(md|html)$/, '').split('/').pop();

const items = [];
const problems = [];

for (const file of walk(CONTENT)) {
  const ext = path.extname(file);
  if (ext !== '.md' && ext !== '.html') continue;
  const rel = toPosix(path.relative(ROOT, file));
  const dir = path.posix.dirname(rel);
  const source = fs.readFileSync(file, 'utf8');
  let meta, extra;

  if (ext === '.md') {
    const { data, body } = parseFrontmatter(source);
    if (!data) { problems.push(`${rel}: no frontmatter, skipped`); continue; }
    const text = markdownToText(body);
    const words = text.split(' ').filter(Boolean).length;
    const headings = [...body.matchAll(/^#{2,3}\s+(.+)$/gm)].map((m) => m[1].replace(/[*_`]/g, '').trim());
    meta = data;
    extra = { words, minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)), headings, text: text.slice(0, SEARCH_TEXT_LIMIT) };
  } else {
    if (!source.includes('name="catalogue:')) continue; // not a catalogued deck
    meta = readDeckMeta(source);
    extra = { slides: (source.match(/class=["']slide[\s"']/g) || []).length };
  }

  for (const key of REQUIRED) {
    if (!meta[key] || (Array.isArray(meta[key]) && !meta[key].length)) problems.push(`${rel}: missing "${key}"`);
  }
  if (meta.type && !TYPES.includes(meta.type)) problems.push(`${rel}: unknown type "${meta.type}"`);
  if (meta.date && !/^\d{4}-\d{2}-\d{2}$/.test(meta.date)) problems.push(`${rel}: date must be YYYY-MM-DD`);

  items.push({
    id: idFrom(rel),
    type: meta.type,
    title: meta.title,
    date: meta.date,
    series: meta.series || null,
    topic: meta.topic || null,
    tags: (meta.tags || []).map((t) => String(t).toLowerCase()),
    summary: meta.summary || '',
    cover: meta.cover ? path.posix.normalize(`${dir}/${meta.cover}`) : null,
    path: rel,
    ...extra,
  });
}

const ids = new Map();
for (const item of items) {
  if (ids.has(item.id)) problems.push(`duplicate id "${item.id}": ${ids.get(item.id)} and ${item.path}`);
  ids.set(item.id, item.path);
}

items.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

fs.writeFileSync(OUT, JSON.stringify({ generated: new Date().toISOString(), items }, null, 1) + '\n');

const byType = Object.fromEntries(TYPES.map((t) => [t, items.filter((i) => i.type === t).length]));
console.log(`catalogue.json: ${items.length} items`, byType);
if (problems.length) {
  console.warn(`\n${problems.length} problem(s):\n  - ${problems.join('\n  - ')}`);
  process.exitCode = 1;
}
