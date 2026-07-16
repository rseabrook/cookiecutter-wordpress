# {{ cookiecutter.project_name }}

WordPress site with a custom classic-PHP theme (not FSE), generated from cookiecutter-wordpress.
Theme: `wp-content/themes/{{ cookiecutter.theme_directory }}/` — PHP function prefix `{{ cookiecutter.theme_slug }}_`.
Only `wp-content` is versioned; WP core, config, and uploads are gitignored.

## Local development

- Docker stack: `docker compose up -d`; site at `http://127.0.0.1/`.
- WP-CLI: **always `./bin/wp`** (wraps `docker compose exec -T wpcli wp`). Never the host `wp`,
  never `docker compose run`.
- WP-CLI write commands are not idempotent — **query before create** (pages, menus, terms).
- `php` may not exist on the host — lint via the container:
  `docker compose exec -T wpcli php -l <file>`.

## Theme architecture

- Root templates follow the WP template hierarchy; reusable fragments live in
  `template-parts/{cards,components,sections}`:
  **card** = one post in a list context; **component** = reusable composite (e.g. a grid of cards)
  taking inputs; **section** = page-region combining components + chrome.
- Pass data with `get_template_part( $slug, null, $args )` and read from `$args` — no globals.
- Menu locations are registered in `functions.php` (`register_nav_menus`); a location renders
  nothing until a menu is created and assigned in the admin (assignment to an unregistered
  location silently succeeds).
- ACF Pro for CPTs/field groups/options (created in the admin). CF7 for forms (auto-`<p>` disabled).
- `todo.txt` in the theme root is the new-project checklist.

## CSS & design tokens

- **`style.css` loads on the front end only. `assets/css/blocks.css` loads in BOTH the front end
  and the block editor** (`enqueue_block_assets`). Anything that must render identically in both
  contexts belongs in `blocks.css`.
- Theme colors and fonts live in **three places, kept in lockstep**: `style.css` `:root`,
  `blocks.css` `:root`, and `theme.json`. Vars: `--theme-color-<slug>`, `--font-<slug>`
  (kebab-case slugs).
- Editor/front-end parity for page templates: the front end gets a `page-template-*` body class
  from core; `assets/js/editor.js` mirrors it onto the editor canvas so template color flips
  preview while editing.
- Mobile-first CSS. Gate hover styles with `@media (hover: hover)` so touch devices don't get
  stuck hover states.
- SVGs in `assets/images/` are inlined via `file_get_contents()` — they must be normalized
  (no XML prolog, single-color fills converted to `currentColor`, no Illustrator `<style>`/`.cls-*`
  blocks, keep `viewBox`).

## Custom blocks

- Default to core blocks + block styles + theme.json; build a custom block only when core can't
  express the design (see `blocks/grid` + `blocks/card` for the parent/child starter to copy).
- Layout: `blocks/<name>/{block.json,index.js,render.php,build/}`. Build with `@wordpress/scripts`:
  `npm install && npm run build` in the theme root. **`build/` is committed** (git-deploy hosts
  don't run builds). Registration in `functions.php` is guarded on `build/index.js` existing;
  register children before parents.
- Dynamic parent/child: parent `save` returns `InnerBlocks.Content`, child `save` returns `null`;
  the parent's `render.php` wraps the already-rendered `$content`.
- Hard-won gotchas (details in `docs/solutions/` where present):
  - **Editor-reactive styling must be a className** (e.g. `is-ratio-1-1`), not a CSS custom
    property set via `useBlockProps` style — custom properties don't re-apply when attributes
    change.
  - **`blockGap` does nothing on a custom grid/flex layout** (no WP layout support means
    `--wp--style--block-gap` is never defined). Read `style.spacing.blockGap` and set `gap`
    directly in BOTH `index.js` and `render.php`; convert preset syntax
    `var:preset|spacing|40` → `var(--wp--preset--spacing--40)`. Axial values arrive as an object
    (`top` = row, `left` = column) when the control is unlinked.
  - **Prefer core components for common editor UI**: `MediaPlaceholder` (empty state),
    `MediaReplaceFlow` (toolbar — put it in `BlockControls group="other"` and set `name`, it
    doesn't auto-label), `MediaUpload`/`MediaUploadCheck`. The inspector sidebar renders outside
    the canvas iframe, so `blocks.css` can't style it — use inline styles there.
  - For attachment-ID-based image blocks, omit external-URL selection — the front end renders via
    `wp_get_attachment_image( $id )` for responsive srcset, which requires a real attachment.
  - In `render.php`, **echo concatenated strings, don't `printf`** markup that may contain `%`
    (percent-encoded URLs in src/srcset).
{% if cookiecutter.enable_animations %}
## Page transitions (Barba)

- `assets/js/scripts.js` runs Barba SPA transitions with a GSAP overlay and a front-page-only
  loading screen. Barba namespaces map WP contexts; body classes sync from the incoming
  container's `data-body-class`.
- **The `beforeEnter` head-sync is load-bearing — do not simplify it.** It replaces per-page head
  singletons (title/canonical/meta), syncs `<style>`/`<link>` elements by identity (id/href), and
  re-parses `*-block-supports-inline-css` so `var(--wp--preset--*)` rules resolve against the
  complete cascade. Symptom of breakage: styles correct on hard refresh but wrong after in-site
  navigation (e.g. a columns gap collapsing).
- The transition gate uses imagesLoaded **`'always'`** (not `'done'`) so a broken image can't
  wedge the overlay shut.
{% endif %}
## Docs & workflow

- `docs/designs/<component>/` — design-proof screenshots cropped per component (planning input).
- `docs/plans/` — feature plans. `docs/solutions/` — documented problems/patterns; **check here
  before re-debugging a symptom** (especially anything that works on refresh but breaks on
  navigation, or editor-vs-front-end mismatches).

## Deployment

- Typical host is WP Engine via `git push` to its remote — deploys exactly what's committed
  (hence committed `build/`), then purges caches. No build step runs on the host.
