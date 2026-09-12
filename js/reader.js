// Reader page: renders a Markdown publication (article, LinkedIn post, speaker script) from catalogue.json.
(function () {
  const { TYPE_LABEL, escapeHtml, hueOf, formatDate, extent, loadCatalogue, badge, formatsHtml, cardHtml, initTheme } = window.Pubs;
  const $ = (id) => document.getElementById(id);

  const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';

  const stripFrontmatter = (md) => md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
  // The title lives in the hero; drop a leading H1 so it is not repeated.
  const stripLeadingH1 = (md) => md.replace(/^\s*#\s+[^\n]+\n/, '');

  function fail(title, message) {
    $('title').textContent = title;
    $('content').innerHTML = `<div class="state"><h2>${escapeHtml(title)}</h2><p>${message}</p><a class="btn" href="./">Back to the catalogue</a></div>`;
    $('content').removeAttribute('aria-busy');
    document.title = `${title} — Publications`;
  }

  function renderHero(item) {
    document.title = `${item.title} — Publications`;
    $('hero').style.setProperty('--hue', hueOf(item.topic || item.id));
    const topicLink = item.topic ? `<a href="./?topic=${encodeURIComponent(item.topic)}">${escapeHtml(item.topic)}</a>` : '';
    $('eyebrow').innerHTML = [item.series ? escapeHtml(item.series) : '', topicLink].filter(Boolean).join(' · ') || escapeHtml(TYPE_LABEL[item.type]);
    $('title').textContent = item.title;
    $('lead').textContent = item.summary;
    $('meta').innerHTML = `${badge(item.type)}<time datetime="${item.date}">${formatDate(item.date)}</time><span>${escapeHtml(extent(item))}</span>`;
    $('tags').innerHTML = item.tags.map((t) => `<a class="tag" href="./?tags=${encodeURIComponent(t)}">${escapeHtml(t)}</a>`).join('');
    $('formats').innerHTML = formatsHtml(item);
    const desc = document.createElement('meta');
    desc.name = 'description';
    desc.content = item.summary;
    document.head.appendChild(desc);
  }

  // Resolve links and images relative to the Markdown file; route links to other catalogued .md files through the reader.
  function fixUrls(root, item, byPath) {
    const base = new URL(item.path, location.href);
    root.querySelectorAll('img[src]').forEach((img) => {
      img.src = new URL(img.getAttribute('src'), base).href;
      img.loading = 'lazy';
    });
    root.querySelectorAll('a[href]').forEach((a) => {
      const raw = a.getAttribute('href');
      if (raw.startsWith('#')) return;
      const url = new URL(raw, base);
      if (url.origin === location.origin) {
        const rel = decodeURIComponent(url.pathname).replace(new URL('.', location.href).pathname, '');
        const target = byPath.get(rel);
        a.href = target && target.type !== 'deck' ? `article.html?id=${encodeURIComponent(target.id)}${url.hash}` : url.href;
      } else {
        a.href = url.href;
        a.target = '_blank';
        a.rel = 'noopener';
      }
    });
  }

  function buildToc(root) {
    const used = new Set();
    const headings = [...root.querySelectorAll('h2, h3')];
    headings.forEach((h) => {
      let id = slugify(h.textContent);
      for (let n = 2; used.has(id); n++) id = `${slugify(h.textContent)}-${n}`;
      used.add(id);
      h.id = id;
    });
    const tocHeadings = headings.filter((h) => h.tagName === 'H2').length >= 3 ? headings : [];
    // Long scripts have many slide headings: keep the ToC to H2 when it would get unwieldy.
    const entries = tocHeadings.length > 40 ? tocHeadings.filter((h) => h.tagName === 'H2') : tocHeadings;
    if (entries.length < 3) return;

    const toc = $('toc');
    toc.innerHTML = `<h2>On this page</h2><ol>${entries.map((h) =>
      `<li class="lvl-${h.tagName[1]}"><a href="#${h.id}">${escapeHtml(h.textContent)}</a></li>`).join('')}</ol>`;
    toc.hidden = false;

    const links = new Map([...toc.querySelectorAll('a')].map((a) => [a.getAttribute('href').slice(1), a]));
    const observer = new IntersectionObserver((obs) => {
      const visible = obs.filter((o) => o.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      links.forEach((a) => a.classList.remove('active'));
      links.get(visible.target.id)?.classList.add('active');
    }, { rootMargin: '-70px 0px -70% 0px' });
    entries.forEach((h) => observer.observe(h));
  }

  function renderMore(item, items) {
    const siblingIds = new Set(item.siblings.map((s) => s.id));
    const pool = items.filter((o) => o.id !== item.id && !siblingIds.has(o.id));
    let related = item.series ? pool.filter((o) => o.series === item.series) : [];
    let heading = `More in ${item.series}`;
    if (!related.length) {
      related = pool
        .map((o) => ({ o, shared: o.tags.filter((t) => item.tags.includes(t)).length }))
        .filter((x) => x.shared > 0)
        .sort((a, b) => b.shared - a.shared || b.o.date.localeCompare(a.o.date))
        .map((x) => x.o);
      heading = 'Related publications';
    }
    // One card per topic, preferring articles, so the section is not full of duplicates.
    const seen = new Set();
    related = related.filter((o) => (o.topic && seen.has(o.topic) ? false : (seen.add(o.topic), true))).slice(0, 4);
    if (!related.length) return;
    $('more-title').textContent = heading;
    $('more-grid').innerHTML = related.map((o) => cardHtml(o)).join('');
    $('more').hidden = false;
    // Card tags link back to the catalogue filtered by that tag.
    $('more-grid').addEventListener('click', (e) => {
      const tag = e.target.closest('[data-tag]');
      if (tag) location.href = `./?tags=${encodeURIComponent(tag.dataset.tag)}`;
      const topic = e.target.closest('[data-topic]');
      if (topic) location.href = `./?topic=${encodeURIComponent(topic.dataset.topic)}`;
    });
  }

  async function init() {
    initTheme();
    $('year').textContent = new Date().getFullYear();
    const id = new URLSearchParams(location.search).get('id');
    if (!id) return fail('No publication selected', 'Open a publication from the catalogue.');

    let items;
    try {
      ({ items } = await loadCatalogue());
    } catch (err) {
      console.error(err);
      return fail('Catalogue unavailable', 'Could not load <code>catalogue.json</code>. Serve the site over HTTP (<code>npm start</code>).');
    }
    const item = items.find((i) => i.id === id);
    if (!item) return fail('Publication not found', `No publication with id <code>${escapeHtml(id)}</code>.`);
    if (item.type === 'deck') { location.replace(item.path); return; }

    renderHero(item);

    let md;
    try {
      const res = await fetch(item.path, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      md = await res.text();
    } catch (err) {
      console.error(err);
      return fail(item.title, `Could not load <code>${escapeHtml(item.path)}</code>.`);
    }
    if (!window.marked) return fail(item.title, 'The Markdown renderer could not be loaded (offline?).');

    const content = $('content');
    content.innerHTML = window.marked.parse(stripLeadingH1(stripFrontmatter(md)), { gfm: true });
    content.querySelectorAll('table').forEach((table) => {
      const wrap = document.createElement('div');
      wrap.className = 'table-wrap';
      table.replaceWith(wrap);
      wrap.appendChild(table);
    });
    fixUrls(content, item, new Map(items.map((i) => [i.path, i])));
    buildToc(content);
    content.removeAttribute('aria-busy');
    if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();

    renderMore(item, items);
  }

  init();
})();
