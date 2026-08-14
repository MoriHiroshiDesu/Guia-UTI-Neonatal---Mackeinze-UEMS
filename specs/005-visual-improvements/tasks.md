# Implementation Tasks: Visual Improvements

**Feature**: Visual Improvements
**Related Plan**: [plan.md](./plan.md)
**Status**: In Progress

## Phase 1: Favicon & Progress Bar

- [x] 1. Create `public/favicon.svg` with a design that fits the project (using teal/mint colors).
- [x] 2. Modify `src/components/Controls.jsx` to dynamically assign the class `scrubbing-active` to the `div.scrubber-wrapper` when `isScrubbing` is true.
- [x] 3. Update `src/styles/controls.css` to add `transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1)` to `.scrubber-fill`, but remove it when `.scrubbing-active` is applied.

## Phase 2: Aurora Background

- [x] 4. Create `src/styles/aurora.css` containing the layout, blur filters, and keyframe animations for the aurora layers.
- [x] 5. Create `src/components/AuroraBackground.jsx` that renders multiple animated `div` layers representing the aurora effect.
- [x] 6. Update `src/styles/index.css` to set the `html, body` background to the base color without the static gradient (which will now be handled by Aurora).
- [x] 7. Update `src/App.jsx` to import and place `<AuroraBackground />` inside `.app-container`.
- [x] 8. Verify the effect visually in the browser to ensure colors match `AGENTS.md` and "Impeccable Design" standards (discreet, harmonic, no neon clashing).
