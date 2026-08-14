# Tasks: Isolamento de Pinch, Scrubber de Progresso e Modo Desktop (2 Páginas)

**Feature**: `003-touch-scrubber-desktop`
**Status**: Completed

## Tasks Breakdown

- [x] **Task 1: Isolar Rigorosamente o Gesto de Pinça (Pinch) do Swipe de Folheação** (Priority: P1)
  - Em `src/components/ZoomViewer.jsx`, interceptar e suprimir propagação de eventos multi-touch (`touches >= 2`).
  - Em `src/components/FlipBook.jsx`, desativar ponteiros durante gesto de pinça e aplicar cooldown de liberação de toque.

- [x] **Task 2: Implementar Scrubber / Slider Interativo na Barra de Progresso** (Priority: P1)
  - Em `src/components/Controls.jsx`, substituir barra estática por slider acessível com arrasto suave.
  - Adicionar tooltip flutuante com indicador de página em tempo real.
  - Conectar salto direto de página via `goToPage` no `src/App.jsx`.
  - Estilizar slider em `src/styles/controls.css`.

- [x] **Task 3: Implementar Visualização Expandida com Livro Aberto (2 Páginas) no Desktop** (Priority: P1)
  - Atualizar `src/styles/index.css` para permitir `max-width: 1100px` em telas `>= 768px`.
  - Ajustar `src/components/FlipBook.jsx` para calcular proporção dupla no desktop e folheação de livro aberto (spread de 2 páginas).
  - Preservar modo retrato de página única no mobile (`< 768px`).

- [x] **Task 4: Validação no Navegador (Mobile & Desktop via Playwright)** (Priority: P1)
  - Testar abertura em tela desktop (1280x800) e verificar renderização das páginas duplas.
  - Testar arrasto no scrubber para navegar entre páginas.
  - Testar emulação touch no mobile.
