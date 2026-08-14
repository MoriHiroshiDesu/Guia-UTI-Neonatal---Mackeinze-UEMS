# Feature Specification: Download do Guia em PDF

**Feature Branch**: `006-download-pdf-guia`

**Created**: 2026-08-14

**Status**: Draft

**Input**: User description: "Adicione um botão a UI para pode baixar o guia em formato de PDF (salvo em docs/pdf/guia-uti.pdf), ao clicar deverá inciar o download"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Botão de Download do PDF no Cabeçalho (Priority: P1)

Como mãe, pai ou familiar acompanhando um bebê na UTI Neonatal, quero poder baixar o Guia completo em formato PDF diretamente da aplicação, para que eu possa guardá-lo no celular, lê-lo offline ou imprimi-lo quando necessário.

**Why this priority**: Permite acesso offline e compartilhamento do guia completo para as famílias em momentos de fragilidade e sem internet confiável no hospital.

**Independent Test**: Pode ser testado clicando no botão "Baixar PDF" na barra superior (Header), verificando o disparo imediato do download do arquivo `guia-uti.pdf`.

**Acceptance Scenarios**:

1. **Given** que o usuário está no leitor do guia (desktop ou mobile), **When** ele clica no botão de download (ícone de download com texto/tooltip acessível), **Then** o navegador inicia o download direto do arquivo PDF com o nome `guia-uti.pdf`.
2. **Given** que o usuário está em uma tela pequena de smartphone (ex: 360px a 430px), **When** o cabeçalho é renderizado, **Then** o botão de download se ajusta harmoniosamente ao lado das ferramentas de zoom sem quebrar o layout nem comprimir o título.

### Edge Cases

- O arquivo PDF tem ~42MB: a tag de link deve utilizar o atributo `download="guia-uti.pdf"` e caminho relativo seguro compatível com GitHub Pages (`base: './'`).
- Acessibilidade: o botão deve conter atributos `aria-label`, `title`, e suporte a navegação por teclado (`focus-visible`).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE incluir um botão ou link de ação para baixar o PDF completo do guia.
- **FR-002**: O botão DEVE estar localizado no cabeçalho (`Header`), harmonizado esteticamente com a barra de ferramentas de zoom e identidade visual.
- **FR-003**: Ao clicar no botão, o navegador DEVE disparar o download nativo do arquivo `docs/pdf/guia-uti.pdf`.
- **FR-004**: O recurso DEVE ser empacotado corretamente pelo Vite para deploy estático no GitHub Pages.
- **FR-005**: O botão DEVE ter feedback visual ao toque/hover (escala, cor de fundo, foco acessível).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O clique no botão dispara o download do arquivo PDF em menos de 1 segundo em conexões locais.
- **SC-002**: 100% de conformidade com os breakpoints mobile (360px a 430px) sem overflow horizontal.
- **SC-003**: O build de produção estático (`npm run build`) inclui o PDF sem erros de resolução de asset.

## Assumptions

- O arquivo PDF fonte reside em `docs/pdf/guia-uti.pdf`.
- O download nativo via atributo `download` e importação de asset do Vite é a abordagem mais robusta e independente de backend.
