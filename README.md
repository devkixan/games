# Games site

A shared VitePress site for game information and support pages. Block Stack Skybound is the first game; the Snake game has not been migrated.

## Development

Use Node.js 20 or newer and npm:

```sh
npm install
npm run dev
npm run build
npm run preview
```

VitePress writes the static site to `.vitepress/dist`. Deploy the contents to a static host. The default base is `/`; for a subdirectory deployment, build with `SITE_BASE=/your-prefix/ npm run build` and host the output at that prefix. Configure the host to serve `404.html` with a 404 status for missing paths, including `/`, and serve the Block Stack `.html` pages directly.

## Adding a game

1. Add a directory named after the game's URL slug, with its individual Markdown pages.
2. Add the game to `.vitepress/theme/navigation.ts`: set its `name`, directory `prefix`, and `accentColor`. Optionally import a logo and set `logo`, `homeHref`, and `downloads` (`appStore` and/or `googlePlay` URLs). Without a logo the game name is used; without download URLs the store buttons show as coming soon. Set `links` with `readLinks(navigationFiles, '/game-slug/navigations.md') ?? []` and `footerLinks` with `readLinks(footerFiles, '/game-slug/footer.md')`. The accent must reach 4.5:1 contrast on the page background (`#f8f8f1`). Internal URLs in this configuration should start with `/`; the theme applies the configured base path.
3. Add `navigations.md` and `footer.md` to the game directory. Use one Markdown link per list item, for example `- [Contact](/game-slug/contact.html)`. Headings and blank lines are allowed. The order controls display order; an empty footer file hides footer links, while an absent footer file falls back to navigation links. These configuration files are excluded from published pages.
4. Set each page’s `pageTitle` and `description` in its Markdown frontmatter and write its content below. Use relative links between that game's Markdown pages. Shared layout and styling live in `.vitepress/theme`; design tokens live in `.vitepress/theme/tokens.css`.
5. Build and preview, checking direct page loads and links under the intended base path.

The Block Stack privacy and terms pages are **drafts, not for publication**. Confirm all bracketed details and obtain appropriate review before publishing them.

## Design system

All colors, type, radii, spacing, motion and UI states come from `.vitepress/theme/tokens.css`. The rules for using them are in `.claude/skills/design-guidelines/SKILL.md`, which Claude Code loads automatically when working on UI here.

Solar icons are available through Iconify. Import individual icons so only the icons used by a component are bundled:

```vue
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import arrowRightUp from '@iconify-icons/solar/arrow-right-up-linear'
</script>

<template>
  <Icon :icon="arrowRightUp" aria-hidden="true" />
</template>
```
