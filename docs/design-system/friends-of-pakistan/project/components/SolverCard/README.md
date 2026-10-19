# SolverCard

A square photo tile for a featured team: a bottom-up deep-green `scrim-image` gradient and a caption with a 4px yellow rule on its left.

**Provide:** `name`, `description` (one sentence, clamped to 5 lines), `image` (portrait or documentary photo, square-cropped by `object-fit: cover`) and `href`. The parent sets the width (≈450px in a yellow people carousel).

- Caption inset `space-6` from left and bottom, 75% wide, rule padding `space-6`; name `heading-5`, description `body-sm`, both white.
- The gradient fades to `opacity-scrim-hover` (0.5) on hover. The whole tile is one link named by `name`.
- Use real photography of people at work; never a stock illustration.
