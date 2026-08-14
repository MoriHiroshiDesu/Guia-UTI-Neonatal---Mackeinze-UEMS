# Feature Specification: Visual Improvements

**Feature Branch**: `005-visual-improvements`

**Created**: 2026-08-14

**Status**: Draft

**Input**: User description: "progres bar da pagina, não tem efeito de animação ao passar a pagina pelo button ou pelo swipe. Vamos adicionar um efeito suave. Adicione o favicon, gere um favicon para o site. Já devia ter sido corrigido antes mas ainda não foi, temos um fundo branco feio tanto na versão web quanto na desktop. Vamos adicionar o componente 'Aurora Blur' do reactbits, mas vamos definir cores condizentes com o estilo do guia, e vamos integrer da maneira discreta e harmonica ao fundo"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Progress Bar Animation (Priority: P1)

As a user navigating the digital guide, I want to see a smooth animation on the progress bar when I turn the pages using buttons or swipe gestures, so that the reading experience feels more fluid and less abrupt.

**Why this priority**: Enhances the tactile and premium feel of the application, aligning with the "Impeccable Design" goals.

**Independent Test**: Can be independently verified by observing the progress bar visually filling or unfilling during a page turn (via swipe or navigation buttons) to check for a smooth visual transition instead of an instant jump.

**Acceptance Scenarios**:

1. **Given** the user is on page 1, **When** they click the "Next" button, **Then** the progress bar width increases smoothly to the new percentage with a transition effect.
2. **Given** the user swipes to turn a page, **When** the page changes, **Then** the progress bar updates its position with a smooth easing animation.

---

### User Story 2 - Application Favicon (Priority: P2)

As a user opening the guide in a web browser, I want to see a clear and relevant favicon in the browser tab, so that I can easily identify the open tab among others.

**Why this priority**: Crucial for brand identity and browser tab usability, especially for a health guide.

**Independent Test**: Can be verified by loading the application in a browser and checking the tab icon.

**Acceptance Scenarios**:

1. **Given** the application is loaded, **When** the browser tab is displayed, **Then** a custom SVG favicon (consistent with the neonatal care theme) is visible in the tab.

---

### User Story 3 - Aurora Blur Background (Priority: P1)

As a user viewing the guide on any device, I want the background of the application to feature a subtle, harmonic "Aurora Blur" effect rather than a plain white background, so that the visual experience feels modern, premium, and calming.

**Why this priority**: Fixes a known aesthetic issue (ugly white background) and drastically improves the visual quality and premium feel of the app, aligning with the "Impeccable Design" rule.

**Independent Test**: Can be independently verified by checking the app background on a large desktop monitor and a mobile device to ensure the Aurora effect is visible, animated slowly, and colored according to the neonatal guide's palette.

**Acceptance Scenarios**:

1. **Given** the application is loaded on a desktop screen, **When** the user views the background outside the main reader viewport, **Then** a smooth, animated Aurora Blur effect is visible, using the guide's teal/mint colors (`var(--color-brand-primary)` and related).
2. **Given** the user is on a mobile device, **When** they view the application, **Then** the Aurora background is rendered performantly and unobtrusively without affecting readability.

### Edge Cases

- What happens to the progress bar animation if the user drags the scrubber quickly back and forth? (It should either disable transition during drag or remain responsive without lag).
- How does the Aurora Background affect performance on low-end mobile devices? (Should be CSS-based or optimized).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST apply a CSS transition to the progress bar fill element (`.scrubber-fill`) when the current page changes.
- **FR-002**: The system MUST include a valid `favicon.svg` in the public directory and reference it in `index.html`.
- **FR-003**: The system MUST replace the current static background with an animated "Aurora Blur" effect.
- **FR-004**: The Aurora Blur effect MUST use colors derived from the existing project palette (e.g., teal, mint, warm amber) and NOT default bright neon colors.
- **FR-005**: The Aurora Blur effect MUST be implemented purely in CSS/JS without relying on an external Node.js backend or server-side rendering, complying with the static build requirement.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Progress bar updates visually transition smoothly in ~300ms without layout thrashing.
- **SC-002**: Favicon loads successfully without 404 errors in browser network tools.
- **SC-003**: The background renders the Aurora effect maintaining 60fps on standard devices without introducing significant CPU overhead.
- **SC-004**: The overall aesthetic is perceived as calming and premium, adhering to the "Impeccable" visual guidelines.

## Assumptions

- The Aurora Blur effect can be achieved using a custom React component or CSS keyframes within the current stack.
- An appropriate SVG icon can be generated for the favicon that fits the theme (e.g., a simple neonatal or heart/book icon).
- Performance impacts of CSS blurred gradients are acceptable for the target devices.
