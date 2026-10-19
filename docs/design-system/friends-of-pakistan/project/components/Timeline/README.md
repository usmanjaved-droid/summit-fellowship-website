# Timeline

A row of 12px dots on a 2px rail showing how far a challenge has progressed; reached stages are yellow.

**Provide:** `stages` (labels, announced to screen readers) and `current` (index of the latest reached stage; −1 for none). Optional `label`.

- Rail and upcoming dots are `gray-50`, reached dots `primary` (8.6:1 on the green); dots are the only round shapes in the system (`radius-full`).
- Designed for the green grounds (challenge cards). On light grounds the rail disappears — don't use it there.
- Always pair with a status line in words ("Status: Accepting Solutions"); the dots alone don't explain the state.
