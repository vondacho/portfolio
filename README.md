# Publications catalogue

A static HTML/CSS/JS site for browsing articles, HTML decks, LinkedIn posts and speaker scripts. It has search, format, series and tag filters, cards and list layouts, and a Markdown reader. It needs no framework and has no runtime dependencies other than [marked](https://marked.js.org/), loaded from a CDN by the reader.

```
index.html              catalogue (search, filters, cards/list)
article.html            reader for Markdown publications (?id=<file-name-without-extension>)
css/site.css            site styles (base.css, base-responsive.css, articles.css kept as inspiration)
js/common.js            shared helpers and card rendering
js/catalogue.js         catalogue page logic
js/reader.js            reader page logic
scripts/build-catalogue.mjs   scans content/ and writes catalogue.json
scripts/serve.mjs       local static server
content/                publications (folders starting with "_" are ignored, e.g. content/_legacy)
catalogue.json          generated — rebuild after adding or editing content
```

## Usage

```sh
npm start          # build catalogue.json, then serve on http://localhost:8080
npm run build      # only regenerate catalogue.json (exit code 1 if metadata is missing/invalid)
```

The pages load `catalogue.json` and the Markdown files with `fetch`, so they must be served over HTTP (local server, GitHub Pages, and so on). They do not work when opened from `file://`.

## Publishing to GitHub Pages

`.github/workflows/pages.yml` runs on every push to `main`, and can also be started by hand from the Actions tab. It rebuilds `catalogue.json` and deploys `index.html`, `article.html`, `css/`, `js/` and `content/` (without `content/_legacy`). The run fails before deploying if any publication has missing or invalid metadata.

One-time setup: in the repository, go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**. All links are relative, so the site works under a project path such as `https://<user>.github.io/<repo>/`.

## Adding a Markdown publication

Put the file anywhere under `content/`. Images are resolved relative to the Markdown file. Start it with a frontmatter header:

```yaml
---
title: Story Mapping as Code: The Delivery Spine of a Connected SDLC
date: 2026-09-12                 # YYYY-MM-DD
type: article                    # article | linkedin | script
series: Connected SDLC           # optional — groups publications, filterable
topic: Story Mapping             # optional — shown on cards, filterable; same topic = "Also as" links
tags: [story-mapping, as-code, product]
summary: "One or two sentences shown on the card and in the reader header."
cover: images/cover.png          # optional — card image, relative to the file
---
```

Quote `summary` (or `title`) when it contains `:`, `#` or other YAML punctuation. A leading `# H1` in the body is hidden in the reader because the title comes from the frontmatter.

## Adding an HTML deck

Decks open directly in a new tab. Add these tags inside `<head>`:

```html
<meta name="description" content="Card summary.">
<meta name="keywords" content="story-mapping, as-code, product">
<meta name="catalogue:title" content="Story Mapping as Code">
<meta name="catalogue:date" content="2026-09-12">
<meta name="catalogue:type" content="deck">
<meta name="catalogue:series" content="Connected SDLC">
<meta name="catalogue:topic" content="Story Mapping">
```

The build script counts slides by looking for elements with `class="slide …"`.

## Catalogue features

- **Search**: searches title, tags, series, summary, headings and body text. Every word must match. Results are ranked by where the words match and highlighted. Press `/` to focus the search box and `Esc` to clear it.
- **Filters**: format (with counts), series, topic, and tags (AND). Tag counts update as you filter. Tags on cards can be clicked.
- **Sort**: best match, newest, oldest, or title. Items published on the same day stay grouped by topic.
- **Layout**: cards or a compact list. The filter state is kept in the URL, so filtered views can be shared (e.g. `?tags=microcks&type=deck`).
- **Reader**: a sticky table of contents, "Also as" links to the other formats of the same topic, and "More in this series".
- Light and dark themes (system default plus a toggle) and a responsive layout down to phone width.
# portfolio
