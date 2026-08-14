# Implementation Plan: Download do Guia em PDF

**Feature**: Download do Guia em PDF
**Related Spec**: [spec.md](./spec.md)

## Architecture & Technical Approach

### 1. Importação e Empacotamento do PDF no Vite
- Importar o arquivo PDF diretamente via `import pdfUrl from '/docs/pdf/guia-uti.pdf?url';` no `Header.jsx` ou em um helper.
- Isso garante que o Vite processe o asset e gere o link relativo correto (`./assets/guia-uti-[hash].pdf`) no build de produção, garantindo compatibilidade total com o GitHub Pages (`base: './'`).

### 2. UI e Design (Impeccable & Mobile First)
- No `Header.jsx`, adicionar o botão/link de download com o ícone `Download` da biblioteca `lucide-react`.
- Integrar a ação de download junto à toolbar de ações no topo (`.header-actions` ou na barra de ferramentas), mantendo espaçamento harmônico com os controles de zoom.
- Estilizar o botão `.btn-download-pdf` com:
  - Vidro translúcido / glassmorphism condizente com a paleta (`var(--color-surface-glass)` / `var(--color-brand-primary)`).
  - Hover e feedback tátil (`transform: scale(1.06)`, `active: scale(0.94)`).
  - Rótulo acessível `aria-label="Baixar Guia em formato PDF"`.
  - Tooltip nativo `title="Baixar Guia em PDF (42 MB)"`.
  - Em telas maiores (desktop >= 768px), exibir opcionalmente o texto "Baixar PDF" ao lado do ícone para clareza imediata.
  - Em mobile (< 768px), exibir o ícone compacto com área de toque mínima acessível de 36px-40px.

## Impact Analysis

- `src/components/Header.jsx`: Adicionar botão de download e import do ícone `Download` + asset `pdfUrl`.
- `src/styles/header.css`: Adicionar estilos do botão `.btn-download-pdf` e container de ações.

## Rollback Plan

Se houver qualquer problema de carregamento ou tamanho de asset, o botão pode ser revertido no `Header.jsx` sem impacto no leitor de páginas.
