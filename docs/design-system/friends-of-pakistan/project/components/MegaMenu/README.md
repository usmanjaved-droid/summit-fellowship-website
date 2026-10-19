# MegaMenu

The white drop-down panel under a header item: a square image, then one or two link columns divided by a `line` rule.

**Provide:** `columns` (`[{ title?, href?, links: [string | { label, href }] }]`; a column without `title` keeps its links aligned with the first) and optional `image`.

- Panel `menu-width` (1024px), padding `space-3`, `white`, `shadow-3xl`, hanging from `nav-height`.
- Column: top offset `space-13`, title `heading-4` with `space-10` sides and `space-6` below, links `menu-link` (Book uppercase) `space-6` apart; hover `opacity-hover-menu`.
