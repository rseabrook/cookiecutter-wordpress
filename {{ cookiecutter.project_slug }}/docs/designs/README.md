# Design proofs

One subdirectory per component, holding screenshots cropped from the design proof:

```
docs/designs/
├── header/
│   ├── header-desktop.png
│   ├── header-mobile.png
│   └── drawer-menu-mobile.png
├── footer/
├── front-page/
├── project-list/        # a component can be a template part, custom block, template — anything
│   └── SPEC.md          # written by /wp-spec
└── DEFAULTS.md          # cross-component defaults, accumulated by /wp-spec
```

## Conventions

- **Crop the full-page proof into per-component screenshots before speccing.** Component-scoped
  images produce far better specs and plans than one giant page proof.
- Name images `<component>-<breakpoint>.png` (`-desktop`, `-mobile`), plus state suffixes where
  relevant (`drawer-menu-mobile.png`, `header-scrolled-desktop.png`).
- A parent/child block pair (e.g. gallery + gallery image) is **one** component directory.

## Workflow

1. Drop the cropped screenshots into `docs/designs/<component>/`.
2. Run `/wp-spec <component>` with a rambled description of how it should work (voice-to-text is
   ideal). The command reads the images, asks about genuine gaps, and writes `SPEC.md`.
3. `SPEC.md` files feed planning and build verification. `DEFAULTS.md` accumulates cross-component
   answers so future rambles get shorter.
