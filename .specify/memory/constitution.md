<!--
Sync Impact Report:
- Version change: [TEMPLATE] -> 1.0.0
- List of modified principles:
  * PRINCIPLE_1: "I. Foco em Acolhimento e Linguagem Acessível (Mães e Familiares)"
  * PRINCIPLE_2: "II. Mobile-First e Experiência Tátil Fluida"
  * PRINCIPLE_3: "III. Navegação Estilo Folheto/Livro (Page Flip Gratuito)"
  * PRINCIPLE_4: "IV. Arquitetura Estática para GitHub Pages (Zero Backend)"
  * PRINCIPLE_5: "V. Modularidade e Auto-Ajuste no Gerenciamento de Páginas"
- Added sections:
  * "Restrições Técnicas e Diretrizes de Conteúdo"
  * "Fluxo de Desenvolvimento e Garantia de Qualidade"
- Removed sections: Nenhuma (substituídos placeholders do template)
- Follow-up TODOs: Nenhuma pendência
-->

# Guia UTI Neonatal - Mackenzie UEMS Constitution

## Core Principles

### I. Foco em Acolhimento e Linguagem Acessível (Mães e Familiares)
O projeto é destinado exclusivamente a mães, pais e familiares de recém-nascidos internados na UTI Neonatal, e NÃO a profissionais de saúde. Toda a interface, navegação e apresentação de conteúdo DEVEM priorizar acolhimento, clareza, empatia e facilidade de leitura para pessoas leigas, reduzindo o estresse e a sobrecarga cognitiva no ambiente hospitalar.

### II. Mobile-First e Experiência Tátil Fluida
O uso principal ocorre em smartphones durante a permanência no hospital. Toda a interface DEVE ser projetada primariamente para telas pequenas (360px a 430px) e adaptável a tablets/desktop. A navegação DEVE responder de forma suave e instantânea a toques, gestos de arrastar (*swipe/drag*) e toques rápidos.

### III. Navegação Estilo Folheto/Livro (Page Flip Gratuito)
A experiência de leitura DEVE simular a folheação natural de um livreto físico através de um componente de virada de página (*Page Flip*). O uso do componente (como o inspirado em `reactbits` / `page-flip` ou equivalente open-source) DEVE ser 100% gratuito e com licença aberta permissiva (ex: MIT, Apache-2.0). Nenhuma dependência comercial, proprietária ou paga é permitida.

### IV. Arquitetura Estática para GitHub Pages (Zero Backend)
A aplicação DEVE ser compilada em uma distribuição puramente estática (HTML, CSS e JavaScript client-side). Não é permitido o uso de servidores dinâmicos, rotas server-side ou bancos de dados em tempo de execução. O artefato final DEVE ser executável diretamente no GitHub Pages a partir de um ponto de entrada único (`index.html`) e assets associados.

### V. Modularidade e Auto-Ajuste no Gerenciamento de Páginas
O acervo de páginas do guia reside na pasta `docs/paginas/` em formato otimizado WebP (`pagina-01.webp` a `pagina-33.webp`). O sistema DEVE ser arquitetado de forma desacoplada para que futuras inclusões, exclusões ou reordenações de páginas exijam apenas a alteração dos arquivos ou de uma lista de configuração de páginas, refletindo automaticamente na paginação e no sumário sem necessidade de reescrever componentes do leitor.

## Restrições Técnicas e Diretrizes de Conteúdo

- **Otimização de Mídia**: Todas as páginas originais já estão em WebP em `docs/paginas/`. O leitor deve realizar pré-carregamento (*lazy-loading* / *pre-fetching*) inteligente das páginas adjacentes (anterior e próxima) para garantir viradas de página fluidas mesmo em redes móveis 4G/3G de hospitais.
- **Licenciamento Estrito**: Toda e qualquer biblioteca ou recurso adicionado ao projeto deve possuir licença livre/open-source comprovada.
- **Acessibilidade e Fallbacks**: Além do gesto de virar a página (flip), a interface DEVE prover controles acessíveis complementares (botões de anterior/próxima, indicador claro do número da página atual/total e navegação por teclado).

## Fluxo de Desenvolvimento e Garantia de Qualidade

- **Validação de Build**: Toda alteração de código DEVE ser validada através de um build estático local sem erros de empacotamento antes de ser submetida.
- **Conformidade com a Especificação (SDD)**: Nenhuma implementação de interface ou funcionalidade deve ser iniciada sem o ciclo prévio de especificação (`speckit-specify`), plano técnico (`speckit-plan`) e decomposição em tarefas (`speckit-tasks`).
- **Testes de Usabilidade Mobile**: Toda nova funcionalidade deve ser inspecionada visual e funcionalmente em emulação mobile e em múltiplos tamanhos de tela.

## Governance

A presente Constituição é o documento de maior hierarquia normativa do repositório *Guia UTI Neonatal - Mackenzie UEMS*. Todas as especificações técnicas, planos de arquitetura, tarefas e revisões de código DEVEM obedecer estritamente a estes princípios.

Emendas a este documento requerem justificativa documentada e incremento de versão semântica:
- **MAJOR (X.0.0)**: Alteração ou remoção de princípios fundamentais ou quebra de compatibilidade de arquitetura.
- **MINOR (1.X.0)**: Adição de novos princípios, regras de qualidade ou restrições técnicas.
- **PATCH (1.0.X)**: Correções de redação, formatação ou esclarecimentos textuais.

**Version**: 1.0.0 | **Ratified**: 2026-08-13 | **Last Amended**: 2026-08-13
