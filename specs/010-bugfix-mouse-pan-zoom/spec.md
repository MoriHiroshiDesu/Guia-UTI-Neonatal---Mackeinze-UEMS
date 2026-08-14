# Feature Specification: Bugfix de Pan com Mouse durante Zoom no Modo Web

**Feature Branch**: `010-bugfix-mouse-pan-zoom`

**Created**: 2026-08-14

**Status**: In Progress

**Input**: Solicitação do usuário: "No modo web, quando damos zoom, e tentamos navegar com o mouse (clicando e arrastando) pelo zoom, acaba chamando o evento de flip. Vamos arrumar isso. Mas tomando o máximo de cuidado para não quebrar o que já arrumamos"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Navegação por Arraste de Mouse (Pan) em Modo Zoom (Priority: P1)

Como leitor no Desktop (computador/notebook), quando aumento o zoom do guia para ler detalhes e clico e arrasto com o mouse sobre a página, quero mover livremente a visualização (pan) pela área ampliada sem que o livro dispare o evento de virar a folha (flip).

**Why this priority**: Evita trocas acidentais e frustrantes de página enquanto o usuário tenta inspecionar um texto ou ilustração ampliada.

**Independent Test**: Ampliar o zoom para 2x pelo cabeçalho ou atalho, clicar e arrastar com o mouse em várias direções no centro e nos cantos da página, e verificar que o pan se move suavemente sem disparar `flip` ou mudar de página.

**Acceptance Scenarios**:
1. **Given** zoom ampliado (`scale > 1.05`), **When** o usuário clica e arrasta o mouse sobre qualquer área da página, **Then** o conteúdo realiza pan (deslocamento) suave dentro dos limites visíveis e nenhum evento de folheação (`flip`) é acionado.
2. **Given** zoom ampliado (`scale > 1.05`), **When** o cursor do mouse passa sobre a área, **Then** exibe cursor de mão aberta (`grab`) e, durante o clique e arraste, cursor de mão fechada (`grabbing`).
3. **Given** zoom normal (`scale = 1`), **When** o usuário clica ou arrasta com o mouse nos cantos da página, **Then** a folheação física realista (*Page Flip*) continua funcionando perfeitamente.
4. **Given** o duplo clique com mouse, **When** acionado com zoom normal, **Then** amplia para 2.2x; se já estiver ampliado, redefine para 1x.
5. **Given** dispositivos móveis (touch), **When** utilizados, **Then** todos os gestos táteis (*pinch-to-zoom*, *double-tap*, arrasto com um dedo e swipe de página) permanecem 100% preservados.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: O componente `ZoomViewer.jsx` DEVE implementar manipuladores de eventos de mouse (`onMouseDownCapture`, `onMouseMoveCapture`, `onMouseUpCapture`, `onMouseLeave`) para gerenciar arrasto (pan) quando `scale > 1.05`.
- **FR-002**: O componente `ZoomViewer.jsx` e `FlipBook.jsx` DEVEM interceptar e bloquear a propagação de eventos de mouse (`mousedown`, `mousemove`, `mouseup`, `pointerdown`, etc.) para o motor do `PageFlip` sempre que `isZoomActive` for verdadeiro.
- **FR-003**: O componente `ZoomViewer.jsx` DEVE suportar duplo clique (`dblclick` / detecção de clique rápido de mouse) para alternar zoom (1x <-> 2.2x).
- **FR-004**: O estilo CSS em `zoom.css` DEVE definir classes de cursor apropriadas (`.zoom-active { cursor: grab; }`, `.zoom-dragging { cursor: grabbing; }`).
- **FR-005**: Ao redefinir o zoom (`resetZoom`), os manipuladores de folheação com mouse do `PageFlip` DEVEM responder normalmente.

## Success Criteria *(mandatory)*

- **SC-001**: Zero trocas de página indesejadas ao arrastar o mouse com zoom ativo.
- **SC-002**: Movimento de pan com mouse fluido a 60fps no desktop com zoom ativo.
- **SC-003**: 100% de preservação da experiência de folheação em zoom 1x e da experiência mobile.
- **SC-004**: Testes de automação e visuais validados via Playwright.
