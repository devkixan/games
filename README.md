# Games

Guest-facing pages for our games.

## Pages

- [Kixan home](index.md) — `/index.html` (lists every game from `.vitepress/theme/navigation.ts`)

### Block Stack: Skybound

- [Home](blockstack-skybound/index.md) — `/blockstack-skybound/index.html`

- [Privacy policy](blockstack-skybound/privacy-policy.md) — `/blockstack-skybound/privacy-policy.html`
- [Terms of use](blockstack-skybound/terms-of-use.md) — `/blockstack-skybound/terms-of-use.html`
- [Contact](blockstack-skybound/contact.md) — `/blockstack-skybound/contact.html`

### Classic 90s Snake Game

- [Home](classic-90s-snake-game/index.md) — `/classic-90s-snake-game/index.html`

- [Privacy policy](classic-90s-snake-game/privacy-policy.md) — `/classic-90s-snake-game/privacy-policy.html`
- [Terms of use](classic-90s-snake-game/terms-of-use.md) — `/classic-90s-snake-game/terms-of-use.html`
- [Contact](classic-90s-snake-game/contact.md) — `/classic-90s-snake-game/contact.html`

### Paper Boat: River Rush

- [Home](paper-boat/index.md) — `/paper-boat/index.html`
- [Privacy policy](paper-boat/privacy-policy.md) — `/paper-boat/privacy-policy.html`
- [Terms of use](paper-boat/terms-of-use.md) — `/paper-boat/terms-of-use.html`
- [Contact](paper-boat/contact.md) — `/paper-boat/contact.html`

Add new guest-facing pages and their routes to this list when they are created.

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
