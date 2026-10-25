# Go-live checklist: the swap

*Prepared 2026-10-25 for the captain, by the first officer; updated the same day (one missing file found and added: `js/before-after.js`). Checked against the live site on that date. Nothing in this file has been done yet.*

**The idea, in photographer's terms.** The new prints go up last. First the darkroom is stocked (the supplies the new pages need), and only then do the 17 pages themselves change. Before any of it, we keep the negatives: a backup of what is live now, so the old site can be put back in minutes.

**In a nutshell (the captain's own words, 2026-10-25):**
1. **Put up the supplies first:** the `css/` folder, the `js/` folder and 5 images. Nothing visible changes yet.
2. **Then put up the 17 pages**, together.

**The numbers to remember:** **45 files** change on the host: **22 new + 6 changed supplies, then the 17 pages**, about **762.7 KB** in all. The 17 pages keep the **same names as the live site**, so no redirects are needed.

---

## 1. Before the day

- [ ] You are on `master`, `git status` shows nothing uncommitted (the parked workbenches may show as untracked), and everything is pushed.
- [ ] Ask the first officer to **re-run the manifest check against the live site**. The answer must still be **22 new, 6 changed**. A different number means something moved since 25 October: stop and look.
- [ ] Tag the exact commit you will upload from: `git tag -a pre-go-live -m "what went live"` then `git push --follow-tags`.
- [ ] Pick the moment: a quiet hour, with time to verify and to roll back. Not minutes before you send the link to anyone.
- [ ] Open the menu once in a real browser, in the 2017 skin on the home page (the headless test cannot show its slide). On a phone (or a phone-sized DevTools window with touch), tap a photograph on the Retouching page: it should flip to the "before".
- [ ] Skin a first-time visitor sees: **2017** (decided 2026-10-25; one value in `js/skin-switch.js`, `DEFAULT`, if you feel braver).

## 2. The backup: download from the host first (the negatives)

Download these **23 files** from the live site into a dated folder outside the project (for example `Desktop/backup-live-site-YYYY-MM-DD/`), keeping the folder names. Open two of them to make sure they are real.

- [ ] The **17 live pages**: `index.html`, `45.html`, `about.html`, `ads.html`, `cutouts.html`, `graphicdesign.html`, `icons.html`, `newsletter.html`, `photography.html`, `posed.html`, `pride.html`, `print.html`, `retouch.html`, `swisspost.html`, `styleguide.html`, `tnecd.html`, `webdesign.html`
- [ ] The **6 files that will be replaced:** `css/main.css`, `css/ui.css`, `images/45/45 st johns.png`, `images/hero/face2.svg`, `images/icons/xmas2018_mom.png`, `js/design.js`
- [ ] Belt and braces, if your FTP program allows it: download the **whole site folder** too.

Why these 23: the 22 new files are not referenced by the old pages, so they can safely stay on the host if we ever roll back. Only what gets *overwritten* needs saving.

## 3. The upload: two steps

Keep the folder structure. Overwrite when asked. Skip any hidden **`.DS_Store`** files your FTP program may show (a macOS leftover; git ignores them, and the host would refuse to serve them, but there is no reason to carry them up).

### Step 1: the supplies (nothing visible changes yet)

- [ ] **Upload the whole `css/` folder** (20 files).
- [ ] **Upload the whole `js/` folder** (7 files).
- [ ] **Upload these 5 images** (not the whole `images/` folder: it holds hundreds of pictures, and only these changed):

| # | File | Size | |
|---|---|---|---|
| 1 | `images/ads/dogyear_instagram.png` | 50.8 KB | new |
| 2 | `images/ads/ilovemath.png` | 17.1 KB | new |
| 3 | `images/45/45 st johns.png` | 53.9 KB | changed (overwrites the live copy) |
| 4 | `images/hero/face2.svg` | 4.5 KB | changed (overwrites the live copy) |
| 5 | `images/icons/xmas2018_mom.png` | 173.7 KB | changed (overwrites the live copy) |

Why uploading whole folders is safe: of the 27 files in `css/` and `js/`, **23 are new or changed** (listed below) and the other **4** (`css/photography.css`, `js/cookie.js`, `js/cookie_2.js`, `js/noframework.waypoints.min.js`) were checked on 2026-10-25 and are **byte-for-byte identical on the host**, so uploading them again changes nothing.

| # | File | Size | |
|---|---|---|---|
| 1 | `css/about-1986.css` | 29.8 KB | new |
| 2 | `css/about-2017.css` | 4.2 KB | new |
| 3 | `css/card-pages.css` | 3.6 KB | new |
| 4 | `css/case-study-2017.css` | 6.1 KB | new |
| 5 | `css/case-study.css` | 6.8 KB | new |
| 6 | `css/category-2017.css` | 1.2 KB | new |
| 7 | `css/common-2017.css` | 5.3 KB | new |
| 8 | `css/gallery-2017.css` | 7.6 KB | new |
| 9 | `css/gallery.css` | 12.0 KB | new |
| 10 | `css/graphicdesign-1986.css` | 0.8 KB | new |
| 11 | `css/home-1986.css` | 14.1 KB | new |
| 12 | `css/home-2017.css` | 1.2 KB | new |
| 13 | `css/icons-1986.css` | 1.1 KB | new |
| 14 | `css/photography-1986.css` | 0.7 KB | new |
| 15 | `css/reskin-blue.css` | 49.1 KB | new |
| 16 | `css/skin-switch.css` | 2.4 KB | new |
| 17 | `css/transitions.css` | 4.1 KB | new |
| 18 | `css/main.css` | 26.5 KB | changed (overwrites the live copy) |
| 19 | `css/ui.css` | 8.6 KB | changed (overwrites the live copy) |
| 20 | `js/before-after.js` | 1.1 KB | new |
| 21 | `js/layout-switch.js` | 7.6 KB | new |
| 22 | `js/skin-switch.js` | 5.9 KB | new |
| 23 | `js/design.js` | 6.8 KB | changed (overwrites the live copy) |

- [ ] Step 1 uploaded. Spot-check in the browser: `https://www.lawrencegetubig.com/css/reskin-blue.css` shows CSS, and `https://www.lawrencegetubig.com/js/before-after.js` shows code, not a 404.

### Step 2: the 17 pages: the swap. Upload them together, without a pause between.

| # | File | Size |
|---|---|---|
| 1 | `index.html` | 17.7 KB |
| 2 | `45.html` | 14.1 KB |
| 3 | `about.html` | 20.8 KB |
| 4 | `ads.html` | 13.5 KB |
| 5 | `cutouts.html` | 14.9 KB |
| 6 | `graphicdesign.html` | 11.9 KB |
| 7 | `icons.html` | 18.7 KB |
| 8 | `newsletter.html` | 13.2 KB |
| 9 | `photography.html` | 10.0 KB |
| 10 | `posed.html` | 12.1 KB |
| 11 | `pride.html` | 16.5 KB |
| 12 | `print.html` | 10.4 KB |
| 13 | `retouch.html` | 14.4 KB |
| 14 | `swisspost.html` | 16.9 KB |
| 15 | `styleguide.html` | 14.2 KB |
| 16 | `tnecd.html` | 16.4 KB |
| 17 | `webdesign.html` | 20.5 KB |

- [ ] Step 2 uploaded. **This is the moment the site changes.**

## 4. Verify, within ten minutes

Use a **private window** (or hard reload) because stylesheets are cached for up to 4 hours.

- [ ] **Home page** loads; tab title reads "Home: Featured Projects | Lawrence Getubig"; 2017 look shows first.
- [ ] **The toggle:** menu, then switch to "Retro me, 1986", then back. The knob is magenta; gold when hovered.
- [ ] **Every card** from the home page: click through to each project and use "Back to Home" (the little house with a chimney shows in the 1986 skin).
- [ ] **The morph:** a card's title flies into the project page's vertical title (this works only on the live https site).
- [ ] **Each page type in both skins:** home, a category page, About, a case study, a gallery. Also at phone width in DevTools.
- [ ] **Retouching:** hover (or tap on a phone) flips a photograph between before and after.
- [ ] **The PDFs:** Swiss Post (top and bottom link) and Pride open.
- [ ] **One external link** from each of: a case study, the footer (GitHub, LinkedIn, Instagram).
- [ ] **Console and Network** (browser developer tools): no red errors, no 404s.
- [ ] **GA4 Real-time:** your own visit and a menu click appear (`nav_click`).
- [ ] **StatCounter** still counts.
- [ ] A **Lighthouse** run on the home page and one case study; write the scores down.

## 5. If something is wrong: rolling back

- **Small and cosmetic:** fix it forward. Change the file, upload that one file.
- **Broken:** re-upload from your backup folder the **17 pages first** (that restores the old site at once), then the 6 shared files. Leave the 22 new files; nothing old references them. Hard reload to check. Visitors with cached stylesheets may see the old look for up to 4 hours either way.
- Tell the first officer what you saw; we write it down.

## 6. The day after (not the same day)

Wait at least a day, so no visitor still holds the old pages' cache. Then:

- [ ] Merge the branch `go-live-prune-v2` into `master` (the re-cut legacy-CSS prune: 34 dead rules, 12 comments, 3 properties; 208 lines out, none added). It is optional housekeeping, not a precaution.
- [ ] Upload the two trimmed files `css/main.css` and `css/ui.css`, and verify the pages again (same list as section 4, a shorter pass).
- [ ] On the host, delete what nothing uses any more: `css/photography.css`, `js/cookie.js`, `js/cookie_2.js`, `js/noframework.waypoints.min.js`.
- [ ] Push, with `--follow-tags`.
- [ ] Delete the superseded branch `go-live-prune` (local and `origin`) if you wish.

## 7. Kept on purpose, so nobody wonders later

- StatCounter stays (your decision of 2026-10-25).
- The illustration colour palette (`--yellow` and the browns) stays in `main.css`.
- The menu pulse is retired but kept: tag `retired-menu-pulse`, and a live demo in the design-system guide, section 11.
- `design-system-blue.html`, the parked workbench pages and `experiments/` are **not** uploaded.
- The favicon files exist on the host but not in this repository (`favicon.svg`, `favicon.png`, `apple-touch-icon.png`). They are safe, just unversioned: add them to the repo when convenient.
- Only the live site's HTML could not be read by the audit (the host refuses scripted requests for pages), so the HTML caching rules are unknown: check once in your browser's Network tab.

## 8. Optional, before or after

- [ ] Social-share tags (title, description, image) so LinkedIn previews look intentional. Neither the old nor the new pages have them.
- [ ] A `robots.txt` (none exists today; the host returns 404 for it) and a sitemap.

*Engage.*
