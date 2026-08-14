# Feature Specification: Harmonia Visual com Roxo das Páginas e Intensificação da Aurora

**Feature Branch**: `008-harmonia-visual-aurora-roxo`

**Created**: 2026-08-14

**Status**: In Progress

**Input**: Solicitação do usuário: "Repare no anexo que a cor do button e de algumas fontes da UI segue o roxo das paginas. Além disso a aurora de fundo está mais intenso e numa cor mais proxima do roxo cor de rosa das paginas. Vamos trabalhar nessa melhoria agora. Abra o readWright para testar e garantir a entrega final"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Harmonia Cromática dos Controles e Tipografia com o Livro (Priority: P1)

Como leitor do Guia UTI Neonatal, quero que a interface de controle (botões de navegação, botão de download do PDF, barra de progresso scrubber, indicador numérico de páginas) utilize a paleta de tons roxos e lavanda presente nos títulos e cabeçalhos artísticos do próprio livro, para que a experiência visual seja coesa, acolhedora e imersiva.

**Why this priority**: A harmonia cromática direta entre o conteúdo do livro e os controles da aplicação eleva a qualidade perceptual de design e elimina o contraste deslocado com a paleta teal anterior.

**Independent Test**: Carregar a aplicação no desktop e no mobile, verificando se os botões de navegação, scrubber, botão de PDF e números de página estão nos tons de roxo/lavanda correspondentes à identidade visual das páginas.

**Acceptance Scenarios**:

1. **Given** a barra inferior de controles, **When** visualizada, **Then** os botões anterior/próximo possuem fundo lavanda suave (`#ede8fa` / `#e4daf7`) e ícones em roxo nobre (`#6b28a8`), o número da página atual está em roxo de destaque e a barra do scrubber possui preenchimento em gradiente roxo vibrante.
2. **Given** o botão de download de PDF e ferramentas de zoom no cabeçalho, **When** renderizados, **Then** utilizam a cor roxa primária para ícones e tipografia de ação.
3. **Given** interações com o scrubber e botões, **When** o usuário passa o mouse ou clica, **Then** os estados de hover e active respondem com sombras e tons de roxo enriquecidos.

---

### User Story 2 - Aurora de Fundo Mais Intensa e Rosa/Roxo Vibrante (Priority: P1)

Como usuário, quero que a Aurora atmosférica em segundo plano exiba cores mais vivas e envolventes de roxo, rosa, lilás e magenta, com maior intensidade e saturação, criando uma aura mágica e reconfortante ao redor do livro.

**Why this priority**: A atmosfera visual (aurora) é um dos pilares da identidade poética e acolhedora do leitor para os pais na UTI Neonatal.

**Independent Test**: Visualizar o fundo da página em tela cheia e checar se o gradiente e as camadas orbitais da Aurora brilham com tonalidades ricas de roxo e rosa, sem ofuscar a legibilidade do texto do livro.

**Acceptance Scenarios**:

1. **Given** a tela de leitura, **When** a aurora é renderizada em background, **Then** as camadas orbitais exibem gradientes de roxo profundo, rosa magenta luminoso, lilás floral e lavanda brilhante com saturação elevada (`saturate(145%)`) e opacidade equilibrada.
2. **Given** a transição contínua da aurora, **When** as camadas se movem em animação suave de 60fps, **Then** o contraste com as bordas do livro permanece nítido e elegante.

---

### User Story 3 - Validação Completa com Playwright (Priority: P1)

Como desenvolvedor e mantenedor, quero validar a entrega final capturando screenshots nos modos Desktop e Mobile com o Playwright, garantindo fidelidade visual com a referência fornecida.

**Why this priority**: Garante que a entrega esteja livre de falhas de layout, problemas de contraste ou regressões funcionais.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O arquivo `src/styles/index.css` DEVE definir variáveis de cores focadas na paleta roxo/lavanda (`--color-brand-primary: #6b28a8`, `--color-brand-light: #ede8fa`, `--color-bg: #eae5f2`, `--color-text-main: #21182c`, etc.).
- **FR-002**: O arquivo `src/styles/aurora.css` DEVE atualizar as 4 camadas de luz para tons de roxo, magenta/rosa, lilás e lavanda, aumentando a intensidade e saturação.
- **FR-003**: O arquivo `src/styles/controls.css` DEVE atualizar os botões, scrubber fill, thumb e número de página para usar as novas variáveis de cor roxa.
- **FR-004**: O arquivo `src/styles/header.css` DEVE alinhar o botão de download de PDF, logo e controles de zoom à nova paleta.
- **FR-005**: A aplicação DEVE manter 100% de responsividade mobile (360px a 430px) e modo desktop de duas páginas com transição de capa.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Cores dos botões e tipografia de destaque 100% harmonizadas com o tom roxo/rosa do livro exibido na referência.
- **SC-002**: Aurora de fundo vibrante e com maior riqueza cromática em roxo/rosa.
- **SC-003**: Build de produção executado sem erros (`npm run build`).
- **SC-004**: Testes visuais automatizados com screenshots via Playwright confirmando o visual no Desktop e Mobile.
