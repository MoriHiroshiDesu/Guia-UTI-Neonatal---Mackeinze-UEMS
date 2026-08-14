import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { FlipBook } from './components/FlipBook';
import { Controls } from './components/Controls';
import { LoadingIndicator } from './components/LoadingIndicator';
import { pageService } from './services/pageService';

export function App() {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const flipBookRef = useRef(null);

  // Carregamento inicial do acervo de páginas
  useEffect(() => {
    const loadedPages = pageService.getPages();
    setPages(loadedPages);
    setTotalPages(loadedPages.length);

    if (loadedPages.length > 0) {
      // Pré-carrega as 3 primeiras páginas imediatamente
      pageService.preloadPage(1);
      pageService.preloadPage(2);
      pageService.preloadPage(3);
    }

    // Tempo de transição suave inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // Pré-carrega páginas adjacentes sempre que a página atual mudar
  useEffect(() => {
    if (currentPage > 0) {
      pageService.preloadAdjacentPages(currentPage, 3);
    }
  }, [currentPage]);

  // Ações de navegação
  const handleNext = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.flipNext();
    }
  }, []);

  const handlePrev = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.flipPrev();
    }
  }, []);

  const handleFirstPage = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.goToPage(1);
    }
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  // Atalhos de teclado (setas esquerda e direita) para acessibilidade no desktop
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrev();
      } else if (e.key === 'Home') {
        handleFirstPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleFirstPage]);

  return (
    <div className="app-container">
      {/* Cabeçalho */}
      <Header />

      {/* Área Central de Leitura com Page Flip */}
      <main className="reader-viewport">
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <FlipBook
            ref={flipBookRef}
            pages={pages}
            onPageChange={handlePageChange}
          />
        )}
      </main>

      {/* Barra de Controles Acessíveis */}
      <Controls
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
        onFirstPage={handleFirstPage}
      />
    </div>
  );
}

export default App;
