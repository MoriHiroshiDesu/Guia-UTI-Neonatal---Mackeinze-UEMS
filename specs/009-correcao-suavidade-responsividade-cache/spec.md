# Feature Specification: Correção de Suavidade de Abertura, Responsividade Total e Controle de Cache

**Feature Branch**: `009-correcao-suavidade-responsividade-cache`

**Created**: 2026-08-14

**Status**: In Progress

**Input**: Solicitação do usuário:
1. Restaurar e aprimorar a suavidade de abertura e centralização do livro/capa (desktop) resolvida na spec 007, eliminando pulos bruscos ou desalinhamentos ao virar páginas por botões, scrubber ou arrasto.
2. Revisar e refinar a experiência totalmente responsiva para evitar que a arte das páginas seja cortada ("engolida no quadro") em diferentes resoluções e proporções de monitores/telas.
3. Garantir que não permaneça cache estático/HTML obsoleto a cada novo deploy no GitHub Actions.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Abertura e Fechamento Fluidos do Livro no Desktop (Priority: P1)

Como leitor em tela ampla (Desktop/Tablet horizontal), quero que a capa apareça centralizada na página 1 e que, ao avançar para as páginas internas (2-3), o livro se abra em página dupla com um movimento contínuo e sincronizado de 60fps, sem saltos bruscos ou posições incorretas após virar a folha por clique, arraste manual ou slider.

**Why this priority**: A transição suave e física do livro é a essência do produto e não pode apresentar regressões perceptuais.

**Independent Test**: Navegar da página 1 para a 2 e da 2 para a 1 via botão "Avançar/Voltar", arraste do mouse e slider, confirmando a sincronia perfeita do deslocamento horizontal com a folha virando.

**Acceptance Scenarios**:
1. **Given** Desktop na página 1 (capa), **When** a página carrega, **Then** a capa está centralizada na tela (`translateX(-25%)`).
2. **Given** página 1, **When** o usuário clica em "Próxima página" ou arrasta a folha, **Then** o livro translada suavemente para o centro (`translateX(0)`) exatamente durante a animação da folha.
3. **Given** página 2 (livro aberto), **When** o usuário retorna para a página 1, **Then** o livro translada de volta para `translateX(-25%)` em sincronia com o fechamento da capa.
4. **Given** um arraste manual que é cancelado pelo usuário no meio do caminho, **When** o estado retorna para repouso (`read`), **Then** a posição do container se restabelece instantaneamente na posição correta da página ativa.

---

### User Story 2 - Responsividade Perfeita e Eliminação de Cortes na Arte (Priority: P1)

Como usuário em qualquer tipo de tela (monitores Ultrawide, Full HD, notebooks 1366x768, tablets e celulares em retrato/paisagem), quero visualizar 100% da arte e tipografia de cada página sem nenhum corte ou compressão ("engolida no quadro").

**Why this priority**: Todo o conteúdo informativo e médico do guia deve ser totalmente visível e legível em qualquer dispositivo.

**Independent Test**: Redimensionar o navegador dinamicamente em diversas proporções (1920x1080, 1366x768, 1024x768, 844x390 e 390x844) e verificar se o container recalcula proporções perfeitas mantendo respiro e proporção exata de 874:1241.

**Acceptance Scenarios**:
1. **Given** qualquer resolução de tela, **When** a página é renderizada, **Then** a proporção de cada folha é calculada com base na razão exata da arte (`874 / 1241`), sem distorções nem cortes nas bordas.
2. **Given** um redimensionamento dinâmico de tela ou rotação de dispositivo, **When** o tamanho da janela se altera, **Then** o leitor se redimensiona automaticamente mantendo a página em foco sem quebras.
3. **Given** telas com proporções verticais ou horizontais extremas, **When** o livro é exibido, **Then** são respeitados limites máximos e mínimos confortáveis com respiros adequados.

---

### User Story 3 - Controle de Cache e Atualização Instantânea no Deploy (Priority: P1)

Como leitor acessando o link oficial no GitHub Pages após um deploy, quero carregar imediatamente a versão mais recente do aplicativo, sem que arquivos antigos fiquem retidos no cache do navegador.

**Why this priority**: Evita que usuários e avaliadores visualizem versões antigas ou com estilos quebrados após atualizações.

**Independent Test**: Inspecionar os cabeçalhos meta no `index.html` e o pipeline de build para atestar que `index.html` possui instruções anti-cache e que os assets gerados pelo Vite utilizam hashes únicos e imutáveis.

**Acceptance Scenarios**:
1. **Given** o arquivo `index.html`, **When** inspecionado, **Then** contém meta tags `Cache-Control: no-cache, no-store, must-revalidate`, `Pragma: no-cache` e `Expires: 0`.
2. **Given** o workflow `.github/workflows/deploy.yml`, **When** executado, **Then** o build é limpo previamente e os assets usam hashes automáticos de conteúdo do Vite.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: O componente `FlipBook.jsx` DEVE gerenciar os estados de transição (`flip`, `changeState`, `init`, `resize`) com sincronização precisa do `transform` e tratamento de cancelamento de dobra (`user_fold` cancelado -> repouso `read`).
- **FR-002**: O leitor DEVE utilizar um observador de redimensionamento (`ResizeObserver` / debounce resize) para recalcular dinamicamente as dimensões do livro garantindo a proporção exata de `874:1241` em qualquer tela.
- **FR-003**: O layout em `index.css` DEVE permitir maior amplitude em telas grandes (aumentando o `max-width` do container no desktop para `1400px` ou `min(94vw, 1400px)`) para evitar sub-dimensionamento em monitores modernos.
- **FR-004**: O arquivo `index.html` DEVE incluir meta tags explícitas de controle de cache para o arquivo raiz.
- **FR-005**: O arquivo `vite.config.js` e `.github/workflows/deploy.yml` DEVEM assegurar empacotamento limpo com nomes de chunk com hash de conteúdo.

## Success Criteria *(mandatory)*

- **SC-001**: Transição suave de capa e spread no desktop sem pulos ou desalinhamentos.
- **SC-002**: 0% de corte ou corte de arte em resoluções de 360px a 2560px.
- **SC-003**: Build limpo e meta tags anti-cache configuradas no `index.html`.
- **SC-004**: Testes automatizados com Playwright cobrindo Desktop, Notebook, Tablet e Mobile.
