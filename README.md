# Solène Su Cheng Portfolio

A minimal static portfolio site for Solène Su Cheng / Anti Detox. The site is plain HTML/CSS/JS and is deployed through GitHub → Netlify auto-deploy.

## Project location

Local project path:

```text
/Users/sueieche/workspace/portfolio
```

Remote repository:

```text
https://github.com/sueieche/solene-portfolio
```

## Page map

The live site uses four top-level pages:

```text
index.html    Home
work.html     Work
info.html     Info
contact.html  Shop
```

Important naming note: `contact.html` is currently the Shop page.

## Navigation behavior

Page-to-page navigation should remain normal link navigation.

- Home → Work / Info / Shop uses regular `<a href="...">` links.
- Work → Home / Info / Shop uses regular links.
- Do not reintroduce page-to-page slide transitions, delayed redirects, or smooth scroll page jumps.
- `site.css` intentionally uses `html{scroll-behavior:auto}`.

The only intentional slide-like behavior is inside `work.html`, where clicking Work nodes opens the internal horizontal gallery.

## Work page structure

`work.html` has two main states:

1. Nodes page: `.work-stage#stage-nodes`
2. Internal gallery overlay: `.gallery-stage#stage-gallery`

Current Work nodes:

```text
Knives               → #g-knives
Tears                → #g-tears
Insta & Polarid      → #g-insta
Fashion Photography  → #g-sea
@anti detox          → external Instagram link
```

Work internal gallery behavior:

- `.gallery-track` remains horizontally scrollable.
- `.tears-rail` is used for Knives and Tears image rails.
- Insta uses `.insta-scatter` on desktop and a two-column grid on mobile.
- Fashion Photography uses `.fashion-grid`, six columns on desktop and two columns on mobile.
- The `↑` back arrow only returns from the gallery overlay to the Work nodes page.

Do not add an internal Anti Detox gallery slide unless explicitly requested; the current Anti Detox node links out to Instagram.

## Asset folders

Main image folders:

```text
img_splash/              Home / Shop splash images
img_knives/              Knives gallery images
img_tears/               Tears gallery images and Home images
img_insta/               Insta & Polarid gallery images
img_fashionphotography/  Fashion Photography gallery images
img_web/                 Older web assets and favicon source image
img_work/                Work background assets
```

Current favicon:

```text
favicon.png
```

All four official pages include the favicon links.

## CSS and responsive notes

Shared site styles are in:

```text
site.css
```

Responsive behavior is intentionally minimal:

- Mobile nav wraps instead of hiding behind a menu.
- Home bottom nav wraps on mobile.
- Info has extra top padding on mobile so fixed nav does not overlap text.
- Shop image is constrained by viewport height on mobile.
- Work internal pages keep the gallery behavior but adapt Insta/Fashion to small screens.

Keep the visual language restrained: white background, minimal editorial layout, blue-green navigation text, light typography, no heavy UI chrome.

## Backup policy

Backups are stored under:

```text
.cache/
```

`.cache/` is local working backup material and should not be committed unless there is a specific reason. When searching the project, ignore `.cache/` matches unless explicitly checking old versions.

Before risky layout or navigation changes, create a backup in `.cache/` first.

## Deployment

Deployment is automatic:

1. Commit changes locally.
2. Push to `origin/main`.
3. Netlify deploys from GitHub automatically.

Typical commands:

```bash
git status --short
git diff --check -- index.html work.html info.html contact.html site.css
git add index.html work.html info.html contact.html site.css favicon.png img_knives img_insta img_fashionphotography img_tears img_web
git commit -m "update portfolio layout"
git push origin main
```

Only include asset folders that were actually changed. Do not commit `.cache/` by default.

## Validation checklist

Before pushing, check:

- Home, Work, Info, and Shop links use ordinary page links.
- Work internal node clicks still open the intended gallery slide.
- Work `↑` back arrow returns to the node page.
- Mobile nav does not overflow.
- Info text does not sit under the fixed nav.
- Insta and Fashion sections do not overlap on mobile.
- `git diff --check` passes.

Useful checks:

```bash
git diff --check -- index.html work.html info.html contact.html site.css
node -e "const fs=require('fs'),vm=require('vm'); for (const file of ['index.html','work.html']) { const html=fs.readFileSync(file,'utf8'); const scripts=[...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)]; scripts.forEach((m,i)=>new vm.Script(m[1],{filename:file+':inline-'+(i+1)})); }"
```

## Current project preferences

- Keep page-to-page navigation as normal links.
- Keep sliding behavior only inside `work.html`.
- Avoid over-engineered menus or unnecessary animation systems.
- Preserve the quiet, editorial, gallery-like aesthetic.
- Make minimal targeted changes; do not redesign broadly without confirmation.
- If deploying, commit and push to GitHub; Netlify handles the rest.
