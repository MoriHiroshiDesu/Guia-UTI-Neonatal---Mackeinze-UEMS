# Feature Specification: Isolamento de Pinch, Scrubber de Progresso e Modo Desktop (2 Páginas)

**Feature Branch**: `003-touch-scrubber-desktop`

**Created**: 2026-08-14

**Status**: Planned

**Input**: User feedback:
1. Gesto de pinça se misturando ao swipe de página no mobile.
2. Barra de progresso interativa (slider/scrubber) para navegação rápida entre páginas.
3. Modo desktop com aproveitamento amplo do espaço útil da tela (abertura em 2 páginas / livro aberto).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Isolamento Perfeito entre Gesto de Pinça e Folheação (Priority: P1)

Como mãe ou familiar utilizando o smartphone com gestos táteis, quero que o gesto de pinça com 2 dedos apenas controle o zoom da página sem acionar acidentalmente a virada ou dobra de página (swipe), para que eu possa ampliar qualquer área sem perder a página atual.

**Why this priority**: Conflito de gestos cria frustração e desorientação durante a leitura de informações críticas.

**Independent Test**: Testar em celular ou emulador touch colocando 2 dedos na tela e afastando-os; a folha não deve dobrar nem virar, apenas ampliar.

**Acceptance Scenarios**:
1. **Given** qualquer página do guia exibida no celular, **When** o usuário toca com 2 dedos para iniciar a pinça, **Then** o evento de folheação (swipe) do `page-flip` é imediatamente bloqueado.
2. **Given** a página com zoom ativo (> 1.05x), **When** o usuário arrasta com 1 dedo, **Then** a ação realiza exclusivamente o pan da imagem sem dobrar o canto da folha.
3. **Given** que o usuário finaliza o zoom e retorna a 1x, **When** todos os dedos são retirados da tela, **Then** o swipe de folheação com 1 dedo é reativado normalmente.

---

### User Story 2 - Scrubber / Slider Interativo na Barra de Progresso (Priority: P1)

Como usuário lendo um guia de 33 páginas, quero poder arrastar a barra de progresso (scrubber) para avançar ou voltar rapidamente para qualquer página do guia, para que eu encontre facilmente uma seção específica sem precisar clicar dezenas de vezes no botão "Avançar".

**Why this priority**: Aumenta exponencialmente a navegabilidade e velocidade de busca por tópicos de interesse (ex: primeiros cuidados, amamentação, alta).

**Independent Test**: Clicar ou arrastar o dedo ao longo da barra de progresso inferior e conferir a atualização do indicador e o salto suave para a página selecionada.

**Acceptance Scenarios**:
1. **Given** a barra de controles na parte inferior, **When** o usuário clica ou arrasta o dedo na barra de progresso, **Then** um indicador visual flutuante (tooltip) exibe a página alvo em tempo real.
2. **Given** que o usuário solta o controle deslizante em uma página desejada (ex: Página 18), **When** o toque/arrasto termina, **Then** o leitor navega diretamente para a Página 18.
3. **Given** navegação via teclado, **When** o controle deslizante recebe foco, **Then** as setas do teclado permitem avançar/recuar página a página de forma acessível.

---

### User Story 3 - Visualização Desktop Expandida com Livro Aberto (2 Páginas) (Priority: P1)

Como familiar ou profissional de saúde acessando o guia em computadores, notebooks ou tablets em modo paisagem, quero que o leitor utilize a largura generosa da tela para exibir o guia como um **livro aberto (2 páginas lado a lado)**, aproveitando o espaço útil e proporcionando uma experiência imersiva de leitura.

**Why this priority**: Telas widescreen ficavam com grandes faixas vazias laterais; a visualização dupla aproveita o display e simula a leitura real de um folheto impresso.

**Independent Test**: Abrir a aplicação em viewport desktop (ex: 1280x800 ou 1920x1080) e verificar se a capa aparece como página única e as páginas internas abrem em pares (Páginas 2-3, 4-5, etc.) preenchendo a tela.

**Acceptance Scenarios**:
1. **Given** uma tela larga (`width >= 768px`), **When** o leitor é carregado, **Then** o container expande (até 1100px) e o `page-flip` opera em modo spread (2 páginas lado a lado).
2. **Given** a primeira página (Capa), **When** exibida em tela larga com `showCover: true`, **Then** a capa é centralizada ou alinhada à direita como a frente de um livro.
3. **Given** uma tela de smartphone (`width < 768px`), **When** visualizado em modo retrato, **Then** o leitor continua em modo página única (portrait) ocupando a tela com margem de 8px.

---

## Edge Cases

- **Redimensionamento dinâmico de janela**: Se o usuário alternar entre portrait e landscape ou redimensionar a janela do navegador, o `PageFlip` deve recalcular a orientação (`portrait` vs `landscape`) sem perder a página atual.
- **Arrasto rápido no scrubber**: O salto de página ao arrastar o slider deve ser suave para evitar travamentos ou recriações desnecessárias da árvore DOM.
