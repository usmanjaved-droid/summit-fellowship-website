# Section

A full-width band in one of four grounds — off-white, white, yellow or deep green — holding a 1440px container.

**Provide:** `tone` (`offwhite` | `white` | `yellow` | `green`; the base system's `gold` and `black` still work and map to `yellow` and `green`), `children`, optional centred `title` (`heading-4`, in `ink-brand`) and `intro` (`body-light`), `tight` for 32px padding.

- Off-white, white and yellow: `space-16` top and bottom (`space-8` under 1024px). Green: `space-36` (`space-24` under 1024px), and it sets `data-theme="dark"` so every token inside flips.
- Container: max `container-max`, side padding `container-pad`.
- Alternate grounds down the page (green hero → off-white intro → green stats → yellow people carousel → white programmes → yellow offers → green footer). Never stack two yellow bands without a light or green one between, except when a photo overlaps their seam.
