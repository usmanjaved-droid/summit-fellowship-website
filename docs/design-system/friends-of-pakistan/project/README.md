A redesign direction for friendsofpakistan.org: the structure, type scale and components of the Solve Study system (studied from solve.mit.edu, unofficial, no Solve assets), recoloured with the Friends of Pakistan palette read from the current site — its yellow accent, its headline and logo greens, its off-white ground and its charcoal. Only the colours are Friends of Pakistan's so far; type and components are still the base system's.

## The idea in one line

Four grounds — off-white, white, Friends of Pakistan yellow, deep logo green — stacked in full-width bands; green light-serif headlines on the light grounds, semibold uppercase sans for everything you can click; square corners, one shadow, one arrow.

## Content fundamentals

- **Voice.** Mission-first, confident and plain. Sentences are short and active and talk about people scaling good work: "we" is the Society and Fund, "you" is the member, leader or funder. Big claims are backed by a number (`Stat`), not adjectives.
- **Headlines are sentence case** and set in the light serif in `ink-brand` green (`heading-2`: "Our purpose"). Section titles over grids and carousels are short uppercase sans (`heading-4`: "How to engage us").
- **Every action is an uppercase verb phrase of one to three words** — "Join", "Donate", "Find our insights", "Get in touch". Write them in sentence case in code; CSS uppercases them.
- **Lists of people or organisations are one line each**: a name and one sentence of what they do.
- No emoji, no exclamation marks, no decorative icons. Numbers use figures ("40M+", "30M+").

## Visual foundations

**Colour.** Two brand hues and two neutrals, all from the current site:
- `primary` — Friends of Pakistan yellow (#ffc700, the site's accent). It floods whole bands and fills the few elements that matter: the primary `Button`, `SquareCta`, `Badge`, `CarouselButton`, the reached `Timeline` dot, the 4px caption rule on `SolverCard`. Text on it is always `on-accent` (black, 13.4:1). Yellow is text only on the green bands (8.6:1) or black; never on white or off-white (1.4:1 — the current site does this, and it is unreadable).
- `brand-green` (#006600, the site's headline green) — display headlines and section titles on light grounds (`ink-brand`), link underlines (`link`), form-field borders (`field-border`) and success.
- `brand-green-deep` (#003800, the logo green #004e00 taken a step darker) — the ground of the dark bands: hero, stats, challenge cards and the footer. White text on it is 13.4:1, yellow 8.6:1. `brand-green` is never a ground for white text.
- `off-white` (#f4f4f3) is the default page ground, alternating with `white` bands; `charcoal` (#383838) is secondary text (`ink-soft`). Body text is `black`.
- Greys (`gray-*`) are functional only — button states and outlines.

**Themes.** Light is the off-white and white bands; Dark is the deep-green band. Set `data-theme="dark"` on a green section and every semantic token (`surface`, `ink`, `ink-brand`, `ink-soft`, `line`, `line-strong`, `field-border`, `link`, `focus`) flips. Yellow bands use the Light tokens on a `primary` fill (`Section tone="yellow"`).

**Page rhythm.** Alternate grounds: green (or photo) hero → off-white intro with a `SquareCta` → green stats band → yellow people or members carousel → white programmes carousel → yellow offer bands → green footer. Off-white, white and yellow bands pad `space-16` (`space-8` under 1024px); green bands pad `space-36` (`space-24`). Content sits in a `container-max` (1440px) container with `container-pad` (32px) sides. Photos may overlap the seam between two bands, lifted by `shadow-3xl`.

**Type.** Still the base system's: Freight Text Pro Light for display and Freight Sans Pro for everything else (Adobe Fonts, licensed, not shipped), with `Crimson Pro` and `Source Sans 3` from Google Fonts standing in. The current Friends of Pakistan site uses Space Grotesk for headings and Raleway for body; neither is applied here yet.
- Display (`heading-xl`, `heading-1`, `heading-2`, `stat`) is always serif at weight 300, sentence case, line-height 1.25 (1 on small screens), in `ink-brand`.
- Headings in sans are Semibold 600: `heading-3` 32px, `heading-4` 24px uppercase, `heading-5` 18px.
- Body is 18px with a 25px line: `body` at Book (350), `body-light` (300) for intro paragraphs. Small text is 14px (`card-body`, `body-sm`); the smallest is 12px (`eyebrow`, `status`).
- Interface labels (`button`, `nav`, `badge`, `link-arrow`, `cta-square`, `stat-caption`) are Semibold uppercase with normal tracking.

**Shape.** `radius-none` everywhere: buttons, cards, badges, inputs, images, panels. Only `Timeline` dots and radios are round (`radius-full`). (The current site's pill buttons are not carried over.)

**Borders and rules.** 1px (`border-1`) for controls and hairlines, 2px (`border-2`) for checkboxes and radios, 4px (`border-4`) for the yellow caption rule. `line` (black or white at 25%) is decorative; `line-strong` marks rules that carry meaning; `field-border` outlines form controls.

**Elevation.** One shadow, `shadow-3xl` (0 20px 50px, 25% black), for challenge cards, the overlapping photo and the mega menu.

**Imagery.** Full-bleed landscape and people photography — mountains, valleys, cities, communities across Pakistan — cropped square or 16:9 with `object-fit: cover`. White text over photos always sits on a scrim: the deep-green `scrim-image` gradient on tiles (it ties photos to the green bands), `scrim-band` (the site's charcoal at 40%) flat over band photos, `scrim-card` over card images, `scrim-header` behind the header.

**Motion.** Colour, background and border transitions run 150ms `cubic-bezier(.4, 0, .2, 1)`. Arrows nudge 8px right on hover with a 150ms ease-in. Tile scrims fade on hover (`opacity-scrim-hover`). Menu links dim to `opacity-hover-menu`, footer links to `opacity-hover-footer`.

**States.** Hover: yellow fills darken to `primary-dark`; white buttons go `gray-50`; links dim or move their arrow; the header's Log In turns `hover-yellow`. Disabled: `opacity-disabled` (0.65). Focus: a solid 2px `focus` outline 2px outside the element — `gray-900` on light grounds and yellow, `white` on green. Errors: `danger-400` border plus the message in words.

## Accessibility notes

Every text and control pair this system paints clears WCAG AA; the ones to watch:

- Yellow is never text on a light ground (1.4:1). Green headlines on a yellow band are 4.6:1 — keep them 24px and up.
- `line` hairlines are 1.8:1 on off-white and 2.1:1 on deep green — decorative only.
- `danger-600` is 4.8:1 on white but 4.3:1 on off-white: put danger text on white.
- `CarouselButton arrowColor="white"` is 1.4:1 on this yellow — use the default black.

## Iconography

One icon: the long thin arrow with an open chevron head, 16px tall, in lengths 32, 45 and 55 (`Arrow`; files in the Icons asset group). It always follows a text label and is decorative. Forms add a triangle select caret (green on light, yellow on green) and small checks. No icon font, no emoji.

**Logo.** Not included yet. Components take a `logo` node: pass the Friends of Pakistan mark (its green wordmark reads 10:1 on white; on the green bands use a white or yellow version), or set the name in `heading-5`.

## Using the components

Components are `window.FriendsOfPakistan.*` in `components/bundle.js` (React 18) with styles in `components/bundle.css`; class names are prefixed `ss-`. Wrap green areas in `data-theme="dark"` (`Section tone="green"`, `ChallengeCard` and `SiteFooter` do it for you). Build a page from `Section` bands: `SiteHeader` over a green or photo hero, `Stat` rows on green, `SolverCard` carousels on yellow with `CarouselButton`s, `ChallengeCard` carousels on white, `ArrowLink`s to close each band, `SiteFooter` last.
