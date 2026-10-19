# SiteFooter

The deep-green footer: link columns under yellow `heading-5` heads (8.6:1), an outlined yellow callout box, and a bottom bar with logo, centred legal text and an end mark.

**Provide:** `columns` (`[{ title, links }]`, four), optional `callout` (`{ title, text, href, linkLabel }`), `logo`, `legal` (lines of text), `endMark`.

- Grid: 2 columns, 4 from 1024px, 5 from 1280px (the callout spans the row until then); gaps `space-4` × `space-10`; links 18px Book white, `space-4` apart, hover `opacity-hover-footer`.
- Callout: 1px `primary` border, 28 × 32px padding, `heading-4` title, a `lg` arrow link bottom-right.
- Bottom bar: `space-15` above, `space-8` padding-top, 1px white-25% rule; legal in `legal` style.
