/**
 * @typedef {Object} PageItem
 * @property {number} index - Índice sequencial da página (1 a N)
 * @property {string} src - URL ou caminho do arquivo da página
 * @property {string} filename - Nome original do arquivo (ex: pagina-01.webp)
 * @property {string} title - Rótulo acessível da página
 * @property {boolean} isCover - Indica se é a capa inicial
 * @property {boolean} isBackCover - Indica se é a contracapa final
 */

/**
 * @typedef {Object} ReaderState
 * @property {number} currentPage - Página atual em foco (1 a totalPages)
 * @property {number} totalPages - Total de páginas detectadas
 * @property {boolean} isFlipping - Se há uma animação em curso
 * @property {boolean} isLoading - Se os dados/imagens estão sendo carregados
 */

export const DEFAULT_READER_STATE = {
  currentPage: 1,
  totalPages: 0,
  isFlipping: false,
  isLoading: true,
};
