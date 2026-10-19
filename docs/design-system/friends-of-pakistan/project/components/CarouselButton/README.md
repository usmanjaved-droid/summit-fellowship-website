# CarouselButton

The 60 × 36 yellow previous/next control that sits half outside a carousel's edge.

**Provide:** `direction` (`prev` | `next`), `onClick`, optional `label` (defaults to "Previous"/"Next") and `disabled` at the ends.

- Arrow is the 32px path at 24 × 12. `arrowColor="black"` (default, 13.4:1 on yellow) or `"white"`.
- `white` is 1.4:1 on this yellow — below the 3:1 icon floor; don't use it here.
- Position absolutely at the carousel's vertical middle, `-32px` outside each edge (−80px from 1536px).
