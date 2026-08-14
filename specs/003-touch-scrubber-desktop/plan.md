# Implementation Plan: Isolamento de Pinch, Scrubber de Progresso e Modo Desktop (2 Páginas)

**Branch**: `003-touch-scrubber-desktop` | **Date**: 2026-08-14 | **Status**: Planned

## Architectural Overview

```
┌────────────────────────────────────────────────────────────────────────┐
│                              App.jsx                                   │
│  - Orquestra navegação por Scrubber (`goToPage`) e Controles           │
│  - Gerencia estado de Zoom e isolamento de toques                      │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
         ┌─────────────────────────┴─────────────────────────┐
         ▼                                                   ▼
┌──────────────────────────────────┐        ┌──────────────────────────────────┐
│          Controls.jsx            │        │           FlipBook.jsx           │
│ - Scrubber interativo (Range UI) │        │ - Modo 2 Páginas (Landscape) no  │
│ - Tooltip de visualização rápida │        │   Desktop (width >= 768px)       │
│ - Salto direto para a página     │        │ - Modo 1 Página no Mobile        │
└──────────────────────────────────┘        │ - Isolamento de Pinch/Touch      │
                                            └──────────────────────────────────┘
```

---

## Technical Strategy

### 1. Isolamento Absoluto de Gestos (Pinch vs Swipe)
- No `ZoomViewer.jsx` e `FlipBook.jsx`, interceptamos eventos `touchstart` com 2 dedos (`e.touches.length >= 2`).
- Durante o gesto de pinça, aplicamos trava temporária (`pointer-events: none` ou cancelamento de propagação) no elemento de folheação do `page-flip`.
- Adicionamos um cooldown de 150ms ao soltar os dedos para que o término da pinça não dispare um falso evento de swipe de página.

### 2. Scrubber de Progresso Interativo (Slider de Navegação Rápida)
- No `Controls.jsx`, substituímos a barra passiva por um componente interativo de arrasto com `<input type="range">` customizado e acessível.
- Enquanto o usuário arrasta, exibimos uma bolha/tooltip flutuante com a página selecionada (`Página X de 33`).
- Ao soltar o toque/clique (`onPointerUp` / `onChange`), acionamos `flipBookRef.current.goToPage(page)`.

### 3. Layout Desktop Expandido com Livro Aberto (2 Páginas Lado a Lado)
- No `src/styles/index.css`, ajustamos o breakpoint para desktop (`@media (min-width: 768px)`):
  - `.app-container`: `max-width: 1100px;` (em vez de 580px fixo).
- No `FlipBook.jsx`:
  - Calculamos as proporções ideais:
    - **Desktop (>= 768px)**: Proporção de livro aberto duplo `(2 * 874) / 1241 = ~1.4085`. O `PageFlip` renderiza duas páginas simultâneas lado a lado (ex: Páginas 2 e 3 abertas juntas). A capa (`Página 1`) é exibida isolada na direita.
    - **Mobile (< 768px)**: Proporção de folha única `874 / 1241 = ~0.70427`, maximizando a tela com 8px de respiro lateral.

---

## Files to Create / Modify

| File | Action | Purpose |
|---|---|---|
| `specs/003-touch-scrubber-desktop/` | Create | Documentação de SDD da feature |
| `src/components/Controls.jsx` | Modify | Implementar Scrubber interativo com tooltip e suporte a toque/arrasto |
| `src/styles/controls.css` | Modify | Estilização do slider/scrubber, thumb e tooltip flutuante |
| `src/components/ZoomViewer.jsx` | Modify | Bloqueio rigoroso de eventos de swipe durante pinch com 2 dedos |
| `src/components/FlipBook.jsx` | Modify | Suporte a 2 páginas lado a lado (spread) no desktop e trava de pinch |
| `src/styles/index.css` | Modify | Breakpoint responsivo para expandir largura máxima no desktop |
| `src/App.jsx` | Modify | Conectar salto de página do scrubber com o FlipBook |
