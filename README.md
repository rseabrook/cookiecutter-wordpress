# cookiecutter-wordpress

A [cookiecutter](https://cookiecutter.readthedocs.io/) template for WordPress client sites:
a Docker-based local environment, a custom classic-PHP starter theme (block-editor-friendly,
with `theme.json` design tokens), a curated set of plugins, and optional Barba.js/GSAP page
transitions.

## Generating a project

```bash
pip install cookiecutter   # if you don't have it
cookiecutter gh:rseabrook/cookiecutter-wordpress
# or from a local clone:
cookiecutter path/to/cookiecutter-wordpress
```

Prompt variables (see `cookiecutter.json`):

| Variable | Default | Purpose |
| --- | --- | --- |
| `project_name` | `Cookiecutter Wordpress` | Human-readable name; everything below derives from it |
| `project_slug` | `cookiecutter-wordpress` | Project directory name |
| `theme_directory` | `cookiecutterwordpress` | Theme folder under `wp-content/themes/` |
| `theme_slug` | `cookiecutter_wordpress` | PHP function prefix + text domain |
| `enable_animations` | `true` | Include Barba.js/GSAP page transitions and the front-page loading screen |
| `author` | `Anonymous` | Author credit |

## What you get

```
<project_slug>/
├── docker-compose.yml        # WordPress + MySQL + phpMyAdmin + WP-CLI
├── uploads.ini               # PHP upload/memory limits (500M) for the containers
├── bin/wp                    # WP-CLI wrapper (runs inside the wpcli container)
├── CLAUDE.md                 # Project conventions for Claude Code
├── docs/
│   ├── designs/              # Per-component design-proof screenshots (see its README)
│   ├── plans/                # Feature plans
│   └── solutions/            # Documented problems/patterns
└── wp-content/
    ├── plugins/              # Bundled starter plugins (list below)
    └── themes/<theme_directory>/   # The custom starter theme
```

WordPress core is *not* in the repo — the official `wordpress` Docker image provides it, and the
generated `.gitignore` keeps core, config, and uploads out of version control. Only `wp-content`
is versioned.

### The starter theme

A classic PHP theme (not FSE) that leans on the block editor for page content:

- **Templates**: `index.php`, `front-page.php`, `page.php`, `single.php`, plus
  `page-dark-background.php` — an example page template that flips the color palette via a
  body class (pure CSS, previews in the editor too).
- **Template parts** under `template-parts/{cards,components,sections}` — *card* (one post in a
  list), *component* (reusable composite, e.g. `post-grid`), *section* (page region, e.g.
  `image-banner`). Data is passed via `get_template_part()` `$args`, no globals. A
  `content/content-none.php` part renders the "nothing found" state.
- **Header/footer/mobile drawer**: working starters — wordmark (inlined SVG), primary menu,
  hamburger toggler, and a full-screen mobile drawer driven by vanilla JS in
  `assets/js/scripts.js`. Menu locations `primary` and `mobile` are registered.
- **Design tokens**: colors and fonts live in `theme.json` (palette, `contentSize`/`wideSize`
  layout, font faces) and as CSS custom properties in `style.css` + `assets/css/blocks.css`,
  kept in lockstep. Cormorant Garamond and an icon font are wired up as examples.
- **CSS conventions**: no framework — BEM class names, mobile-first, WP-core breakpoints
  (600px / 782px), a small base-styles section instead of a reset package, and a
  `.site-container` class that centers classic-template content on `theme.json`'s
  `contentSize`. `style.css` loads on the front end only; `blocks.css` loads on the front end
  *and* in the block editor, so anything that must match in both contexts goes there.
- **Custom blocks**: a parent/child starter pair (`blocks/grid` + `blocks/card`) built with
  `@wordpress/scripts` — copy and rename them for real blocks. Build with
  `npm install && npm run build` in the theme root; registration is skipped until `build/`
  exists. `build/` is committed because git-deploy hosts (e.g. WP Engine) don't run builds.
- **Editor parity**: `assets/js/editor.js` mirrors the selected page template's
  `page-template-*` class onto the editor canvas so template color flips preview while editing.
- **Page transitions** (only when `enable_animations` is true): Barba.js SPA-style transitions
  with a GSAP overlay and a front-page loading screen, including head/style syncing so styles
  survive in-site navigation.
- `todo.txt` — the new-project setup checklist.

### Bundled plugins

| Plugin | Purpose |
| --- | --- |
| `advanced-custom-fields-pro` | CPTs, field groups, options pages (license required) |
| `contact-form-7` | Forms (the theme disables CF7's auto-`<p>` wrapping) |
| `contact-form-cfdb7` | Saves CF7 submissions to the database |
| `disable-comments` | Turns comments off site-wide |
| `duplicate-post` | Clone/rewrite-and-republish posts |
| `multiple-post-thumbnails` | Extra featured images per post |
| `rewardstyle-widgets` | LTK/rewardStyle embed widgets |

> Note: the generated project's `.gitignore` ignores `wp-content/plugins/*`. The bundled
> plugins exist on disk for local use, but if you deploy via git (e.g. WP Engine) you'll want
> to whitelist the plugins you rely on in `.gitignore`, or install/manage them on the host.

### Vendored theme libraries

In `assets/js/vendor/` and `assets/css/vendor/` (no build step, enqueued from `functions.php`):

| Library | Enqueued by default? |
| --- | --- |
| GSAP 3 | Yes, when `enable_animations` |
| Barba.js 2 + @barba/prefetch | Yes, when `enable_animations` |
| imagesLoaded 5 | Yes, when `enable_animations` |
| Slick carousel (+ its CSS) | Commented out — uncomment to use |
| Masonry 4 | Commented out |
| Infinite Scroll 4 | Commented out |
| jquery.inview | Commented out |

jQuery comes from WordPress core and is a dependency of `scripts.js`.

## Running locally (Docker)

From the generated project root:

```bash
docker compose up -d
```

Services:

| Service | URL / access | Notes |
| --- | --- | --- |
| WordPress | http://127.0.0.1/ (ports 80 + 443) | `WP_DEBUG` on, logs to `wp-content/debug.log` |
| MySQL | internal (`db:3306`) | db/user/password all `wordpress`; root password `password` |
| phpMyAdmin | http://127.0.0.1:8080/ | Log in as `root` / `password` |
| wpcli | via `./bin/wp` | Idles in the background for WP-CLI commands |

First run — install WordPress and activate the theme:

```bash
./bin/wp core install --url=http://127.0.0.1 --title="My Site" \
  --admin_user=admin --admin_password=admin --admin_email=you@example.com
./bin/wp theme activate <theme_directory>
./bin/wp plugin activate --all
```

(Or just open http://127.0.0.1/ and click through the web installer.)

Then work through the theme's `todo.txt`: fonts, colors, menus, pages, ACF setup, favicon, and
the custom-block build if you need it.

## Using WP-CLI

Always go through the wrapper — it execs `wp` inside the `wpcli` container, which shares the
WordPress core volume and `wp-content` mount:

```bash
./bin/wp <command>          # never the host wp, never `docker compose run`
```

Examples:

```bash
./bin/wp post list --post_type=page
./bin/wp menu create "Primary"
./bin/wp menu location assign primary primary
./bin/wp option update show_on_front page
./bin/wp db export backup.sql
```

Two habits worth keeping:

- **Query before create.** WP-CLI write commands aren't idempotent — check whether the page/menu/
  term exists before creating it.
- **Lint PHP in the container** (the host may not have PHP):
  `docker compose exec -T wpcli php -l <file>`.

## Deployment assumptions

The template assumes a git-deploy host (typically WP Engine): `git push` deploys exactly what's
committed, then purges caches. That's why compiled block output (`blocks/*/build/`) is committed
and why anything you need in production must be whitelisted in `.gitignore`.
