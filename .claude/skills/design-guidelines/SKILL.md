---
name: design-guidelines
description: Design system rules for this games site (VitePress + Tailwind v4) — color, typography, radius, spacing, motion, UI states, accessibility and component recipes. Use whenever creating or changing any page, component, style, Markdown page layout, or adding a new game to this repo, or when asked about the site's look, tokens, fonts, colors, corners, buttons, links, focus or hover states.
---

# Games site design guidelines

Warm paper background, near-black ink, one coral accent, four "block" colors for brand marks and art. Calm, editorial, playful in small doses.

**Source of truth:** `.vitepress/theme/tokens.css`. All component CSS is in `.vitepress/theme/style.css`. Read `tokens.css` before styling anything.

## Hard rules

1. **No raw values in component CSS.** Colors, fonts, font sizes, radii, durations, spacing → `var(--token)`. Need a new value? Add a token to `tokens.css` first and document it here. Only exception: illustration-only colors scoped inside `.hero-art` (`--art-*`, tower blocks).
2. **Spacing is on a 4px grid** (`--space-1` … `--space-24`). No 13px, 27px, 35px.
3. **Only three font weights:** 400 regular, 600 semibold, 700 bold. Inter is loaded with exactly these; `font-synthesis: none` means anything else silently falls back. Never use 500 or 800.
4. **No text below 12px** (`--text-micro`). Uppercase only via `text-transform` on `.eyebrow`-style labels — write sentence case in markup so screen readers don't spell words out.
5. **Every interactive element has all its states** (see table below). Never ship hover without focus-visible.
6. **Contrast:** body text ≥ 4.5:1, large display text ≥ 3:1, focus ring / control borders ≥ 3:1. `--color-accent` (#ec775c) is decorative only — use `--color-accent-strong` for any accent *text*. Check new pairs with a real contrast calculation, not by eye.
7. Light theme only (`color-scheme: light`). Don't add dark-mode overrides piecemeal.
8. Respect `prefers-reduced-motion` — durations are tokens that drop to 0ms; never hard-code `transition: .2s`.

## Color tokens

| Token | Value | Use |
|---|---|---|
| `--color-paper` | #f8f8f1 | Page background, header |
| `--color-paper-sunk` | #eeefe5 | Secondary sections |
| `--color-paper-hover` / `-active` | #e6e8db / #dcdfd0 | Hover / pressed fills on paper |
| `--color-line` | #dedfd4 | Hairlines, section borders |
| `--color-line-strong` | #bfc2b5 | Control borders, list dividers |
| `--color-ink` | #252522 | Headings, primary text |
| `--color-ink-soft` | #555950 | Body copy |
| `--color-ink-muted` | #656a5e | Eyebrows, captions, meta (still ≥ 4.5:1) |
| `--color-inverse` (+`-hover`, `-active`) | #292b26 | Primary button, current tab |
| `--color-on-inverse` / `-muted` | #f8f8f1 / #bec3b4 | Text on inverse |
| `--color-accent` | #ec775c | Decorative dots, marks, underlines |
| `--color-accent-strong` | #b3472d | Accent text, links, focus ring (5.1:1 paper, 4.7:1 paper-sunk) |
| `--color-brand` (+`-hover`, `-active`) | = accent-strong / #9c3d26 / #85331f | Masthead bar, menu panel |
| `--color-on-brand` / `-muted` / `-line` | paper / #fde9e2 / paper 60% | Text, labels, pill border on brand (wrap in `.on-brand`) |
| `--color-accent-on-inverse` | #e8a38e | Accent text on dark |
| `--color-block-{coral,sun,leaf,sky}` | | Brand mark squares, illustration |
| `--color-callout-{bg,line,ink}` | | Draft notices / blockquotes |

Per-game accent: `accentColor` in `.vitepress/theme/navigation.ts` sets `--game-accent` on info pages (links, focus ring, current-nav underline). It must pass 4.5:1 on `--color-paper`.

## Typography

- Family: `--font-sans` (Inter) everywhere. `--font-serif` (Georgia) **only** for a single italic accent word inside a display heading (`.display em`).
- Scale: `--text-micro` 12 · `--text-sm` 14 · `--text-base` 16 · `--text-lg` 18 · `--text-xl` 20 · `--text-2xl` 24 · `--text-display-xs/sm/md/lg` (fluid clamps; xs is menu-panel links only).
- Line height: `--leading-display` 0.95 (hero/section), `--leading-heading` 1.15 (page h1), `--leading-snug` 1.3 (h2/h3, labels), `--leading-body` 1.65 (paragraphs).
- Tracking: `--tracking-display` −0.06em, `--tracking-heading` −0.03em, `--tracking-caps` +0.14em (uppercase labels only).

| Role | Class / element | Size | Weight |
|---|---|---|---|
| Hero h1 | `.display.display-lg` | display-lg | 700 |
| Section h2 | `.display.display-md` | display-md | 700 |
| Page h1 | `.display.display-sm` | display-sm | 700 |
| Prose h2 / h3 | `.prose h2/h3` | 2xl / xl | 600 |
| Lead | `.lead` | lg | 400 |
| Body | `.prose p` | lg (base < 700px) | 400 |
| Tab / button | `.tab-link`, `.btn` | base (sm < 700px) / sm | 400 / 700 |
| Menu link | `.menu-link` | display-xs | 600 |
| Eyebrow / caption | `.eyebrow`, `.fine-print` | micro | 700 / 400 |

## Radius (corners)

| Token | Value | Use |
|---|---|---|
| `--radius-xs` | 2px | Brand-mark squares, focus ring on inline links |
| `--radius-sm` | 4px | Illustration blocks, callouts |
| `--radius-md` | 8px | **All controls**: buttons, toggles, inputs, tiles |
| `--radius-lg` | 12px | Panels, artwork, cards |
| `--radius-full` | 9999px | Pills, round icon buttons, dots |

Don't mix: a button is always `md`; a card is always `lg`. Nested corners: inner radius = outer − padding (never larger than outer).

## Layout

- `.layout` = centered container: `min(--layout-max 1280px, 100% − 2×--gutter)`; `--gutter` is fluid 16→48px.
- `.layout-prose` caps reading width at `--layout-prose` (832px).
- Masthead: centered column `--masthead-max` (= `--layout-prose`, so its edges line up with page content; full width under 700px). Brand bar height `--header-height` (64 → 56px under 700px), then a bordered tab row. The whole masthead is sticky (paper background behind it). Menu opens as a full-height `--color-brand` `<dialog>` of the same width. On game pages the wordmark, menu and footer use the game's name and only its pages (no Inspira sections, no pill); the landing page keeps Inspira Games. Footer is minimal: one hairline-topped row in the same column — copyright left, "Contact us" and "Privacy policy" links right. Nothing else. Breakpoints: 800px (stack grids), 700px (compact type), 400px (tight).
- Borders: `--rule-width` (1px) for hairlines/controls, `--rule-width-strong` (3px) for the callout edge. Brand-mark squares: `--mark-block`.
- Touch targets ≥ `--control-height` 44px (`--control-height-sm` 40px only for secondary header controls).

## UI states

| Component | Default | Hover | Active / pressed | Current / selected | Focus-visible | Disabled |
|---|---|---|---|---|---|---|
| `.btn-primary` | inverse bg, on-inverse text | `--color-inverse-hover`, icon nudges | `--color-inverse-active`, translateY(1px) | — | 2px ring, 3px offset | opacity .5, no pointer |
| `.btn-secondary` | transparent, `line-strong` border | `paper-hover` fill | `paper-active` fill, translateY(1px) | `aria-expanded="true"` → `paper-active` | ring | opacity .5 |
| `.icon-btn` (on brand) | transparent | `brand-hover` fill | `brand-active`, translateY(1px) | — | on-brand ring, inset | — |
| `.tab-link` | paper, ink | `paper-hover` | `paper-active` | `aria-current` → ink fill, paper text | inset ring | — |
| `.menu-link` (on brand) | on-brand, no underline | 2px underline, icon tilts | — | `aria-current` → underline | on-brand ring | — |
| `.footer-link` | `ink-soft` | `ink`, `line-strong` underline | — | `aria-current` → `ink` + underline | ring | — |
| `.text-link` | ink | accent underline | — | — | ring | — |
| `.resource-row` | | title underline (accent), arrow fills + moves ↗ | arrow moves less | — | ring | — |
| `.prose a` | accent-strong, 1px underline | 2px underline | — | — | ring | — |

Focus ring is global: `:where(a, button, [tabindex]):focus-visible` → `outline: var(--focus-width) solid var(--game-accent, var(--color-focus))`. Inside dark surfaces add `.on-inverse` (ring → `--color-focus-inverse`); inside brand surfaces add `.on-brand` (ring → `--color-focus-brand`, coral brand-mark square swaps to paper). Never remove outlines.

State-signalling uses ARIA attributes (`aria-current`, `aria-expanded`, `aria-disabled`), not extra classes.

## Motion

`--duration-fast` 120ms (color/underline), `--duration-base` 200ms (fills, transforms), `--ease-out`. Movement ≤ 3px. No looping animation.

## Component recipes

```html
<!-- Buttons -->
<a class="btn btn-primary" href="#">Explore the game <Icon :icon="arrowRightUp" aria-hidden="true" /></a>
<button class="btn btn-secondary btn-sm" type="button">Menu</button>

<!-- Eyebrow + display heading -->
<p class="eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span>Sentence case label</p>
<h2 class="display display-md">Good to know<span>.</span></h2>

<!-- Masthead tab -->
<a class="tab-link" href="/x.html" aria-current="page">Privacy policy</a>
```

Markdown info pages: wrap content in `<div class="prose">`; draft notices are a leading `> **Draft, not for publication.** …` blockquote (renders as callout).

Tailwind utilities are generated only from system tokens (`bg-paper`, `text-ink-soft`, `rounded-md`, `font-serif`, `text-sm`); default Tailwind palettes/radii/fonts are cleared. Avoid class names that collide with Tailwind utilities (e.g. `container`) — use `.layout`.

## Checklist before finishing UI work

- [ ] `grep -nE '#[0-9a-fA-F]{3,8}\b|[0-9]+px' .vitepress/theme/style.css` — new hits only inside `.hero-art` or token-justified sizes (icon/art dimensions)
- [ ] Every new interactive element: hover, active, focus-visible (keyboard Tab through it), disabled if applicable
- [ ] Contrast checked for any new color pair
- [ ] Checked at 375px and 1280px; no horizontal scroll
- [ ] `npm run build` passes (also catches dead links)
