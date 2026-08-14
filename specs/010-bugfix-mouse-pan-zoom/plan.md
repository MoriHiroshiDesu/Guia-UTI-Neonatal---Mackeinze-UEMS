# Implementation Plan: Bugfix de Pan com Mouse durante Zoom no Modo Web

**Feature**: Bugfix de Pan com Mouse durante Zoom no Modo Web
**Related Spec**: [spec.md](./spec.md)

## Architecture & Technical Approach

### 1. Manipulação de Eventos de Mouse no `ZoomViewer.jsx`
- Implementar estado e refs de rastreamento de mouse:
  - `mouseState = useRef({ isDragging: false, lastPos: { x: 0, y: 0 }, lastClickTime: 0 })`.
- Handlers de Mouse:
  - `handleMouseDown`: Quando `scale > 1.05`, chama `e.preventDefault()`, `e.stopPropagation()` (evitando propagação para PageFlip), marca `isDragging = true` e salva a posição atual `lastPos = { x: e.clientX, y: e.clientY }`.
  - `handleMouseMove`: Quando `isDragging` for verdadeiro e `scale > 1.05`, calcula o delta (`e.clientX - lastPos.x`, `e.clientY - lastPos.y`), atualiza a posição do zoom via `setPosition(prev => clampPosition(prev + delta, scale))` e bloqueia propagação.
  - `handleMouseUp` e `handleMouseLeave`: Finaliza o arraste (`isDragging = false`).
  - `handleDoubleClick`: Se `scale > 1.05`, chama `resetZoom()`; se `scale <= 1.05`, amplia para `2.2x` suavemente.

### 2. Blindagem de Eventos de Mouse no `FlipBook.jsx`
- Expandir o interceptador de eventos na fase de captura (`handleCaptureMouse` / `handleCaptureTouch`):
  - Quando `isZoomActive` for verdadeiro, adicionar listeners em fase de captura (`capture: true`) para:
    - `mousedown`, `mousemove`, `mouseup`, `click`, `pointerdown`, `pointermove`, `pointerup`.
  - Nesses eventos, se `isZoomActive`, invocar `e.stopPropagation()`.
  - Isso garante que o `PageFlip` interno não receba nenhum evento de ponteiro/mouse enquanto o usuário estiver navegando em modo zoom.

### 3. Ajustes de Estilo e Cursores (`src/styles/zoom.css`)
- Adicionar classes para cursores contextuais:
  - `.zoom-container.zoom-active` -> `cursor: grab;`
  - `.zoom-container.zoom-active.zoom-dragging` -> `cursor: grabbing; user-select: none;`
- Assegurar transição suave em 60fps sem interrupção de arraste.

## Impact Analysis
- `src/components/ZoomViewer.jsx`: Adição de suporte a pan com mouse e duplo clique.
- `src/components/FlipBook.jsx`: Blindagem de eventos de mouse/ponteiro durante `isZoomActive`.
- `src/styles/zoom.css`: Cursores de arrasto e estilos de container.

## Rollback Plan
Se houver qualquer interferência em toque ou folheação padrão, os listeners de mouse podem ser desativados sem impacto no restante da aplicação.
