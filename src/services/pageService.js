/**
 * Serviço modular e auto-ajustável para descoberta, ordenação e pré-carregamento das páginas.
 */

// Importação dinâmica via Vite de todas as imagens presentes em docs/paginas/
const pageModules = import.meta.glob('/docs/paginas/*.{webp,png,jpg,jpeg}', {
  eager: true,
  import: 'default',
});

/**
 * Extrai o número da página a partir do nome do arquivo para ordenação natural
 * @param {string} path 
 * @returns {number}
 */
function extractPageNumber(path) {
  const match = path.match(/pagina-(\d+)/i) || path.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 9999;
}

/**
 * Lista ordenada de todas as páginas detectadas
 * @type {Array<import('../types/reader').PageItem>}
 */
const sortedPages = Object.entries(pageModules)
  .map(([path, src]) => {
    const filename = path.split('/').pop() || '';
    const index = extractPageNumber(filename);
    return {
      index,
      src,
      filename,
      title: `Página ${index}`,
      isCover: index === 1,
      isBackCover: false,
    };
  })
  .sort((a, b) => a.index - b.index)
  .map((page, idx, array) => ({
    ...page,
    index: idx + 1, // Garante sequência normalizada 1..N
    isCover: idx === 0,
    isBackCover: idx === array.length - 1,
  }));

// Cache de imagens pré-carregadas na memória do navegador
const preloadCache = new Set();

export const pageService = {
  /**
   * Retorna a lista completa de páginas em ordem
   */
  getPages() {
    return sortedPages;
  },

  /**
   * Retorna o total de páginas disponíveis
   */
  getTotalPages() {
    return sortedPages.length;
  },

  /**
   * Retorna uma página específica pelo índice (1-based)
   * @param {number} pageIndex 
   */
  getPage(pageIndex) {
    if (pageIndex < 1 || pageIndex > sortedPages.length) return null;
    return sortedPages[pageIndex - 1];
  },

  /**
   * Pré-carrega a imagem de uma página em memória
   * @param {number} pageIndex 
   */
  preloadPage(pageIndex) {
    const page = this.getPage(pageIndex);
    if (!page || preloadCache.has(page.src)) return;

    const img = new Image();
    img.src = page.src;
    img.onload = () => preloadCache.add(page.src);
  },

  /**
   * Pré-carrega as páginas adjacentes (N-1, N+1, N+2) para transições instantâneas
   * @param {number} currentPageIndex 
   * @param {number} bufferRange 
   */
  preloadAdjacentPages(currentPageIndex, bufferRange = 2) {
    for (let i = 1; i <= bufferRange; i++) {
      this.preloadPage(currentPageIndex + i);
      this.preloadPage(currentPageIndex - i);
    }
  },
};
