---
name: design-guidelines
description: Design system rules for this games site (VitePress + Tailwind v4, cinematic dark theme) — color, typography, radius, spacing, motion, UI states, accessibility and component recipes. Use whenever creating or changing any page, component, style, Markdown page layout, or adding a new game to this repo, or when asked about the site's look, tokens, fonts, colors, corners, buttons, links, focus or hover states.
---

# Games site design guidelines

Cinematic dark: pure black page, cool fog-grey condensed type (Oswald), one giant blood-red (or per-game) uppercase title per page, quiet uppercase navigation, square corners. Plain black backgrounds (no gradients or glows), lots of black space.

**Source of truth:** `.vitepress/theme/tokens.css`. All component CSS is in `.vitepress/theme/style.css`. Read `tokens.css` before styling anything.

## Hard rules

1. **No raw values in component CSS.** Colors, fonts, font sizes, radii, durations, spacing → `var(--token)`. Need a new value? Add a token to `tokens.css` first and document it here. No exceptions.
2. **Spacing is on a 4px grid** (`--space-1` … `--space-24`).
3. **Font weights:** 300 for body copy and descriptions (`--font-weight-light`), 400 for regular UI and display titles, 600 and 700 for emphasis and headings. Oswald is loaded from Google Fonts (`.vitepress/config.ts`) with these four weights.
4. **No text below 12px** (`--text-micro`). Uppercase only via `text-transform` (nav, headings, hero, buttons) — write sentence case in markup.
5. **Every interactive element has all its states** (see table below). Never ship hover without focus-visible.
6. **Contrast on black:** body text ≥ 4.5:1, large display text ≥ 3:1. `--color-accent` (#8e1d1d) is decorative only (rules, markers, current underline). `--color-title` / per-game `titleColor` only for the giant hero title and kicker. Links use `--color-accent-strong` or the game accent.
7. Dark theme only (`color-scheme: dark`). Don't add light-mode overrides piecemeal.
8. Respect `prefers-reduced-motion` — durations are tokens that drop to 0ms. No looping animation.

## Color tokens

| Token | Value | Use |
|---|---|---|
| `--color-paper` | #000000 | Page, header, menu panel |
| `--color-paper-sunk` | #0b0c0c | Cards (contact) |
| `--color-paper-hover` / `-active` | #151717 / #1f2121 | Hover / pressed fills |
| `--color-line` | #1f2121 | Hairlines, footer/section borders |
| `--color-line-strong` | #3d4142 | Control/card borders, table rules |
| `--color-ink` | #d2d6d8 | Headings, current nav, strong |
| `--color-ink-soft` | #969b9e | Body copy, nav links |
| `--color-ink-muted` | #7c8184 | Captions, footer, meta (≥ 4.5:1) |
| `--color-inverse` (+`-hover` #fff, `-active`) | #d2d6d8 | Primary button; `-hover` = white hover text |
| `--color-on-inverse` | #000 | Text on primary button |
| `--color-accent` | #8e1d1d | Decorative red: h2 rule, list markers, current underline |
| `--color-accent-strong` | #d84b40 | Link text, focus ring (5:1 on black) |
| `--color-title` | #b52a2a | Giant hero title (display only, 3.4:1) |
| `--color-callout-{bg,line,ink}` | | Draft notices / blockquotes |

Per-game in `.vitepress/theme/navigation.ts`: `accentColor` → `--game-accent` (links, focus ring; ≥ 4.5:1 on black) and optional `titleColor` → `--game-title` (hero title; ≥ 3:1 on black). Use the white logo variant (`*-light.svg`).

## Typography

- Family: `--font-sans` (Oswald, condensed) everywhere.
- Scale: `--text-micro` 12 · `sm` 14 · `base` 16 · `lg` 18 · `xl` 20 · `2xl` 24 · `--text-display-xs/sm/md/lg` · `--text-display-xl` (game home title, up to 6.5rem).
- Line height: `--leading-display` 0.88 (hero), `--leading-snug` 1.3, `--leading-body` 1.65.
- Tracking: `--tracking-display` 0.01em, `--tracking-heading` 0.02em, `--tracking-caps` 0.06em (uppercase UI).

| Role | Class / element | Size | Weight |
|---|---|---|---|
| Home hero title | `.page-hero-home .hero-title` | display-xl, uppercase, title color | 400 |
| Page hero title | `.hero-title` | display-sm, uppercase | 400 |
| Kicker (game name above title) | `.hero-kicker` | display-xs, uppercase | 400 |
| Prose h2 / h3 | `.prose h2/h3` | 2xl / xl, uppercase, h2 gets short red rule above | 700 |
| Body and descriptions | `p`, `.prose` | lg (base < 700px) for prose | 300 |
| Nav link | `.nav-link` | base, uppercase | 400 |
| Section label | `.section-label` (e.g. "Get Game:") | sm | 700 |
| Footer | `.footer-copy`, `.footer-link` | sm | 400 |

## Radius

Square look: `--radius-xs`/`-sm` 0, `--radius-md`/`-lg` 2px, `--radius-full` for round things only.

## Layout

- `.masthead` = centered `--masthead-max` (900px) column, shared by header, hero, content and footer.
- Header: fixed black bar (`--header-height` 80px) with 40px logos and 16px vertical padding on every game page: logo · uppercase nav links · compact store links (hidden < 800px). Keep its sizing consistent between home and content pages. Under 700px the links move into a hamburger `<details class="mobile-nav">` full-screen black panel with large links. Reserve the root scrollbar gutter so page length and dialog scroll locks do not shift centered content.
- Every page with an intro gets `.page-hero` (plain black, no background effects; kicker, giant uppercase title, description). Game home pages (`index.md`) get the giant `display-xl` title; store links live in the header and on the home-page game cards (`StoreLinks size="md"`, "Coming soon" when no URL). `hidePageIntro: true` skips the hero (contact pages).
- Footer: hairline-topped row — "© year Game. All rights reserved." left, uppercase links right.
- Breakpoints: 800px, 700px. Touch targets ≥ `--control-height` 44px (`-sm` 40px for nav).

## UI states

| Component | Default | Hover | Active | Current | Focus-visible | Disabled |
|---|---|---|---|---|---|---|
| `.btn-primary` | light fill, black text | white | `-active`, translateY(1px) | — | ring | opacity .5 |
| `.btn-secondary` | transparent, `line-strong` border | `paper-hover` | `paper-active` | — | ring | opacity .5 |
| `.nav-link` | ink-soft, uppercase | white | — | `aria-current` → ink + 3px red underline | ring | — |
| `.store-link` | ink-soft (lg: ink) | white | inverse-active | — | ring | `aria-disabled` → "Coming soon", no pointer |
| `.footer-link` | ink-muted | ink | — | `aria-current` → ink + red underline | ring | — |
| `.prose a` | game accent, 1px underline | white, 2px underline | — | — | ring | — |

Focus ring is global: `:where(a, button, summary, [tabindex]):focus-visible` → `var(--game-accent, var(--color-focus))`. Never remove outlines.

## Motion

`--duration-fast` 120ms (color/underline), `--duration-base` 200ms (fills, transforms, menu icon), `--ease-out`. Movement ≤ 3px. No looping animation.

## Component recipes

```html
<!-- Buttons -->
<a class="btn btn-primary" href="#">Play now</a>
<button class="btn btn-secondary" type="button">Menu</button>

<!-- Label -->
<p class="eyebrow">Sentence case label</p>

<!-- Store row (Vue) -->
<StoreLinks :game="game" size="md" />
```

Markdown info pages: wrap content in `<div class="prose">`; draft notices are a leading `> **Draft, not for publication.** …` blockquote (renders as callout).

Tailwind utilities are generated only from system tokens (`bg-paper`, `text-ink-soft`, `rounded-md`, `text-sm`); default Tailwind palettes/radii/fonts are cleared. Avoid class names that collide with Tailwind utilities (e.g. `container`) — use `.layout`.

## Checklist before finishing UI work

- [ ] `grep -nE '#[0-9a-fA-F]{3,8}\b|[0-9]+px' .vitepress/theme/style.css` — no new hits or token-justified sizes (icon/art dimensions)
- [ ] Every new interactive element: hover, active, focus-visible (keyboard Tab through it), disabled if applicable
- [ ] Contrast checked for any new color pair
- [ ] Checked at 375px and 1280px; no horizontal scroll
- [ ] `npm run build` passes (also catches dead links)
