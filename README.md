# Week Tracker

One week of your life, tracked the way lawyers bill it: in tenths of an hour.

A single-file web app for a one-week experiment: log every 6-minute block of your
day against a category, punch in money the moment you spend it, and log media the
moment you consume it. At the end of the week you have a time-use survey, a spend
tracker, and a media-diet overview — per person, with zero accounts.

## Using it

- **Time** — the day is a tape of 240 six-minute blocks. Tap a block, pick a
  category (or add one with **+ New**). Set the From/To times directly, or use
  the duration chips (6 min, 30 min, 1 h, 2 h, → now — "→ now" fills up to the
  current time, the fastest way to log "I've been doing X since 9:00").
  Tapping an already-logged block selects its whole stretch so you can move or
  resize it. You can also **press and hold a logged block, then drag** to
  stretch it across more of the day.
- **Money / Media** — each tab is its own logging page: punch in the amount +
  what for, or the title + type + minutes, right at the top. The time defaults
  to now and can be adjusted. Tap any logged entry below to edit or delete it.
- **Summary** — totals, the week barcode (each day as a colored strip of its 240
  blocks), hours per category in 0.1h units, spend by purpose, media by type.
  "Copy week summary" puts a text digest on the clipboard for the group chat.

## Your data

Everything lives in your own browser (localStorage) — nothing is sent anywhere.

- **Install it**: open the site in Chrome on your phone → menu → *Add to Home
  screen*. Works offline after the first load.
- **Back up / move devices**: Settings → *Export / share (JSON)*, then *Import*
  on the other device. A snapshot is also taken automatically on the first open
  of each day (Settings → restore).
- **Optional device sync**: Settings has an advanced option to sync one person's
  data between their own phone and desktop via a private gist (see the in-app help).
- **Preview with fake data**: add `?demo=1` to the URL (nothing is saved).

## Hosting / development

Static files, no build step: `index.html` (the whole app), `sw.js` (offline
cache), `manifest.webmanifest` + icons (installability). Serve from any static
host; HTTPS is required for install + offline.

Debug helpers: `?vw=390` constrains the layout to a given width, `?noscroll`
disables scroll-to-now (both used for headless screenshot testing).
