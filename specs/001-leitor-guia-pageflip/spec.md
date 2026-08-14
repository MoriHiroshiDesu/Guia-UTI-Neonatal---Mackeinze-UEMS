# Feature Specification: Leitor Interativo do Guia UTI Neonatal (Page Flip)

**Feature Branch**: `001-leitor-guia-pageflip`

**Created**: 2026-08-13

**Status**: Draft

**Input**: User description: "Criar o leitor web mobile-first do Guia UTI Neonatal para mães e familiares, com efeito de folheação (Page Flip), suporte estático para GitHub Pages, carregamento das 33 páginas WebP e modularidade para auto-ajuste de páginas."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Folheação Fluida do Guia no Smartphone (Priority: P1)

Como mãe ou familiar de um recém-nascido na UTI Neonatal acessando o guia pelo smartphone, quero poder folhear o guia digital como se fosse um folheto/livreto físico, para que a leitura seja acolhedora, intuitiva e fácil de acompanhar sem frustrações técnicas.

**Why this priority**: É o valor central da aplicação (MVP). Permite que o usuário visualize e leia as 33 páginas do guia com navegação tátil por virada de página.

**Independent Test**: Pode ser testado carregando a aplicação em um dispositivo móvel e realizando o gesto de virar a página (arrastar/deslizar com o dedo) da página 1 até a página 33.

**Acceptance Scenarios**:

1. **Given** que o usuário abriu o guia na primeira página (`pagina-01.webp`), **When** realiza o gesto de arrastar a página da direita para a esquerda, **Then** a página atual dobra/vira suavemente e revela a `pagina-02.webp`.
2. **Given** que o usuário está na página 2 ou posterior, **When** arrasta da esquerda para a direita, **Then** a página anterior vira de volta de forma contínua.
3. **Given** um toque rápido na extremidade da página, **When** o usuário clica/toca na borda lateral, **Then** a virada de página é acionada automaticamente para a direção correspondente.

---

### User Story 2 - Controles Acessíveis e Localização de Leitura (Priority: P2)

Como familiar lendo o guia em um momento delicado no hospital, quero saber exatamente em qual página estou e ter botões alternativos de navegação, para que eu possa folhear mesmo se não conseguir utilizar gestos táteis complexos.

**Why this priority**: Garante acessibilidade motora, conforto visual e senso de progresso durante a leitura do livreto.

**Independent Test**: Pode ser testado interagindo com os botões de navegação no rodapé/cabeçalho e verificando a atualização do contador de páginas.

**Acceptance Scenarios**:

1. **Given** que o leitor está aberto, **When** qualquer página é exibida, **Then** um indicador legível mostra a página atual e o total de páginas (ex: "Página 1 de 33").
2. **Given** que o usuário clica no botão "Avançar / Próxima", **When** o clique ocorre, **Then** a próxima página é apresentada com animação.
3. **Given** que o usuário está na primeira página (`pagina-01.webp`), **When** o botão "Anterior" é visualizado, **Then** ele se apresenta desabilitado ou inerte, impedindo viradas inválidas para trás.

---

### User Story 3 - Auto-Ajuste de Páginas e Entrega Estática Leve (Priority: P3)

Como mantenedor do projeto ou usuário em rede móvel hospitalar, quero que o catálogo de páginas seja montado de forma modular e entregue como aplicação estática rápida, para que alterações na ordem das imagens não quebrem o leitor e o carregamento seja imediato.

**Why this priority**: Assegura a sustentabilidade do código e a compatibilidade total com hospedagem no GitHub Pages sem custo ou complexidade de infraestrutura.

**Independent Test**: Pode ser testado executando o build estático e verificando se todas as imagens de `docs/paginas/` são indexadas corretamente e pré-carregadas sob demanda.

**Acceptance Scenarios**:

1. **Given** a pasta de páginas com arquivos nomeados sequencialmente, **When** a aplicação é construída, **Then** ela detecta e monta a lista completa de páginas sem necessidade de código duplicado por página.
2. **Given** que o usuário está na página N, **When** a página carrega, **Then** as imagens das páginas N-1 e N+1 são pré-carregadas em segundo plano para evitar telas em branco durante o flip.

---

### Edge Cases

- **Primeira e Última Página**: Ao tentar virar para a esquerda na primeira página ou para a direita na página 33, a aplicação deve bloquear a ação com resistência visual suave (*bounce*) sem travar o leitor.
- **Redimensionamento / Rotação de Tela**: Ao alternar entre modo retrato (*portrait*) e paisagem (*landscape*), a proporção do livreto deve se ajustar mantendo a imagem totalmente visível e sem cortes.
- **Conexão Lenta ou Instável**: Caso uma página WebP demore para carregar, um indicador de carregamento discreto deve ser exibido até a imagem renderizar.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE renderizar as páginas do guia em alta qualidade a partir dos arquivos WebP originais.
- **FR-002**: O sistema DEVE fornecer o efeito visual de virada de página (*Page Flip*) interativo com suporte a toque (*touch/swipe*) e mouse (*drag/click*).
- **FR-003**: O sistema DEVE exibir um contador de páginas em tempo real no formato "Página X de Y".
- **FR-004**: O sistema DEVE fornecer botões de navegação acessíveis ("Anterior" e "Próxima") como alternativa ao gesto de folheação.
- **FR-005**: O leitor DEVE ser projetado sob a filosofia *Mobile-First*, garantindo ajuste ideal em telas verticais de smartphones.
- **FR-006**: O sistema DEVE gerar uma distribuição 100% estática compatível com GitHub Pages (`index.html`, arquivos CSS e JS).
- **FR-007**: As dependências do componente de Page Flip DEVEM ser de código aberto e gratuitas para uso (licença livre).

### Key Entities

- **Página do Guia**: Representa uma folha individual do livreto com seu índice de ordenação (1 a 33), caminho do recurso de imagem WebP e metadados de exibição.
- **Estado do Leitor**: Representa a página ativa atual, o estado de animação (em transição ou parada), modo de exibição (página única em mobile) e status de carregamento.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O leitor carrega a capa inicial do guia em menos de 2 segundos em conexão 3G/4G típica.
- **SC-002**: A animação de virada de página responde em menos de 100ms após o gesto do usuário, rodando a 60fps sem engasgos perceptíveis.
- **SC-003**: 100% das 33 páginas do guia são acessíveis sequencialmente sem falhas de renderização.
- **SC-004**: O artefato de build pode ser hospedado diretamente no GitHub Pages sem requisições a servidores dinâmicos ou bancos de dados.

## Assumptions

- O público-alvo utilizará predominantemente navegadores modernos em smartphones (Chrome, Safari, Firefox, Edge mobile).
- As imagens originais em WebP já possuem resolução e proporções adequadas para leitura em telas móveis.
- Não há necessidade de autenticação, login ou armazenamento de dados sensíveis de usuários em nuvem.
