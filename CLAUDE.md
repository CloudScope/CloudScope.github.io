# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

CloudScope is a personal blog by Raghunath Pradhan focused on cloud computing and technology. It is a static HTML/CSS site deployed via GitHub Pages at `CloudScope.github.io`. There is no build system, package manager, or JavaScript framework — all pages are plain HTML files.

## Previewing the site

Open `index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Site structure

```
index.html          # Homepage — hero section + latest posts listing
css/styles.css      # Single shared stylesheet for all pages
js/scripts.js       # Shared JS file (currently empty placeholder)
pages/
  about.html        # Author bio and blog description
  blog.html         # Full post index
  contact.html      # Contact form (no backend wired up)
posts/              # Individual blog post HTML files (currently empty)
```

## Conventions

**Path depth matters for links and assets.** Root-level `index.html` uses paths like `css/styles.css` and `pages/about.html`. Pages inside `pages/` must use `../css/styles.css` and `../js/scripts.js`. Posts inside `posts/` would similarly use `../` prefixes.

**Adding a new blog post:**
1. Create `posts/post-name.html` — copy an existing page as a template, adjusting asset paths to `../css/styles.css` and `../js/scripts.js`.
2. Add a link to it in the `<section class="posts">` block in `index.html`.
3. Add a link in the `<main>` articles list in `pages/blog.html`.

**Navigation:** Each page includes a `<nav>` in the `<header>` and a "Go Back" button (`onclick="history.back()"`). Keep these consistent when adding pages.

**Deployment:** Pushing to `main` deploys automatically via GitHub Pages — no CI step needed.
