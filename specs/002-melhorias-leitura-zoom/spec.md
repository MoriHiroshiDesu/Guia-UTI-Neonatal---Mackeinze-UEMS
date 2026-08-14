# Feature Specification: Melhorias de Resolução, Layout Mobile, Persistência e Zoom Interativo

**Feature Branch**: `002-melhorias-leitura-zoom`

**Created**: 2026-08-14

**Status**: Draft

**Input**: User description: "Correção de qualidade visual e experiência móvel: imagens nítidas em alta resolução, persistência da página ao recarregar, layout mobile esticado ao máximo com margem de 8px, e gesto de pinça (pinch-to-zoom) para aproximação de detalhes e textos."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Leitura Nítida em Alta Resolução (Retina / High-DPI) (Priority: P1)

Como mãe ou familiar lendo as instruções médicas e cuidados com o bebê no smartphone, quero que os textos e ilustrações das páginas apareçam completamente nítidos e legíveis em telas de alta densidade (Retina/OLED/Full HD), para que a leitura seja clara e sem esforço visual.

**Why this priority**: Imagens borradas impedem a leitura adequada das orientações do guia, comprometendo o objetivo principal do projeto.

**Independent Test**: Pode ser testado abrindo a página 1 e 2 em um smartphone real e inspecionando os textos pequenos (ex: legendas, termos técnicos), conferindo se estão cristalinos.

**Acceptance Scenarios**:
1. **Given** um dispositivo móvel com `devicePixelRatio >= 2`, **When** o guia é carregado, **Then** as páginas são renderizadas na sua resolução nativa máxima sem perda de nitidez ou pixelização.
2. **Given** a renderização de qualquer uma das 33 páginas, **When** visualizada na tela, **Then** as bordas de texto e linhas de ilustração mantêm nitidez perfeita.

---

### User Story 2 - Layout Mobile Expandido com Margem de 8px (Priority: P1)

Como usuário lendo em tela de celular (360px a 430px de largura), quero que o folheto utilize o máximo possível da largura e altura disponíveis da tela, mantendo apenas um respiro sutil de 8px nas bordas, para que o conteúdo tenha o maior tamanho visual possível.

**Why this priority**: Telas de celular têm espaço reduzido; eliminar margens excessivas aumenta diretamente o tamanho da imagem e a legibilidade.

**Independent Test**: Pode ser testado medindo o espaçamento entre a borda do folheto e o limite da tela do celular, confirmando exatamente 8px de respiro lateral.

**Acceptance Scenarios**:
1. **Given** um smartphone em modo retrato, **When** o leitor é exibido, **Then** o folheto ocupa a largura quase total com exatamente 8px de margem lateral em relação à borda do viewport.
2. **Given** o espaço vertical entre o cabeçalho e os controles, **When** o componente calcula as dimensões, **Then** a folha preserva a proporção geométrica original (874x1241) maximizando a altura sem transbordar a tela.

---

### User Story 3 - Persistência do Ponto de Leitura ao Recarregar (Priority: P2)

Como familiar que fecha o navegador ou recarrega a página enquanto cuida do bebê, quero que o guia reabra exatamente na página onde parei a leitura, para que eu não precise folhear tudo desde o início.

**Why this priority**: Evita perda de contexto e frustração no uso contínuo hospitalar.

**Independent Test**: Pode ser testado navegando até a página 15, recarregando a aba (F5 / pull-to-refresh) e verificando se o leitor inicia diretamente na página 15.

**Acceptance Scenarios**:
1. **Given** que o usuário folheou até a página N (ex: página 12), **When** a página é alterada, **Then** o índice N é salvo no `localStorage` e refletido na URL (hash `#page-12`).
2. **Given** que o usuário recarrega a página ou acessa um link direto com `#page-N`, **When** a aplicação inicializa, **Then** o leitor abre imediatamente na página N.

---

### User Story 4 - Gesto de Pinça e Zoom Interativo (Pinch-to-Zoom & Pan) (Priority: P1)

Como mãe ou familiar que precisa ler uma informação detalhada, tabela ou texto menor em uma página, quero poder fazer o gesto de pinça com dois dedos (ou duplo toque) para ampliar a página em até 3x e mover (pan) a área ampliada, para que eu consiga ler qualquer trecho com total conforto.

**Why this priority**: É essencial para garantir acessibilidade visual em celulares menores e idosos ou pessoas com dificuldades de visão.

**Independent Test**: Pode ser testado realizando o gesto de pinça com dois dedos na tela do celular e verificando a ampliação contínua da imagem da página atual, com possibilidade de arrastar enquanto ampliado.

**Acceptance Scenarios**:
1. **Given** qualquer página aberta, **When** o usuário faz o gesto de pinça (pinch) ou duplo toque na página, **Then** a imagem da página atual entra em modo de ampliação fluida (1x até 3.5x).
2. **Given** que a página está ampliada (> 1x), **When** o usuário arrasta com um dedo, **Then** a visualização se move livremente (pan) pela imagem sem acionar acidentalmente a virada de página (folheação).
3. **Given** que o usuário diminui o zoom de volta para 1x (ou dá duplo toque), **When** o nível 1x é atingido, **Then** os gestos normais de folheação do livro são reativados instantaneamente.
4. **Given** a barra de controles ou cabeçalho, **When** o usuário prefere botões acessíveis, **Then** há controles de zoom (+ / - / reset) disponíveis para acionamento por clique/toque único.

---

## Edge Cases

- **Telas ultralargas / Desktop**: Quando aberto no computador, o layout deve centralizar o guia elegantemente sem esticar desproporcionalmente.
- **Transição de Zoom para Virada**: Se o usuário estiver no meio de um zoom e tentar avançar de página pelos botões inferiores, o zoom deve ser redefinido suavemente para 1x antes da transição.
- **Página inválida no hash/localStorage**: Se o valor salvo for menor que 1 ou maior que 33, a aplicação deve aplicar fallback gracioso para a página 1.
