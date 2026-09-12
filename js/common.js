// Shared helpers for the catalogue and reader pages.
(function () {
  const TYPE_ORDER = ['article', 'deck', 'linkedin', 'script'];
  const TYPE_LABEL = { article: 'Article', deck: 'Deck', linkedin: 'LinkedIn', script: 'Script' };
  const TYPE_PLURAL = { article: 'Articles', deck: 'Decks', linkedin: 'LinkedIn', script: 'Scripts' };

  const ICONS = {
    article: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 11h7M9 14.5h7M9 18h4.5"/></svg>',
    deck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4M8.5 20h7M7 12l3-3 2.5 2L17 7"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.5c0-1.9 1.2-3 2.6-3s2.4 1 2.4 3V17"/></svg>',
    script: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/></svg>',
  };

  const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const normalize = (s) => String(s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  function hueOf(key) {
    let h = 0;
    for (const ch of String(key || '')) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    return h % 360;
  }

  const dateFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const formatDate = (iso) => (iso ? dateFmt.format(new Date(iso + 'T00:00:00')) : '');

  function itemHref(item) {
    return item.type === 'deck' ? item.path : `article.html?id=${encodeURIComponent(item.id)}`;
  }
  function linkAttrs(item) {
    return item.type === 'deck' ? ' target="_blank" rel="noopener"' : '';
  }
  function extent(item) {
    if (item.type === 'deck') return item.slides ? `${item.slides} slides` : 'Slides';
    return `${item.minutes} min read`;
  }
  function shortTitle(title) {
    return title.split(/\s[—–-]\s|:\s/)[0];
  }

  let catalogue = null;
  async function loadCatalogue() {
    if (catalogue) return catalogue;
    const res = await fetch('catalogue.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(`catalogue.json: HTTP ${res.status}`);
    const data = await res.json();
    const items = data.items;
    const byTopic = new Map();
    for (const item of items) {
      if (!item.topic) continue;
      if (!byTopic.has(item.topic)) byTopic.set(item.topic, []);
      byTopic.get(item.topic).push(item);
    }
    for (const item of items) {
      item.siblings = (byTopic.get(item.topic) || [])
        .filter((o) => o.id !== item.id)
        .sort((a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type));
    }
    catalogue = { ...data, items };
    return catalogue;
  }

  function badge(type, extraClass = '') {
    return `<span class="badge t-${type} ${extraClass}">${escapeHtml(TYPE_LABEL[type] || type)}</span>`;
  }

  function formatsHtml(item) {
    if (!item.siblings || !item.siblings.length) return '';
    const sameType = (s) => item.siblings.filter((o) => o.type === s.type).length > 1;
    const links = item.siblings.map((s) =>
      `<a class="badge t-${s.type}" href="${escapeHtml(itemHref(s))}"${linkAttrs(s)} title="${escapeHtml(s.title)}">${escapeHtml(TYPE_LABEL[s.type])}${sameType(s) ? ` · ${escapeHtml(s.type === 'deck' ? s.slides : s.minutes + ' min')}` : ''}</a>`
    ).join('');
    return `<div class="formats"><span>Also as</span>${links}</div>`;
  }

  // Renders one card. `opts.highlight(text)` returns HTML with <mark>s; `opts.activeTags` is a Set.
  function cardHtml(item, opts = {}) {
    const hl = opts.highlight || escapeHtml;
    const active = opts.activeTags || new Set();
    const href = escapeHtml(itemHref(item));
    const cover = item.cover
      ? `<img src="${escapeHtml(item.cover)}" alt="" loading="lazy">`
      : '';
    const tags = item.tags.map((t) =>
      `<button type="button" class="tag" data-tag="${escapeHtml(t)}" aria-pressed="${active.has(t)}">${hl(t)}</button>`
    ).join('');
    return `
      <article class="card t-${item.type}">
        <div class="cover${item.cover ? ' has-img' : ''}" style="--hue:${hueOf(item.topic || item.id)}" aria-hidden="true">
          ${cover}
          <div class="cover-inner">
            <span class="cover-series">${escapeHtml(item.series || '')}</span>
            <span class="cover-word">${escapeHtml(item.topic || shortTitle(item.title))}</span>
            <span class="cover-glyph"><span>${escapeHtml(extent(item))}</span>${ICONS[item.type] || ''}</span>
          </div>
        </div>
        <div class="card-body">
          <div class="meta">${badge(item.type)}${item.topic ? `<button type="button" class="meta-topic" data-topic="${escapeHtml(item.topic)}" title="Show everything on this topic">${hl(item.topic)}</button>` : ''}<time datetime="${item.date}">${formatDate(item.date)}</time><span>${escapeHtml(extent(item))}</span></div>
          <h2><a href="${href}"${linkAttrs(item)}>${hl(item.title)}</a></h2>
          <p class="summary">${hl(item.summary)}</p>
          <div class="tags" aria-label="Tags">${tags}</div>
          ${formatsHtml(item)}
        </div>
      </article>`;
  }

  // Theme toggle: system → dark → light → system. Stored per browser.
  function initTheme() {
    const root = document.documentElement;
    const read = () => { try { return localStorage.getItem('theme'); } catch { return null; } };
    const write = (v) => { try { v ? localStorage.setItem('theme', v) : localStorage.removeItem('theme'); } catch { /* ignore */ } };
    const apply = (v) => { v ? root.setAttribute('data-theme', v) : root.removeAttribute('data-theme'); };
    apply(read());
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    const label = () => {
      const v = read();
      btn.title = `Theme: ${v || 'system'}`;
      btn.setAttribute('aria-label', btn.title);
    };
    label();
    btn.addEventListener('click', () => {
      const order = [null, 'dark', 'light'];
      const next = order[(order.indexOf(read()) + 1) % order.length];
      write(next); apply(next); label();
    });
  }

  window.Pubs = { TYPE_ORDER, TYPE_LABEL, TYPE_PLURAL, ICONS, escapeHtml, normalize, hueOf, formatDate, itemHref, linkAttrs, extent, loadCatalogue, badge, formatsHtml, cardHtml, initTheme };
})();
