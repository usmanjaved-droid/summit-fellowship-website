# Button

The square, uppercase Semibold button; yellow `primary` is the default and the page's main action.

**Provide:** `children` (the label, a verb phrase: "Explore challenge", "Apply now"), and `href` to render a link instead of a `<button>`. Optional `variant`, `size`, `block`, `icon`, `disabled`.

- `variant`: `primary` (yellow, `on-accent` black label 13.4:1, hover `primary-dark`) · `white` (white fill, `gray-800` label, `line` border; the card CTA) · `hollow` (transparent, `line-strong` border and label; on the green bands) · `danger` (white fill, `danger` border, `danger-600` label) · `cancel` (`gray-200` fill, `gray-300` hover).
- `size`: `sm` 36px / 14px (inside cards) · `md` 44px / 16px · `lg` 48px / 18px · `xl` 52px / 18px · `2xl` 56px / 20px (public form submit). Min width 96px.
- `block` fills the container (every challenge-card CTA). `icon` appends the 32px arrow, which nudges 8px on hover.
- Corners are always 0. Disabled is `opacity-disabled` (0.65) with no pointer events.

Do: one yellow button per view region; a white button on green cards; a hollow button only on the green bands.
Don't: yellow buttons on a yellow band (use an `ArrowLink`), rounded corners, sentence-case labels — the label is uppercased by CSS, so write it in sentence case in code.

Source note: the site sets the danger label in `danger` (3.8:1 on white); this system uses `danger-600` (4.8:1).
