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

Game headers show Home, Contact and Blog. Privacy policy and terms of use remain
in each game's footer. Each blog is a static Markdown listing (`<game>/blog.md`)
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
aged 13 and over: AdMob banner, interstitial and rewarded ads with consent and
privacy choices; Apple/Google leaderboards; no game accounts, real-money purchases,
or separate analytics/crash reporting; local progress without developer backup;
and indefinite support-message retention, subject to deletion requests and law.
The app source reviewed on November 23, 2026 did not yet include live advertising
or leaderboard integrations. Before publishing these pages, verify the release
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
