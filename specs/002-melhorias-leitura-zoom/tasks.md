# Tasks: Melhorias de Resolução, Layout Mobile, Persistência e Zoom Interativo

**Feature**: `002-melhorias-leitura-zoom`
**Status**: Completed

## Tasks Breakdown

- [x] **Task 1: Implementar Serviço de Persistência de Leitura** (Priority: P1)
  - Criar `src/services/storageService.js` com métodos `getSavedPage()` e `saveCurrentPage()`.
  - Conectar com `localStorage` e hash da URL `#page-N` com fallback para 1.

- [x] **Task 2: Maximizar Layout Mobile com Respiro Lateral de 8px** (Priority: P1)
  - Atualizar `src/styles/index.css` para reduzir padding lateral de 12px para 8px.
  - Ajustar cálculo de proporção no leitor (`874 / 1241`) para preencher a tela verticalmente e horizontalmente.

- [x] **Task 3: Renderização Nítida e de Alta Densidade das Páginas (High-DPI)** (Priority: P1)
  - Refatorar montagem do `PageFlip` no `FlipBook.jsx` para usar páginas HTML isoladas com tags `<img>` nativas em alta resolução (874x1241) ou canvas com escala de alta densidade.
  - Assegurar nitidez máxima de texto e linhas em telas Retina/OLED.

- [x] **Task 4: Implementar Gesto de Pinça (Pinch-to-Zoom), Duplo Toque e Pan** (Priority: P1)
  - Criar componente ou camada `ZoomViewer` para gerenciar gestos táteis de 2 dedos (pinch), pan com 1 dedo e duplo toque.
  - Pausar folheação enquanto o zoom for maior que 1x para permitir navegação livre pelo conteúdo ampliado.
  - Adicionar botões de controle de zoom (+, -, reset) no cabeçalho para acessibilidade.

- [x] **Task 5: Integrar Estados no App.jsx e Testar no Navegador** (Priority: P1)
  - Conectar inicialização da página salva, reset de zoom na virada de página e botões de controle.
  - Validar no Playwright e no ambiente de teste com simulação mobile.
