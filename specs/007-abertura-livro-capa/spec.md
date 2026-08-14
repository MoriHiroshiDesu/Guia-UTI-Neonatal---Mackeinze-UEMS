# Feature Specification: Efeito de Livro Aberto e Centralização da Capa (Modo Desktop)

**Feature Branch**: `007-abertura-livro-capa`

**Created**: 2026-08-14

**Status**: Draft

**Input**: User description: "modo web, primeira pagina, não ter o quadro da esqueda em branco. criar um efeito de livro se abrindo ao ir para a pagina dois"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Capa Centralizada sem Quadro Branco Fantasma (Priority: P1)

Como leitor acessando o guia em computador ou tablet em modo horizontal (desktop / tela larga), quero visualizar a capa do guia centralizada e sem um quadro branco vazio à esquerda, simulando um livro físico fechado pousado na mesa.

**Why this priority**: Elimina um defeito visual evidente (quadro em branco à esquerda da capa) e traz o realismo tátil esperado da experiência de leitura física.

**Independent Test**: Carregar a aplicação no desktop na página 1 e verificar se apenas a capa está visível centralizada na tela, sem caixas brancas ao redor.

**Acceptance Scenarios**:

1. **Given** que o usuário está no modo desktop na página 1 (capa), **When** a página carrega, **Then** a capa é exibida no centro da tela e o fundo à esquerda é transparente (mostrando a Aurora de fundo).
2. **Given** que o usuário está na página 1 e navega para a página 2 (ou 2-3), **When** a folha vira, **Then** o livro realiza uma animação suave de abertura deslocando o centro do livro para o meio da tela, revelando as duas páginas abertas.
3. **Given** que o usuário está nas páginas internas e retorna para a página 1 (capa), **When** a folha fecha, **Then** o livro realiza a animação inversa, voltando a centralizar a capa fechada.
4. **Given** que o usuário chega à última página (contracapa), **When** o livro fecha na contracapa, **Then** a contracapa é centralizada na tela com a mesma suavidade.

---

### User Story 2 - Preservação da Experiência Mobile (Priority: P1)

Como usuário de smartphone (modo retrato), quero que o modo mobile de página única continue funcionando com folheação fluida, sem deslocamentos laterais indesejados.

**Why this priority**: Garante que a regra mobile-first do projeto não seja afetada pelo comportamento específico de abertura de 2 páginas do desktop.

**Independent Test**: Testar a navegação em viewport de 390px e certificar que a folheação de página única funciona perfeitamente sem deslocamento de `translateX`.

**Acceptance Scenarios**:

1. **Given** viewport mobile (< 700px), **When** o usuário navega entre a página 1 e página 2, **Then** o livro permanece fixo no centro e cada página ocupa a largura total da área útil.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O container `.flipbook-mount` NÃO DEVE ter fundo sólido branco ou borda fixa de 2 páginas quando a capa ou contracapa estiverem ativas.
- **FR-002**: No modo desktop (duas páginas), quando a página 1 (capa) estiver ativa, o livro DEVE aplicar um deslocamento horizontal (`translateX(-25%)`) para centralizar a capa na tela.
- **FR-003**: No modo desktop (duas páginas), quando páginas internas (>= 2 e < total) estiverem ativas, o livro DEVE retornar a `translateX(0)` com transição CSS suave (`~550ms`, sincronizada com o tempo de folheação).
- **FR-004**: No modo desktop, quando a última página (contracapa) estiver ativa, o livro DEVE aplicar `translateX(25%)` para centralizar a contracapa fechada.
- **FR-005**: Em visualização mobile (`isDesktop === false` ou largura < 700px), o deslocamento horizontal DEVE ser `translateX(0)`.
- **FR-006**: As sombras e relevos devem ser aplicados em cada folha individual para manter o efeito tridimensional real do papel.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Zero caixas/quadros brancos fantasmas visíveis ao redor da capa na página 1 no desktop.
- **SC-002**: Transição visual suave em 60fps na abertura do livro (página 1 -> página 2).
- **SC-003**: 100% de integridade da leitura mobile sem regressões no pinch-to-zoom ou swipe.

## Assumptions

- A biblioteca `page-flip` opera em modo 2 páginas quando `usePortrait: false` e 1 página quando `usePortrait: true`.
- O tempo de virada de página (`flippingTime`) padrão é de 550ms, ideal para coincidir com a curva de transição CSS do deslocamento.
