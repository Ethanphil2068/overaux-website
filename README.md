# OverAux — The Chillin' Zone · Website

A fan-made showcase website for **OverAux The Chillin' Zone**, a homegrown café in Bacolod City, Philippines.

## Run it

No build step — just open `index.html` in any browser, or serve it locally:

```bash
cd C:\dev\overaux-website
npx serve .
```

## What's inside

| File | Purpose |
|---|---|
| `index.html` | Single-page site: hero, about, menu, promos, ratings, branches, hours/map, reservation form |
| `css/styles.css` | Dark café design system (coffee blacks, amber/gold, Fraunces + Sora fonts) |
| `js/script.js` | Menu data + rendering, category tabs, live search, reveal animations, counters, star ratings, form validation toast |

## Features

- **Menu** — 24 items across 8 categories with tab filtering and live search; confirmed prices shown as "listed price", inferred ones marked `~` / "est. price"
- **Ratings** — real aggregate data (Facebook 3.3/5 · 347 reviews, 100% recommend from 332; Google 3.8/5 · 15) with animated bars and actual review quotes
- **Branches** — B.S. Aquino Drive (main), Alangilan (sunset views), plus a notice that the old 4th St branch closed
- **Helpful stuff** — opening hours with auto "today" highlight, Google Maps embed, delivery options (foodpanda / GrabFood / direct call), promos, reservation request form
- Fully responsive, keyboard/ARIA-friendly, `prefers-reduced-motion` respected

## Data sources (public listings & posts, as of Nov 2026)

- [OverAux on Facebook](https://www.facebook.com/OverAuxTheChillinZone) — promos, prices, branch info
- [Restaurant Guru listing](https://restaurantguru.com/OverAux-The-Chillin-Zone-Bacolod) — ratings, reviews, hours

> ⚠️ Unofficial fan project. Prices and details may have changed — call +63 954 486 7401 to confirm before visiting.
