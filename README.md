# Games

Guest-facing pages for our games, hosted at [devkixan.com](https://devkixan.com/).

## Pages

- [Kixan home](index.md) — `/index.html` (lists every game from `.vitepress/theme/navigation.ts`)

### Block Stack: Skybound

- [Home](blockstack-skybound/index.md) — `/blockstack-skybound/index.html`
- [Blog](blockstack-skybound/blog.md) — `/blockstack-skybound/blog.html`
- [Build your first tower](blockstack-skybound/blog/getting-started.md) — `/blockstack-skybound/blog/getting-started.html`

- [Privacy policy](blockstack-skybound/privacy-policy.md) — `/blockstack-skybound/privacy-policy.html`
- [Terms of use](blockstack-skybound/terms-of-use.md) — `/blockstack-skybound/terms-of-use.html`
- [Contact](blockstack-skybound/contact.md) — `/blockstack-skybound/contact.html`

### Classic 90s Snake Game

- [Home](classic-90s-snake-game/index.md) — `/classic-90s-snake-game/index.html`
- [Blog](classic-90s-snake-game/blog.md) — `/classic-90s-snake-game/blog.html`
- [Back for another round](classic-90s-snake-game/blog/getting-started.md) — `/classic-90s-snake-game/blog/getting-started.html`

- [Privacy policy](classic-90s-snake-game/privacy-policy.md) — `/classic-90s-snake-game/privacy-policy.html`
- [Terms of use](classic-90s-snake-game/terms-of-use.md) — `/classic-90s-snake-game/terms-of-use.html`
- [Contact](classic-90s-snake-game/contact.md) — `/classic-90s-snake-game/contact.html`

### Paper Boat: River Rush

- [Home](paper-boat/index.md) — `/paper-boat/index.html`
- [Blog](paper-boat/blog.md) — `/paper-boat/blog.html`
- [Your first trip down the river](paper-boat/blog/getting-started.md) — `/paper-boat/blog/getting-started.html`
- [Privacy policy](paper-boat/privacy-policy.md) — `/paper-boat/privacy-policy.html`
- [Terms of use](paper-boat/terms-of-use.md) — `/paper-boat/terms-of-use.html`
- [Contact](paper-boat/contact.md) — `/paper-boat/contact.html`

Add new guest-facing pages and their routes to this list when they are created.

Game headers show Home, Blog and Contact. Privacy policy and terms of use remain
in each game's footer. Every game home has a full-width, viewport-filling artwork
hero, progressive blur toward the bottom-left, consistent top navigation, store
placeholders and a Watch on YouTube control. Set `heroImage` and optional `trailerVideoId`
in `.vitepress/theme/navigation.ts`; games without a video show “Watch on YouTube — Coming soon.” Snake uses YouTube video `yqsold2lR20` as a muted, looping background;
`trailerAspectRatio` controls how the video fills the hero. A small Pause video /
Play video control pauses and resumes the same YouTube player in place. Video
backgrounds have no fallback image; `heroImage` is used only for games without
a video. Visitors who prefer reduced motion start with autoplay off. The Watch on YouTube control links directly to the video on YouTube.

Each blog is a static Markdown listing (`<game>/blog.md`)
with articles in `<game>/blog/`. The listing builds cards from article frontmatter
at build time. Add a Markdown article with `blog: true`, `pageTitle`, `description`,
`date` (quoted ISO date), `author`, `image`, `imageAlt`, `imageWidth`, `imageHeight`
and `caption`; include `<BlogArticleIntro />` inside the article for its byline,
breadcrumb and figure. Images live under `public/<game>/blog/` and reuse the
original game artwork. Blog stays highlighted while reading an article.

SEO metadata includes canonical URLs, Open Graph/Twitter cards, article JSON-LD
and breadcrumbs. A sitemap is generated at build time. `SITE_URL` is the full
production site root (defaults to `https://devkixan.com/`); deployment
sets it from the GitHub Pages URL. `SITE_BASE` controls the path used by local
links and assets. All article content and card links are rendered in static HTML.

Paper Boat's pages describe the publisher-confirmed worldwide release for players
aged 13 and over: AdMob banner (home and results screens), between-run
interstitial and rewarded ads with UMP consent and in-game Ad privacy choices; no
leaderboards (ranked mode was retired), game accounts, real-money purchases, App
Tracking Transparency prompt, or separate analytics/crash reporting; local progress
without developer backup; and indefinite support-message retention, subject to
deletion requests and law. Pages were checked against the app source (including
its staged AdMob integration) on November 24, 2026. Before publishing, verify the release
build, SDKs and any mediation partners, consent controls, platform disclosures,
and delivery of support/privacy requests through the supplied form against them.

## Version manifests

Each game's `public/<game>/version.json` contains the latest `android` and `ios`
version strings and a shared update message:

```json
{
  "android": "1.1.1",
  "ios": "1.1.1",
  "message": {
    "heading": "Update available",
    "toast": "A new version is available. Update now!",
    "description": "A new version is available. Update to get the latest improvements."
  }
}
```

Edit `message.heading` and `message.description` to customize the update prompt.
Edit `message.toast` to customize the update toast text.
Game clients must read these fields to display the message and should use their
default copy if the message or any field is missing or empty.
