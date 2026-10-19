# Select

A native select in the public-site style: `field-border` border and a small triangle caret on the right — green on light grounds, yellow on the green bands.

**Provide:** `label`, `options` (strings or `{ value, label }`), optional `placeholder` (an empty first option), `hint`, `invalid`, and select props.

- Caret is the base system's 12 × 9 triangle (`caret-green.svg` / `caret-yellow.svg`), 1rem from the right edge; padding-right `space-8`.
- Same focus, error and contrast rules as `Input`. For 2–4 options that must be visible at once, use a `ButtonGroup` or `Radio` set.
