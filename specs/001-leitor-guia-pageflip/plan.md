# Implementation Plan: Leitor Interativo do Guia UTI Neonatal (Page Flip)

**Branch**: `001-leitor-guia-pageflip` | **Date**: 2026-08-13 | **Spec**: [spec.md](file:///home/hiroshi/projetos-pessoais/folheto-carol-melhorado/specs/001-leitor-guia-pageflip/spec.md)

**Input**: Feature specification from `specs/001-leitor-guia-pageflip/spec.md`

## Summary

Implementar a aplicação web mobile-first do **Guia UTI Neonatal - Mackenzie UEMS** para leitura interativa em smartphones por mães e familiares de recém-nascidos. A aplicação utiliza o efeito físico realista de virada de página (*Page Flip*) via biblioteca open-source gratuita `page-flip` / `stpageflip` com wrapper React, com carregamento dinâmico e auto-ajustável das 33 páginas WebP em `docs/paginas/` e exportação 100% estática para o GitHub Pages.

## Technical Context

**Language/Version**: JavaScript / TypeScript / Node.js 18+  
**Primary Dependencies**: React 18, Vite, `page-flip` (ou `react-pageflip` / StPageFlip open-source MIT), Lucide Icons (ícones acessíveis)  
**Storage**: N/A (aplicação estática client-side sem persistência em servidor)  
**Testing**: Build verification (`npm run build`), validação de contratos e roteiro de aceitação manual em `quickstart.md`  
**Target Platform**: Navegadores Web Mobile (iOS Safari, Android Chrome) e Desktop  
**Project Type**: Single Page Application (SPA) Estática / Web Reader  
**Performance Goals**: Carregamento da capa < 2s em 3G/4G, animação Page Flip a 60fps (< 100ms resposta tátil)  
**Constraints**: Zero backend, 100% compatível com GitHub Pages (`base: './'`), dependências estritamente gratuitas (MIT/Apache), layout mobile-first  
**Scale/Scope**: 33 páginas WebP com suporte a adição/remoção automática no catálogo  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Princípio Constitucional | Conformidade | Detalhes da Validação |
| :--- | :---: | :--- |
| **I. Acolhimento e Linguagem Acessível** | ✅ PASS | Interface limpa, acolhedora, sem termos médicos complexos ou botões técnicos confusos. |
| **II. Mobile-First e Experiência Tátil** | ✅ PASS | Componente centralizado com proporções adaptadas para smartphones e gestos táteis nativos. |
| **III. Page Flip Gratuito** | ✅ PASS | Utiliza `page-flip` / `stpageflip` com licença MIT comprovada (100% gratuita). |
| **IV. Arquitetura Estática (GitHub Pages)** | ✅ PASS | Vite configurado para saída estática pura em `dist/` sem rotas server-side. |
| **V. Modularidade e Auto-Ajuste de Páginas** | ✅ PASS | Provedor de páginas via carregamento dinâmico das imagens de `docs/paginas/`. |

## Project Structure

### Documentation (this feature)

```text
specs/001-leitor-guia-pageflip/
├── plan.md              # Este plano de implementação
├── research.md          # Pesquisa técnica e decisões de dependências
├── data-model.md        # Entidades e modelo de dados do leitor
├── contracts/           # Contratos de interface e eventos (ui-contracts.md)
├── quickstart.md        # Guia de execução e roteiro de testes
└── checklists/          # Checklist de qualidade (requirements.md)
```

### Source Code (repository root layout)

```text
folheto-carol-melhorado/
├── docs/
│   └── paginas/                  # 33 páginas originais em WebP (pagina-01.webp ... pagina-33.webp)
├── src/
│   ├── assets/                   # Assets e ícones estáticos
│   ├── components/
│   │   ├── FlipBook.jsx          # Componente central de virada de página (Page Flip)
│   │   ├── Controls.jsx          # Barra inferior de controles acessíveis e paginação
│   │   └── Header.jsx            # Cabeçalho sutil de acolhimento e título
│   ├── services/
│   │   └── pageService.js        # Carregador e pré-carregador automático das páginas WebP
│   ├── styles/
│   │   └── index.css             # Estilos mobile-first e animações de transição
│   ├── App.jsx                   # Componente raiz do leitor
│   └── main.jsx                  # Ponto de entrada React
├── index.html                    # Ponto de entrada HTML estático
├── vite.config.js                # Configuração do Vite com base relativa para GitHub Pages
└── package.json                  # Manifesto do projeto e scripts de build
```

**Structure Decision**: Estrutura de SPA moderna em Vite/React com carregador de páginas desacoplado em `src/services/pageService.js`, permitindo deploy direto no GitHub Pages e isolamento total entre os componentes visuais e as imagens do folheto.

## Complexity Tracking

Nenhuma violação aos princípios constitucionais. Arquitetura minimalista sem dependências redundantes.
