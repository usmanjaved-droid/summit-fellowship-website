# Badge

A square, uppercase status label pinned to the top-right corner of a card image.

**Provide:** `children` (one or two words: "Coming soon", "Closed") and optional `tone`.

- `tone="primary"` (default): yellow `primary` fill and border, `on-accent` (black) text — for anything open or upcoming.
- `tone="outline"`: transparent with a 1px `line-strong` border and text — for closed or past items. Put it inside a dark context (`data-theme="dark"`) over images so it renders white.
- 14px/20px Semibold uppercase, padding `space-1` × `space-3`, inset `space-3` from the image corner.

The badge carries its meaning in words; tone is secondary. Don't use it as a button.
