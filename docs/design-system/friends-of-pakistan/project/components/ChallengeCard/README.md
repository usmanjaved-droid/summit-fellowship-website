# ChallengeCard

A carousel card for an open, upcoming or closed challenge: 16:9 image with a status badge over a deep-green body with eyebrow, title, summary, status line, stage timeline and a full-width CTA.

**Provide:** `title`; optional `image` + `imageAlt`, `badge` (`{ label, tone }`), `category` (the impact area, shown as a yellow eyebrow), `summary` (one question or sentence, ~25 words), `status`, `stages` + `current`, `cta` (`{ label, href, variant }`, default white "Explore challenge"). The parent sets the width (≈340px in a 4-up carousel) and stretches cards to equal height.

- The whole card is a Dark context; body padding `space-6` top, `space-4` sides and bottom; `shadow-3xl` lifts it off the light ground.
- Image dim is `scrim-card`. Title `heading-5`, summary `card-body`, status `status` in yellow (8.6:1 on the green).
- Closed challenges switch the CTA to `variant: 'primary'` ("Explore solutions") and use an outline badge.

Don't put two CTAs in a card or drop the status line.
