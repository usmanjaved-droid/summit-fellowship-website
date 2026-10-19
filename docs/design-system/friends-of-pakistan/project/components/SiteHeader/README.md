# SiteHeader

The 64px header that floats over the green or photo hero: logo left, uppercase nav centred, a Log In link right, over a `scrim-header` fade.

**Provide:** `logo` (your own mark as a node — no logo ships with this system), `logoHref`, `links` (`[{ label, href, active }]`, five or six top-level items) and optional `action` (`{ label, href }`).

- Nav: `nav` style (18px Semibold uppercase, white), items `space-10` apart and full `nav-height` tall so hovering opens a `MegaMenu` below.
- Log In: 18px Medium white, `hover-yellow` on hover.
- Overlap the first section by `-nav-height`; the hero must be dark. Under 1024px the source swaps the nav for a yellow 28px "Menu" button.
