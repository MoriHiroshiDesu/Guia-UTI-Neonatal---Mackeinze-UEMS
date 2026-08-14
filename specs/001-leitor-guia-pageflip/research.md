# Research & Technical Decisions: Leitor Interativo Page Flip

## 1. Biblioteca de Page Flip e Licenciamento

- **Decisão**: Utilizar `page-flip` (StPageFlip) / `react-pageflip` com suporte a gestos móveis, canvas/DOM 3D e renderização de imagens WebP.
- **Licença**: **MIT** (100% de código aberto, gratuita para uso comercial e não comercial, sem restrições).
- **Justificativa**:
  - `page-flip` (StPageFlip) é a biblioteca padrão da indústria para animação física de virada de folha realista (com curvatura, sombra, suporte a toque/arraste e aceleração por GPU).
  - É a mesma tecnologia base utilizada em componentes do ecossistema ReactBits.
  - Funciona perfeitamente em modo estático (Single Page Application / Client-Side) sem qualquer backend.
- **Alternativas avaliadas**:
  - *Turn.js*: Rejeitada por ter licença restritiva/paga (GPL/Commercial) e dependência de jQuery legada.
  - *CSS 3D puro manual*: Rejeitado para o efeito de folha curvada realista, pois exigiria centenas de linhas de cálculos matemáticos de malha/deformação com risco de bugs em navegadores móveis diversos.

## 2. Bundler e Arquitetura de Build

- **Decisão**: Utilizar **Vite** com **React + TailwindCSS / CSS puro** configurado com `base: './'` para exportação estática imediata para o **GitHub Pages**.
- **Justificativa**:
  - Build ultrarrápido com empacotamento otimizado.
  - Geração de HTML, CSS e JS puros na pasta `dist/` prontos para deploy no GitHub Pages via GitHub Actions ou branch `gh-pages`.
  - Recurso nativo `import.meta.glob` do Vite permite escanear e carregar automaticamente todas as imagens de `docs/paginas/*.webp` em tempo de build, garantindo o princípio constitucional de **Auto-Ajuste e Modularidade de Páginas**.
- **Alternativas avaliadas**:
  - *Next.js / Nuxt*: Desnecessariamente pesado para uma SPA de folheto estático de 33 páginas, além de exigir configurações adicionais de export estático.
  - *HTML/JS sem bundler*: Dificultaria a importação dinâmica automática das páginas e a integração modular de pacotes modernos sem CDNs externas.

## 3. Gestão e Auto-Ajuste do Acervo de Páginas

- **Decisão**: Mapeamento dinâmico via `import.meta.glob('/docs/paginas/*.webp', { eager: true, as: 'url' })` (ou script utilitário de páginas).
- **Justificativa**:
  - Elimina código rígido (*hardcoded*) com lista de páginas.
  - Qualquer imagem adicionada, removida ou renomeada em `docs/paginas/` é automaticamente detectada pelo leitor na ordem natural dos arquivos (`pagina-01.webp`, `pagina-02.webp`, etc.).
  - Inclui suporte a pré-carregamento (*preload*) em memória das páginas adjacentes para navegação instantânea.

## 4. Experiência Mobile-First e Acessibilidade

- **Decisão**: Layout vertical responsivo centralizado com proporção travada (*aspect-ratio* das páginas WebP), barra de controle inferior acessível com botões de navegação, contador de páginas ("X / 33") e barra de progresso sutil.
- **Justificativa**:
  - Garante que em qualquer tamanho de celular (iPhone, Android, telas de 360px a 430px) as páginas nunca fiquem cortadas.
  - Usuários que não quiserem ou não puderem usar gestos de arraste podem tocar nos botões laterais ou inferiores.
