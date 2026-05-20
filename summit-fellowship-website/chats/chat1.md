# Summit Fellowship Website

_Started 2026-05-13 12:55 UTC_

---

## User

i want to create the Summit fellowship website with multiple pages like Home, About, Cohort, faculty, venue, etc. the purpose of the website is to share information with the fellows and the faculty and then perhaps later on it can become like the official fellowship website.

## Assistant

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: list_files]_

_[tool: list_files]_

_[tool: questions_v2]_

## User

Questions answered:
- pages: Home, About the Fellowship, Cohort (fellows), Faculty & Organizers, Itinerary / Schedule, Venue (Khoj Resort, Skardu), Travel & Logistics, Curriculum / Frameworks, Contact, Also add any other pages that feel useful, Resources / Downloads
- aesthetic: Mountain / expedition — earthy, textured, topographic
- palette: 0
- typography: Serif headlines + sans body (editorial)
- imagery: Use beautiful Unsplash stock for now
- interactivity: Day-by-day itinerary explorer with hover details, Cohort grid with hover bios / click-to-expand, Faculty cards with expand-to-read, Animated map of Skardu / venue, Countdown to June 7, Smooth page transitions, Filter cohort by sector
- navigation: Multiple HTML files linked via nav (classic multi-page)
- logo: Create a logo that feels natural with the vibe
- audience_now: It should be a public facing website

## Assistant

_[tool: update_todos]_

Got it. Let me plan and build.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

Now the home page. I'll go for an editorial/expedition aesthetic with strong hero typography.

## Assistant

_[tool: show_html]_

_[tool: show_to_user]_

_[tool: write_file]_

_[tool: write_file]_

Home looks good. Now let me build the remaining pages. I'll create them in parallel efficient writes.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: update_todos]_

_[tool: done]_

All 10 pages built. Let me surface to user and verify.

_[tool: fork_verifier_agent]_

The Summit Fellowship site is built — ten linked pages with a mountain/expedition aesthetic, deep alpine + ochre palette, and editorial type pairing (Instrument Serif + Geist + JetBrains Mono).

**What's here:**
- **Home** — full-bleed Karakoram hero, live countdown to June 7, the "Arc of the Week," cohort + faculty previews, venue teaser
- **About** — philosophy pull-quote, the four Enoughs, methodology pillars
- **Cohort** — all 11 fellows with sector filter chips, hover states, click-to-expand modal with contact info
- **Faculty & Organizers** — split into 2 sections (5 faculty + 4 organizers), each with org context + relevance
- **Itinerary** — sticky day-selector strip + animated week-progress ribbon; click any day to open its full hour-by-hour timeline
- **Venue** — animated SVG map of the Shigar valley with Khoj basecamp, Shigar Fort, airport, and dashed travel routes; spaces grid
- **Travel** — two routes (fly vs. drive), 7-day weather forecast strip, packing checklist on alpine background, expanding FAQ
- **Curriculum** — 5 modules with sticky side-headers, framework diagrams, banned-words showcase
- **Resources** — file-style download cards (PDF/MD/XLSX/ZIP icons), pre-read reading list, brand pack
- **Contact** — 5 channel cards + working form + co-host cards

**Visual notes:**
- Topographic SVG textures layered subtly throughout
- Smooth cross-page transitions via View Transitions API
- Logo is a small three-peak expedition mark + wordmark
- All hover states and animations are intentional, no AI-slop tropes
- Unsplash imagery for Karakoram + venue scenes (placeholder until you have real Skardu/Khoj photos)

**Next steps when you're ready:**
1. Swap Unsplash photos for real Khoj / Skardu / cohort photography
2. Replace placeholder email addresses (`hello@summitfellowship.pk` etc.) with the real ones
3. Hook the contact form to a real endpoint
4. Drop in real PDFs/worksheets in `/uploads/` for the Resources page downloads
5. Add a CMS or static-site generator if you want non-technical edits later

