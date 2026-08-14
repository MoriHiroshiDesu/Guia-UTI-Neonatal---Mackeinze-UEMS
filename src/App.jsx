import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { FlipBook } from './components/FlipBook';
import { ZoomViewer } from './components/ZoomViewer';
import { Controls } from './components/Controls';
import { LoadingIndicator } from './components/LoadingIndicator';
import { AuroraBackground } from './components/AuroraBackground';
import { pageService } from './services/pageService';
import { storageService } from './services/storageService';

export function App() {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [zoomScale, setZoomScale] = useState(1);
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [isPinching, setIsPinching] = useState(false);

  const flipBookRef = useRef(null);
  const zoomRef = useRef(null);

  // Carregamento inicial do acervo de páginas e restauração da página salva
  useEffect(() => {
    const loadedPages = pageService.getPages();
    setPages(loadedPages);
    setTotalPages(loadedPages.length);

    if (loadedPages.length > 0) {
      const savedPage = storageService.getInitialPage(loadedPages.length);
      setCurrentPage(savedPage);

      // Pré-carrega páginas próximas do ponto de leitura
      pageService.preloadAdjacentPages(savedPage, 3);
    }

    // Transição de carregamento inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  // Pré-carrega páginas adjacentes e salva estado sempre que a página atual mudar
  useEffect(() => {
    if (currentPage > 0 && totalPages > 0) {
      storageService.savePage(currentPage);
      pageService.preloadAdjacentPages(currentPage, 3);
    }
  }, [currentPage, totalPages]);

  // Ações de navegação (com reset automático de zoom antes de virar a folha)
  const handleNext = useCallback(() => {
    if (zoomRef.current && isZoomActive) {
      zoomRef.current.resetZoom();
    }
    if (flipBookRef.current) {
      flipBookRef.current.flipNext();
    }
  }, [isZoomActive]);

  const handlePrev = useCallback(() => {
    if (zoomRef.current && isZoomActive) {
      zoomRef.current.resetZoom();
    }
    if (flipBookRef.current) {
      flipBookRef.current.flipPrev();
    }
  }, [isZoomActive]);

  const handleFirstPage = useCallback(() => {
    if (zoomRef.current && isZoomActive) {
      zoomRef.current.resetZoom();
    }
    if (flipBookRef.current) {
      flipBookRef.current.goToPage(1);
    }
  }, [isZoomActive]);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
    if (zoomRef.current && isZoomActive) {
      zoomRef.current.resetZoom();
    }
  }, [isZoomActive]);

  // Salto direto disparado pelo Scrubber Slider
  const handlePageSelect = useCallback((targetPage) => {
    if (zoomRef.current && isZoomActive) {
      zoomRef.current.resetZoom();
    }
    if (flipBookRef.current) {
      flipBookRef.current.goToPage(targetPage);
    }
    setCurrentPage(targetPage);
  }, [isZoomActive]);

  // Controles de zoom disparados pelo Header
  const handleZoomIn = useCallback(() => {
    if (zoomRef.current) {
      zoomRef.current.zoomIn();
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (zoomRef.current) {
      zoomRef.current.zoomOut();
    }
  }, []);

  const handleResetZoom = useCallback(() => {
    if (zoomRef.current) {
      zoomRef.current.resetZoom();
    }
  }, []);

  // Atalhos de teclado (setas esquerda/direita, Home, + e - para zoom)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrev();
      } else if (e.key === 'Home') {
        handleFirstPage();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-' || e.key === '_') {
        handleZoomOut();
      } else if (e.key === 'Escape' || e.key === '0') {
        handleResetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleFirstPage, handleZoomIn, handleZoomOut, handleResetZoom]);

  return (
    <div className="app-container">
      <AuroraBackground />
      {/* Cabeçalho com Brand e Controles de Zoom */}
      <Header
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        zoomScale={zoomScale}
      />

      {/* Área Central de Leitura com Pinch-to-Zoom e PageFlip */}
      <main className="reader-viewport">
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <ZoomViewer
            ref={zoomRef}
            onZoomChange={setZoomScale}
            onActiveStateChange={setIsZoomActive}
            onPinchStateChange={setIsPinching}
          >
            <FlipBook
              ref={flipBookRef}
              pages={pages}
              initialPage={currentPage}
              onPageChange={handlePageChange}
              isZoomActive={isZoomActive}
              isPinching={isPinching}
            />
          </ZoomViewer>
        )}
      </main>

      {/* Barra de Controles Acessíveis com Scrubber Slider */}
      <Controls
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
        onPageSelect={handlePageSelect}
      />
    </div>
  );
}

export default App;
