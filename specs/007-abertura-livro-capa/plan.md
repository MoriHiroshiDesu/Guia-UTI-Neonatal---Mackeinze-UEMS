# Implementation Plan: Efeito de Livro Aberto e Capa

**Feature**: Efeito de Livro Aberto e Capa
**Related Spec**: [spec.md](./spec.md)

## Architecture & Technical Approach

### 1. Ajustes no CSS do FlipBook (`flipbook.css`)
- Remover `background-color: #ffffff` e `box-shadow` rígidos de `.flipbook-mount` para permitir transparência completa na metade vazia quando a capa estiver visível.
- Adicionar sombra realista de livro (`--shadow-book`) em cada folha individual `.flip-page` ou na capa e páginas abertas.
- Adicionar classe de estado ou estilo de transição suave em `.flipbook-mount`:
  - `transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);`
  - `will-change: transform;`

### 2. Gerenciamento de Posição Dinâmica no `FlipBook.jsx`
- Passar a prop `currentPage` para o `FlipBook` ou escutar os eventos `on('flip')` e `on('changeState')`.
- Determinar o estado de posicionamento:
  - Se `isDesktop`:
    - Se `currentPage === 1` (capa): aplicar classe `.mount-cover` (`transform: translateX(-25%)`).
    - Se `currentPage === totalPages` (contracapa): aplicar classe `.mount-back-cover` (`transform: translateX(25%)`).
    - Se `1 < currentPage < totalPages` (livro aberto): aplicar classe `.mount-spread` (`transform: translateX(0)`).
  - Se mobile (`!isDesktop`): sempre `transform: none`.
- Ajustar em resize de janela ou mudança de orientação.

## Impact Analysis

- `src/components/FlipBook.jsx`: Adicionar sincronização do estado `currentPage` com o `transform` da montagem.
- `src/styles/flipbook.css`: Adicionar regras de `transform`, `transition` e sombras refinadas para capa/contracapa/spread.

## Rollback Plan

Se o alinhamento tiver algum efeito colateral com zoom ou gestos, basta retornar as regras de `.flipbook-mount` ao `transform: none` padrão.
