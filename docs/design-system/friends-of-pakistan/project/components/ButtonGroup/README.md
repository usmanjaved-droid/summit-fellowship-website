# ButtonGroup

A segmented control of equal-width text buttons inside one `line` border; the selected segment fills yellow.

**Provide:** `options` (strings or `{ value, label }`), the selected `value`, `onChange(value)`, and a `label` for assistive tech. The container sets the width; segments share it.

- Segments are 40px tall, 16px horizontal padding, Semibold, divided by 1px `line` rules. Selected: `primary` fill, `on-accent` label, `aria-pressed="true"`.
- Use for 2–4 mutually exclusive filters (open / coming soon / closed). More options: a `Select`.
- The group's outer border is `line` (1.8:1 on white): the yellow selected segment carries the state, not the border.
