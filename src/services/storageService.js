/**
 * Serviço para persistência da página atual do guia usando localStorage e URL hash.
 */

const STORAGE_KEY = 'guia_uti_neonatal_last_page';

export const storageService = {
  /**
   * Obtém o número da página inicial salva no hash ou localStorage.
   * @param {number} totalPages
   * @returns {number}
   */
  getInitialPage(totalPages = 33) {
    // 1. Tenta ler a partir do hash da URL (#page-5 ou #5)
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashMatch = window.location.hash.match(/#?(?:page-|pagina-)?(\d+)/i);
      if (hashMatch) {
        const hashPage = parseInt(hashMatch[1], 10);
        if (!isNaN(hashPage) && hashPage >= 1 && hashPage <= totalPages) {
          return hashPage;
        }
      }
    }

    // 2. Tenta ler a partir do localStorage
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = parseInt(saved, 10);
          if (!isNaN(parsed) && parsed >= 1 && parsed <= totalPages) {
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn('Não foi possível acessar localStorage:', e);
    }

    // 3. Fallback padrão: primeira página
    return 1;
  },

  /**
   * Salva a página atual no localStorage e atualiza o hash da URL silenciosamente.
   * @param {number} pageNumber
   */
  savePage(pageNumber) {
    if (!pageNumber || isNaN(pageNumber) || pageNumber < 1) return;

    try {
      if (typeof window !== 'undefined') {
        if (window.localStorage) {
          window.localStorage.setItem(STORAGE_KEY, pageNumber.toString());
        }
        // Atualiza a URL com replaceState para não poluir o histórico de navegação
        const newUrl = `${window.location.pathname}#page-${pageNumber}`;
        window.history.replaceState(null, '', newUrl);
      }
    } catch (e) {
      console.warn('Erro ao salvar página no storageService:', e);
    }
  },
};
