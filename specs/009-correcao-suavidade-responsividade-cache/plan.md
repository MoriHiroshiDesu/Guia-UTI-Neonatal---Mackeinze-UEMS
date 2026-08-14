# Implementation Plan: Correção de Suavidade de Abertura, Responsividade Total e Controle de Cache

**Feature**: Correção de Suavidade de Abertura, Responsividade Total e Controle de Cache
**Related Spec**: [spec.md](./spec.md)

## Architecture & Technical Approach

### 1. Robustez no Gerenciamento de Transição de Capa (`FlipBook.jsx` & `flipbook.css`)
- Refatorar o cálculo de `updateMountPosition`:
  - Centralização de capa (`translateX(-25%)`) na página 1 no modo desktop (`containerWidth >= 768` ou modo de duas páginas).
  - Centralização da contracapa (`translateX(25%)`) na última página.
  - Centro padrão (`translateX(0)`) em páginas internas abertas (>= 2 e < total).
- No ciclo de eventos do PageFlip:
  - `changeState`: Quando `e.data === 'flipping'`, antecipar a transição.
  - Quando `e.data === 'read'` (repouso após virar ou após cancelar dobra): restabelecer imediatamente a posição exata da página atual (`pageFlip.getCurrentPageIndex() + 1`).
  - Em `flipPrev()` e `flipNext()`: manter a antecipação sincronizada em 550ms.
- Manter `transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)` no `.flipbook-mount` e assegurar que `will-change: transform` e `transform-origin: center center` garantam aceleração por GPU.

### 2. Responsividade Total Sem Cortes de Arte ("Engolida no Quadro")
- Redimensionamento Dinâmico com `ResizeObserver`:
  - Observar o `containerRef.current`.
  - Quando a largura ou altura do container mudar significativamente, recalcular as dimensões ótimas preservando a proporção de `874 / 1241` (single) e `1748 / 1241` (double).
  - Aplicar margem de segurança de respiração (ex: 96% do espaço disponível) para que nenhuma borda encoste ou seja cortada pelo viewport.
- Ajustes de Layout no `index.css`:
  - Atualizar `.app-container` no desktop para `max-width: min(94vw, 1400px)` (anteriormente limitado a 1100px), permitindo que monitores Full HD, 2K e 4K exibam o livro com amplitude proporcional e sem esmagamento.
- Ajuste no `.page-inner` e `.page-image`:
  - Assegurar `width: 100%; height: 100%; object-fit: contain;` e que `.flip-page` mantenha o tamanho exato calculado pelo PageFlip.

### 3. Controle de Cache no Deploy e Browser
- Atualizar `index.html`:
  - Adicionar meta tags de controle de cache:
    - `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />`
    - `<meta http-equiv="Pragma" content="no-cache" />`
    - `<meta http-equiv="Expires" content="0" />`
- Atualizar `.github/workflows/deploy.yml`:
  - Adicionar passo explícito de limpeza antes do build (`rm -rf dist`).
  - Assegurar que os assets continuem com os hashes únicos do Vite para permitir cache imutável dos arquivos JS/CSS/WebP enquanto o HTML sempre busca a versão mais recente.

## Impact Analysis
- `src/components/FlipBook.jsx`: Adição do `ResizeObserver` e refinamento dos listeners de evento `changeState` e `flip`.
- `src/styles/index.css`: Expansão do `max-width` responsivo no desktop e respiros laterais.
- `index.html`: Inclusão das meta tags anti-cache para o HTML principal.
- `.github/workflows/deploy.yml`: Limpeza explícita de build.

## Rollback Plan
Reverter alterações em `FlipBook.jsx` e `index.css` se houver efeitos colaterais.
