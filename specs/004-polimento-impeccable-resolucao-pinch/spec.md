# Feature Specification: Polimento Visual Impeccable, Anti-Aliasing de Alta Resolução e Bloqueio de Conflito de Pinch

**Feature Branch**: `004-polimento-impeccable-resolucao-pinch`

**Created**: 2026-08-14

**Status**: Planned

**Input**: User feedback:
1. Gesto de pinça no mobile ainda dispara swipe acidental no momento em que os dedos são soltos.
2. Fundo branco genérico substituído por uma atmosfera acolhedora e refinada segundo os princípios de design da skill Impeccable.
3. Eliminar o efeito de serrilhado/pixelização nas páginas (desktop e mobile), garantindo suavização GPU e alta definição cristalina.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Bloqueio Absoluto de Falso Swipe na Liberação da Pinça (Priority: P1)

Como mãe ou pai lendo o guia no celular, quero fazer o gesto de pinça e soltar os dedos naturalmente sem que a página vire acidentalmente, para que a leitura permaneça estável e no trecho desejado.

**Why this priority**: A liberação assíncrona dos dedos durante a pinça disparava o listener de swipe da biblioteca de folheação, causando viradas de página indesejadas.

**Independent Test**: Realizar pinça de aproximação em um celular real e soltar os dois dedos rapidamente em momentos ligeiramente diferentes; a página deve permanecer exatamente na mesma folha sem dobrar.

**Acceptance Scenarios**:
1. **Given** o leitor em modo mobile, **When** o usuário coloca 2 dedos na tela e solta, **Then** nenhum evento de folheação (swipe) é disparado pelo `page-flip`.
2. **Given** que o usuário finaliza a pinça, **When** um período de cooldown (350ms) transcorre, **Then** e somente então os gestos intencionais de 1 dedo voltam a operar a folheação.

---

### User Story 2 - Atmosfera Visual Impeccable Acolhedora e Serena (Priority: P1)

Como familiar em um momento sensível na UTI Neonatal, quero que o ambiente visual do leitor transmita calma, carinho e acolhimento através de cores suaves e iluminação ambiente harmoniosa, para que o uso do guia seja uma experiência agradável e reconfortante.

**Why this priority**: Fundos brancos crus causam cansaço visual e frieza hospitalar; uma paleta acolhedora eleva a qualidade do produto e o acolhimento aos pais.

**Independent Test**: Visualizar o aplicativo em monitores e telas mobile e validar harmonia de cores, gradiente suave de fundo, elevação realista do livro e botões flutuantes elegantes.

**Acceptance Scenarios**:
1. **Given** o carregamento da aplicação, **When** a interface é renderizada, **Then** o fundo exibe um gradiente sutil e acolhedor (tons calmantes de sálvia, névoa e porcelana quente).
2. **Given** o livro no centro, **When** visualizado, **Then** sua sombra de elevação é suave, realista e com profundidade tátil.
3. **Given** a barra superior e inferior, **When** renderizadas, **Then** utilizam acabamento elegante com microinterações e sombras refinadas.

---

### User Story 3 - Renderização Cristalina sem Serrilhado (GPU Anti-Aliasing) (Priority: P1)

Como leitor visualizando ilustrações e textos detalhados no computador ou celular, quero que as páginas sejam renderizadas com suavização subpixel de alta qualidade (anti-aliasing) sem bordas serrilhadas ou artefatos de interpolação, para que as letras e figuras sejam perfeitamente limpas.

**Why this priority**: `crisp-edges` forçava pixelização nas fontes e curvas; a interpolação bilinear e aceleração GPU proporcionam leitura nítida e suave.

**Independent Test**: Inspecionar em tela de alta resolução as curvas de texto e ilustrações nas páginas 1 a 10 no desktop e mobile, confirmando ausência de serrilhados.

**Acceptance Scenarios**:
1. **Given** a exibição de qualquer página em modo tela cheia ou desktop spread, **When** o navegador desenha as imagens, **Then** a filtragem bilinear com aceleração GPU produz contornos suaves e nítidos.
2. **Given** o zoom ampliado até 3.5x, **When** o usuário aproxima os textos, **Then** os detalhes permanecem nítidos e livres de artefatos de corte.
