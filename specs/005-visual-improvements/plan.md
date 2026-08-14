# Implementation Plan: Visual Improvements

**Feature**: Visual Improvements
**Related Spec**: [spec.md](./spec.md)

## Architecture & Technical Approach

### 1. Progress Bar Animation
To achieve a smooth animation that does not interfere with the interactive scrubbing:
- Update `Controls.jsx` to dynamically add a class (e.g., `is-scrubbing`) to the `.scrubber-wrapper` when `isScrubbing` state is `true`.
- Update `controls.css` to add a CSS transition `transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1)` to `.scrubber-fill` ONLY when the wrapper does NOT have the `is-scrubbing` class. This ensures smooth page turns but instant, lag-free response while dragging.

### 2. Favicon
- Create a `public` directory at the project root if it doesn't exist.
- Generate a new SVG icon that fits the guide's visual identity (e.g., a simple vector representation of a book with a small heart or cross, using the teal brand color `#0f766e`).
- Save it as `public/favicon.svg`.

### 3. Aurora Blur Background
To implement an Aurora Blur effect without external server-side dependencies:
- Create a new reusable React component `src/components/AuroraBackground.jsx` or just pure CSS inside `src/styles/aurora.css`.
- The Aurora effect uses fixed `div` elements with varied, slow CSS animations (translation, scaling, and rotation) and heavy CSS `filter: blur(...)`.
- Colors will map to the existing palette:
  - Teal (`#0f766e` / `rgba(15, 118, 110, 0.5)`)
  - Mint (`#d1fae5` / `rgba(209, 250, 229, 0.5)`)
  - Amber (`#d97706` / `rgba(217, 119, 6, 0.3)`)
- Integrate this component in `src/App.jsx` as a background layer (`z-index: -1`, `position: fixed`, `inset: 0`).
- Remove or adjust the static `background` property in `index.css` to allow the aurora to show through properly.

## Impact Analysis

- `src/components/Controls.jsx`: Minor impact. Adds a dynamic class based on existing state.
- `src/styles/controls.css`: Minor impact. Adds transition rules.
- `public/favicon.svg`: New file.
- `src/styles/index.css`: Minor impact. Adjusts root background to accommodate the new aurora component.
- `src/components/AuroraBackground.jsx`: New file. Implements the visual effect.
- `src/styles/aurora.css`: New file. Contains the complex keyframes and blur for the aurora effect.
- `src/App.jsx`: Minor impact. Imports and renders the `AuroraBackground` component.

## Phase Strategy

1. **Phase 1: Favicon & Progress Bar**
   - Create `favicon.svg` and place it in `/public`.
   - Update `Controls.jsx` and `controls.css` to handle the progress bar transition.
2. **Phase 2: Aurora Background**
   - Create the Aurora components (`AuroraBackground.jsx` and `aurora.css`).
   - Integrate into `App.jsx` and adapt `index.css`.

## Rollback Plan

If performance issues arise with the Aurora background:
- Remove `<AuroraBackground />` from `App.jsx` and restore the static radial gradient in `index.css`.
- Reverting `controls.css` transition rule if any glitch occurs during drag.
