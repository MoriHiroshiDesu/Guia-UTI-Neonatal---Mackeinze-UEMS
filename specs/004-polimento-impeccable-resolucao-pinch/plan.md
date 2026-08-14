# Implementation Plan: Polimento Visual Impeccable, Anti-Aliasing de Alta Resolução e Bloqueio de Conflito de Pinch

**Branch**: `004-polimento-impeccable-resolucao-pinch` | **Date**: 2026-08-14 | **Status**: Planned

## Technical Design & Strategy

### 1. Bloqueio de Conflito de Pinch via Captura de Eventos DOM
- No `FlipBook.jsx`, instalaremos listeners em **fase de captura** (`{ capture: true }`) no container do folheto:
  - Ao registrar `e.touches.length >= 2` em qualquer momento, ativamos `pinchShieldActive = true`.
  - Enquanto `pinchShieldActive` estiver ativo, qualquer evento `touchstart`, `touchmove` ou `touchend` chamará `e.stopPropagation()` e `e.stopImmediatePropagation()`.
  - Quando a contagem de toques cair para zero (`e.touches.length === 0`), ativamos um temporizador de cooldown de **350ms** antes de desativar `pinchShieldActive`. Isso impede categoricamente que a soltura assíncrona dos dedos gere um falso evento de swipe de página.

### 2. Design System Impeccable: Atmosfera Acolhedora Neonatal
- Substituiremos o fundo `#ffffff` e plano de fundo cru por uma composição acolhedora inspirada no cuidado neonatal:
  - **Paleta**:
    - Fundo base: Gradiente sutil radial/linear com tons serenos de sage/teal suave (`#eaf3f2`, `#f4f8f7`, `#ebf1f0`) com vinheta suave que direciona o foco para o folheto.
    - Sombra do Livro: Elevação multicamadas `0 24px 48px -12px rgba(13, 79, 74, 0.16), 0 8px 18px -6px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(13, 148, 136, 0.05)`.
    - Controles e Header: Superfícies flutuantes com `backdrop-filter: blur(12px)` e bordas translúcidas elegantes.
    - Lombada do livro: Gradiente central delicado simulando o vinco físico de papel no modo 2 páginas.

### 3. Anti-Aliasing de Alta Resolução (Eliminação de Serrilhados)
- Remover `image-rendering: crisp-edges;` e substituir por:
  ```css
  image-rendering: auto;
  image-rendering: -webkit-optimize-contrast;
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  will-change: transform;
  ```
- Isso aciona a filtragem bilinear da GPU com suavização subpixel em todas as resoluções (desktop e mobile), eliminando bordas duras ou serrilhadas.

---

## Files to Create / Modify

| File | Action | Purpose |
|---|---|---|
| `specs/004-polimento-impeccable-resolucao-pinch/` | Create | Documentação de SDD da feature |
| `src/styles/index.css` | Modify | Nova atmosfera visual (gradiente sereno, paleta acolhedora e tokens) |
| `src/styles/flipbook.css` | Modify | Remoção de crisp-edges, anti-aliasing GPU e vinco de lombada |
| `src/styles/header.css` | Modify | Acabamento premium com glassmorphism sutil e foco na marca |
| `src/styles/controls.css` | Modify | Controles com glassmorphism e sombras elegantes |
| `src/components/FlipBook.jsx` | Modify | Captura de eventos para bloqueio de falso swipe pós-pinça |
| `src/components/ZoomViewer.jsx` | Modify | Refinamento de transições e supressão de eventos |
