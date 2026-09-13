// Catalogue page: search, format/series/tag filters, sorting, card/list layout, URL-synced state.
(function () {
  const { TYPE_ORDER, TYPE_PLURAL, escapeHtml, normalize, loadCatalogue, cardHtml, initTheme } = window.Pubs;

  const TAGS_COLLAPSED = 14;
  const WEIGHTS = { title: 8, topic: 6, tags: 5, series: 3, summary: 3, headings: 1.5, text: 1 };

  const $ = (sel) => document.querySelector(sel);
  const els = {
    q: $('#q'), clear: $('#q-clear'), kbd: $('#kbd-hint'), types: $('#types'), series: $('#series'), topic: $('#topic'), sort: $('#sort'),
    tagbar: $('#tagbar'), results: $('#results'), count: $('#result-count'), reset: $('#reset'), stats: $('#stats'),
    filters: $('#filters'), filtersToggle: $('#filters-toggle'), filtersCount: $('#filters-count'),
    views: document.querySelectorAll('[data-view]'),
  };

  const state = { q: '', type: 'all', series: '', topic: '', tags: new Set(), sort: 'best', view: 'grid', tagsExpanded: false };
  let items = [];
  let tagOrder = [];

  // ---------- State <-> URL ----------
  function readUrl() {
    const p = new URLSearchParams(location.search);
    state.q = p.get('q') || '';
    state.type = TYPE_ORDER.includes(p.get('type')) ? p.get('type') : 'all';
    state.series = p.get('series') || '';
    state.topic = p.get('topic') || '';
    state.tags = new Set((p.get('tags') || '').split(',').map((t) => t.trim()).filter(Boolean));
    state.sort = ['best', 'newest', 'oldest', 'title'].includes(p.get('sort')) ? p.get('sort') : 'best';
    let storedView = null;
    try { storedView = localStorage.getItem('view'); } catch { /* ignore */ }
    state.view = p.get('view') || storedView || 'grid';
    if (!['grid', 'list'].includes(state.view)) state.view = 'grid';
  }
  function writeUrl() {
    const p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.type !== 'all') p.set('type', state.type);
    if (state.series) p.set('series', state.series);
    if (state.topic) p.set('topic', state.topic);
    if (state.tags.size) p.set('tags', [...state.tags].join(','));
    if (state.sort !== 'best') p.set('sort', state.sort);
    if (state.view !== 'grid') p.set('view', state.view);
    const qs = p.toString();
    history.replaceState(null, '', qs ? `?${qs}` : location.pathname);
  }

  // ---------- Search ----------
  const tokenize = (q) => normalize(q).split(/[\s,]+/).filter(Boolean);

  function prepare(item) {
    item._n = {
      title: normalize(item.title),
      topic: normalize(item.topic),
      tags: normalize(item.tags.join(' ')),
      series: normalize(item.series),
      summary: normalize(item.summary),
      headings: normalize((item.headings || []).join(' ')),
      text: normalize(item.text),
    };
  }

  // Every token must match somewhere; score favours title/tag hits.
  function score(item, tokens) {
    if (!tokens.length) return 0;
    let total = 0;
    for (const tok of tokens) {
      let best = 0;
      for (const [field, weight] of Object.entries(WEIGHTS)) {
        const hay = item._n[field];
        if (!hay) continue;
        const at = hay.indexOf(tok);
        if (at === -1) continue;
        const wordStart = at === 0 || /[^a-z0-9]/.test(hay[at - 1]);
        best = Math.max(best, weight * (wordStart ? 1.25 : 1));
      }
      if (!best) return -1;
      total += best;
    }
    return total;
  }

  function highlighter(tokens) {
    if (!tokens.length) return escapeHtml;
    const re = new RegExp(`(${tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    return (text) => escapeHtml(text).replace(re, '<mark>$1</mark>');
  }

  // ---------- Filtering ----------
  function matches(item, tokens, { ignoreType = false, ignoreTags = false } = {}) {
    if (!ignoreType && state.type !== 'all' && item.type !== state.type) return false;
    if (state.series && item.series !== state.series) return false;
    if (state.topic && item.topic !== state.topic) return false;
    if (!ignoreTags) for (const t of state.tags) if (!item.tags.includes(t)) return false;
    if (tokens.length && item._score < 0) return false;
    return true;
  }

  // Same-day publications stay grouped by topic, article first, then deck, LinkedIn, script.
  const byTopic = (a, b) => (a.topic || a.id).localeCompare(b.topic || b.id) || TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type) || a.title.localeCompare(b.title);

  function compare(a, b) {
    const byDate = b.date.localeCompare(a.date) || byTopic(a, b);
    switch (state.sort) {
      case 'oldest': return a.date.localeCompare(b.date) || byTopic(a, b);
      case 'title': return a.title.localeCompare(b.title);
      case 'best': return (b._score - a._score) || byDate;
      default: return byDate;
    }
  }

  // ---------- Rendering ----------
  function renderTypes(tokens) {
    const counts = { all: 0 };
    for (const item of items) {
      if (!matches(item, tokens, { ignoreType: true })) continue;
      counts.all++;
      counts[item.type] = (counts[item.type] || 0) + 1;
    }
    const options = [['all', 'All'], ...TYPE_ORDER.map((t) => [t, TYPE_PLURAL[t]])];
    els.types.innerHTML = options.map(([value, label]) =>
      `<button type="button" data-type="${value}" aria-pressed="${state.type === value}">${label}<span class="count">${counts[value] || 0}</span></button>`
    ).join('');
  }

  function renderTags(tokens) {
    const counts = new Map();
    for (const item of items) {
      if (!matches(item, tokens)) continue;
      for (const t of item.tags) counts.set(t, (counts.get(t) || 0) + 1);
    }
    let shown = tagOrder;
    let hiddenCount = 0;
    if (!state.tagsExpanded) {
      const head = tagOrder.slice(0, TAGS_COLLAPSED);
      const extraSelected = tagOrder.slice(TAGS_COLLAPSED).filter((t) => state.tags.has(t));
      shown = [...head, ...extraSelected];
      hiddenCount = tagOrder.length - shown.length;
    }
    const chips = shown.map((t) => {
      const on = state.tags.has(t);
      const n = counts.get(t) || 0;
      return `<button type="button" class="tag${!on && !n ? ' is-dim' : ''}" data-tag="${escapeHtml(t)}" aria-pressed="${on}">${escapeHtml(t)}<span class="count">${n}</span></button>`;
    }).join('');
    const toggle = state.tagsExpanded
      ? '<button type="button" class="linklike" data-more="0">Fewer tags</button>'
      : hiddenCount > 0 ? `<button type="button" class="linklike" data-more="1">+${hiddenCount} more</button>` : '';
    els.tagbar.innerHTML = `<span class="tagbar-label">Tags</span>${chips}${toggle}`;
  }

  // The filter panel only collapses on phones; the button that opens it is
  // hidden by the stylesheet everywhere else, so this is a no-op on desktop.
  function activeFilterCount() {
    return (state.type !== 'all' ? 1 : 0) + (state.series ? 1 : 0) + (state.topic ? 1 : 0) + state.tags.size;
  }
  function setFiltersOpen(open) {
    els.filters.dataset.open = String(open);
    els.filtersToggle.setAttribute('aria-expanded', String(open));
  }
  const filtersCollapsible = () => getComputedStyle(els.filtersToggle).display !== 'none';
  function revealFilters() {
    if (filtersCollapsible()) setFiltersOpen(true);
    els.tagbar.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function render() {
    const tokens = tokenize(state.q);
    for (const item of items) item._score = score(item, tokens);

    renderTypes(tokens);
    renderTags(tokens);

    const results = items.filter((item) => matches(item, tokens)).sort(compare);
    const hl = highlighter(tokens);

    els.results.classList.toggle('is-list', state.view === 'list');
    els.views.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === state.view)));
    els.q.value !== state.q && (els.q.value = state.q);
    els.clear.hidden = !state.q;
    els.kbd.hidden = !!state.q;
    els.series.value = state.series;
    els.topic.value = state.topic;
    els.sort.value = state.sort;

    const active = activeFilterCount();
    els.filtersCount.textContent = active;
    els.filtersCount.hidden = !active;
    els.filtersToggle.setAttribute('aria-label', active ? `Filters (${active} active)` : 'Filters');

    const filtered = state.q || state.type !== 'all' || state.series || state.topic || state.tags.size;
    els.reset.hidden = !filtered;
    els.count.innerHTML = filtered
      ? `<b>${results.length}</b> of ${items.length} publications`
      : `<b>${items.length}</b> publications`;

    if (!results.length) {
      els.results.classList.remove('is-list');
      els.results.innerHTML = `
        <div class="state" style="grid-column:1/-1">
          <h2>No publication matches</h2>
          <p>Try fewer words, another format, or remove a tag${state.tags.size > 1 ? 's' : ''}.</p>
          <button type="button" class="btn" data-reset>Clear all filters</button>
        </div>`;
    } else {
      els.results.innerHTML = results.map((item) => cardHtml(item, { highlight: hl, activeTags: state.tags })).join('');
    }
    writeUrl();
  }

  function renderStats() {
    const count = (t) => items.filter((i) => i.type === t).length;
    const topics = new Set(items.map((i) => i.topic)).size;
    els.stats.innerHTML = [
      `<span><b>${count('article')}</b> articles</span>`,
      `<span><b>${count('deck')}</b> decks</span>`,
      `<span><b>${count('linkedin')}</b> LinkedIn posts</span>`,
      `<span><b>${count('script')}</b> speaker scripts</span>`,
      `<span><b>${topics}</b> topics</span>`,
    ].join('');
  }

  // ---------- Events ----------
  function bind() {
    let timer;
    els.q.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => { state.q = els.q.value.trim(); render(); }, 120);
    });
    els.q.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { state.q = ''; els.q.value = ''; render(); }
    });
    els.clear.addEventListener('click', () => { state.q = ''; els.q.value = ''; render(); els.q.focus(); });

    els.types.addEventListener('click', (e) => {
      const b = e.target.closest('[data-type]');
      if (!b) return;
      state.type = b.dataset.type;
      render();
    });
    els.filtersToggle.addEventListener('click', () => {
      setFiltersOpen(els.filters.dataset.open !== 'true');
    });
    els.series.addEventListener('change', () => { state.series = els.series.value; render(); });
    els.topic.addEventListener('change', () => { state.topic = els.topic.value; render(); });
    els.sort.addEventListener('change', () => { state.sort = els.sort.value; render(); });
    els.views.forEach((b) => b.addEventListener('click', () => {
      state.view = b.dataset.view;
      try { localStorage.setItem('view', state.view); } catch { /* ignore */ }
      render();
    }));

    // Tag chips live both in the tag bar and on cards.
    document.addEventListener('click', (e) => {
      const tag = e.target.closest('[data-tag]');
      if (tag) {
        const t = tag.dataset.tag;
        state.tags.has(t) ? state.tags.delete(t) : state.tags.add(t);
        render();
        if (tag.closest('.card')) revealFilters();
        return;
      }
      const topic = e.target.closest('[data-topic]');
      if (topic) {
        state.topic = state.topic === topic.dataset.topic ? '' : topic.dataset.topic;
        render();
        revealFilters();
        return;
      }
      const more = e.target.closest('[data-more]');
      if (more) { state.tagsExpanded = more.dataset.more === '1'; render(); return; }
      if (e.target.closest('[data-reset]') || e.target === els.reset) {
        Object.assign(state, { q: '', type: 'all', series: '', topic: '', sort: 'best' });
        state.tags.clear();
        render();
      }
    });

    document.addEventListener('keydown', (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) { e.preventDefault(); els.q.focus(); els.q.select(); }
    });
  }

  async function init() {
    initTheme();
    document.getElementById('year').textContent = new Date().getFullYear();
    readUrl();
    try {
      ({ items } = await loadCatalogue());
    } catch (err) {
      els.results.innerHTML = `
        <div class="state" style="grid-column:1/-1">
          <h2>Catalogue unavailable</h2>
          <p>Could not load <code>catalogue.json</code>. Run <code>npm run build</code>, then serve the folder over HTTP (<code>npm start</code>) — browsers block <code>fetch</code> on <code>file://</code> pages.</p>
        </div>`;
      console.error(err);
      return;
    }
    items.forEach(prepare);

    const freq = new Map();
    items.forEach((i) => i.tags.forEach((t) => freq.set(t, (freq.get(t) || 0) + 1)));
    tagOrder = [...freq.keys()].sort((a, b) => freq.get(b) - freq.get(a) || a.localeCompare(b));
    state.tags = new Set([...state.tags].filter((t) => freq.has(t)));

    const series = [...new Set(items.map((i) => i.series).filter(Boolean))].sort();
    els.series.innerHTML = '<option value="">All series</option>' + series.map((s) => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('');
    if (state.series && !series.includes(state.series)) state.series = '';

    const topics = [...new Set(items.map((i) => i.topic).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    els.topic.innerHTML = '<option value="">All topics</option>' + topics.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join('');
    if (state.topic && !topics.includes(state.topic)) state.topic = '';

    renderStats();
    bind();
    render();
    // Arriving from a tag or topic link: show the panel so the active filter is
    // visible rather than silently hidden behind the collapsed button.
    if (activeFilterCount() && filtersCollapsible()) setFiltersOpen(true);
  }

  init();
})();
