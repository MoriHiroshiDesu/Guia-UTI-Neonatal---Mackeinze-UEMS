# Implementation Plan: Melhorias de Resolução, Layout Mobile, Persistência e Zoom Interativo

**Branch**: `002-melhorias-leitura-zoom` | **Date**: 2026-08-14 | **Status**: Planned

## Architectural Overview

Este plano endereça os quatro pontos de melhoria de usabilidade e qualidade visual relatados no teste mobile do Guia UTI Neonatal:

```
┌─────────────────────────────────────────────────────────────┐
│                       App.jsx                               │
│  - Leitura/Persistência de Estado (localStorage + URL Hash) │
│  - Gerenciamento de Nível de Zoom Global & Reset ao virar   │
└──────────────────────────┬──────────────────────────────────┘
                           │
        ┌──────────────────┴──────────────────┐
        ▼                                     ▼
┌───────────────────────────────┐   ┌───────────────────────────────┐
│     ZoomOverlay / Container   │   │        FlipBook.jsx           │
│ - Detecção de Pinch (2 dedos) │   │ - Renderização Nítida (HTML)  │
│ - Pan com 1 dedo quando > 1x  │   │ - Auto-ajuste de Proporção    │
│ - Duplo toque para Zoom       │   │   (874x1241) com margem 8px   │
│ - Botões acessíveis (+ / -)   │   │ - startPage persistido        │
└───────────────────────────────┘   └───────────────────────────────┘
```

---

## Technical Design & Strategy

### 1. Nitidez de Imagem (High-DPI / Crisp Subpixel Rendering)
- Utilizaremos a abordagem HTML do `page-flip` montada dentro de um elemento unmanaged (`mountEl`), onde cada folha contém uma tag `<img>` nativa em alta resolução.
- As imagens nativas de 874x1241px utilizam a aceleração gráfica do navegador (GPU), eliminando a perda de resolução gerada por canvas de baixa densidade.
- Aplicaremos `image-rendering: -webkit-optimize-contrast;` e dimensionamento vetorial responsivo.

### 2. Layout Mobile Maximizado com Margem de 8px
- No CSS (`src/styles/index.css`), atualizaremos `.app-container` com `padding: 0 8px;` e `max-width: 600px;`.
- No `FlipBook.jsx`, o cálculo de largura e altura utilizará a proporção exata das imagens do guia (`874 / 1241 = ~0.70427`):
  - `const targetRatio = 874 / 1241;`
  - Se a altura do container for o limite: `width = height * targetRatio`.
  - Se a largura for o limite: `width = containerWidth`, `height = width / targetRatio`.
- Isso garante que o folheto utilize 100% da área útil visual, deixando apenas o respiro de 8px nas bordas.

### 3. Persistência de Ponto de Leitura
- Criaremos funções em `src/services/storageService.js`:
  - `getSavedPage(totalPages)`: recupera do hash (`#page-X`) ou `localStorage` (`guia_last_page`).
  - `saveCurrentPage(pageNumber)`: armazena em `localStorage` e atualiza a URL sem recarregar o histórico (`history.replaceState`).
- `FlipBook` inicializará diretamente em `startPage: initialPage - 1`.

### 4. Gesto de Pinça e Zoom Interativo (Pinch-to-Zoom & Pan)
- Desenvolveremos o hook/componente `usePinchZoom` ou container com gestos táteis:
  - Rastreia toques multitouch (`e.touches.length === 2`).
  - Calcula a distância euclidiana inicial e atual para atualizar a escala (`scale` entre 1x e 3.5x).
  - Quando `scale > 1.05`, toques individuais aplicam translação (`translateX`, `translateY`) com limites de borda.
  - Duplo toque aplica zoom de 2.2x no ponto do clique ou reseta para 1x.
  - Quando ampliado, eventos do `page-flip` são temporariamente pausados (`pointer-events` ou trava de flip).
  - Adicionaremos botões de controle de zoom no cabeçalho/barra para acessibilidade motora.

---

## Files to Create / Modify

| File | Action | Purpose |
|---|---|---|
| `src/services/storageService.js` | Create | Gerenciamento de persistência de página (localStorage + Hash) |
| `src/styles/index.css` | Modify | Ajustar paddings para 8px e maximizar viewport |
| `src/styles/flipbook.css` | Modify | Estilização nítida, contain de proporção e suporte a zoom |
| `src/styles/controls.css` | Modify | Adicionar botões e feedback visual de zoom |
| `src/components/FlipBook.jsx` | Modify | Integração de renderização nítida e inicialização com `startPage` |
| `src/components/ZoomViewer.jsx` | Create | Container tátil com suporte a pinch-to-zoom, duplo toque e pan |
| `src/components/Header.jsx` | Modify | Adicionar botões de ação rápida de zoom (+, -, reset) |
| `src/App.jsx` | Modify | Orquestração de estado de página salva e zoom |
