import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { PageFlip } from 'page-flip';
import '../styles/flipbook.css';

export const FlipBook = forwardRef(function FlipBook(
  { pages, onPageChange, onFlipStart, onInit },
  ref
) {
  const containerRef = useRef(null);
  const bookRef = useRef(null);
  const pageFlipInstance = useRef(null);

  // Expõe métodos do PageFlip para o componente pai (App / Controls)
  useImperativeHandle(ref, () => ({
    flipNext: () => {
      if (pageFlipInstance.current) {
        pageFlipInstance.current.flipNext();
      }
    },
    flipPrev: () => {
      if (pageFlipInstance.current) {
        pageFlipInstance.current.flipPrev();
      }
    },
    goToPage: (pageIndex) => {
      if (pageFlipInstance.current) {
        // page-flip usa índice 0-based
        pageFlipInstance.current.flip(pageIndex - 1);
      }
    },
    getCurrentPageIndex: () => {
      return pageFlipInstance.current
        ? pageFlipInstance.current.getCurrentPageIndex() + 1
        : 1;
    },
  }));

  useEffect(() => {
    if (!bookRef.current || !pages || pages.length === 0) return;

    // Destrói instância anterior se houver
    if (pageFlipInstance.current) {
      try {
        pageFlipInstance.current.destroy();
      } catch (err) {
        console.warn('Erro ao limpar instância anterior do PageFlip:', err);
      }
    }

    const container = containerRef.current;
    const containerWidth = container ? container.clientWidth : 360;
    const containerHeight = container ? container.clientHeight : 560;

    // Proporção ideal de leitura mobile (aproximadamente 1 : 1.5)
    const baseWidth = Math.min(containerWidth, 420);
    const baseHeight = Math.min(containerHeight, baseWidth * 1.55);

    try {
      const pageFlip = new PageFlip(bookRef.current, {
        width: baseWidth,
        height: baseHeight,
        size: 'stretch',
        minWidth: 260,
        maxWidth: 550,
        minHeight: 380,
        maxHeight: 850,
        maxShadowOpacity: 0.4,
        showCover: true,
        mobileScrollSupport: false,
        usePortrait: true,
        startPage: 0,
        drawShadow: true,
        flippingTime: 650,
        useMouseEvents: true,
        swipeDistance: 25,
        clickEventForward: true,
      });

      pageFlip.loadFromHTML(bookRef.current.querySelectorAll('.flip-page'));

      pageFlip.on('flip', (e) => {
        // e.data contém o novo índice da página (0-based)
        const newPage = e.data + 1;
        if (onPageChange) {
          onPageChange(newPage);
        }
      });

      pageFlip.on('changeState', (e) => {
        if (e.data === 'flipping' && onFlipStart) {
          onFlipStart();
        }
      });

      pageFlip.on('init', () => {
        if (onInit) onInit();
      });

      pageFlipInstance.current = pageFlip;
    } catch (error) {
      console.error('Erro ao inicializar PageFlip:', error);
    }

    return () => {
      if (pageFlipInstance.current) {
        try {
          pageFlipInstance.current.destroy();
          pageFlipInstance.current = null;
        } catch (e) {
          // cleanup silencioso
        }
      }
    };
  }, [pages]);

  return (
    <div className="flipbook-wrapper" ref={containerRef}>
      <div className="flipbook-container" ref={bookRef}>
        {pages.map((page) => (
          <div
            key={page.filename}
            className={`flip-page ${page.isCover ? 'page-cover' : ''} ${page.isBackCover ? 'page-back' : ''}`}
            data-density={page.isCover || page.isBackCover ? 'hard' : 'soft'}
          >
            <div className="page-inner">
              <img
                src={page.src}
                alt={`Guia UTI Neonatal - ${page.title}`}
                className="page-image"
                loading={page.index <= 3 ? 'eager' : 'lazy'}
                draggable="false"
              />
              <div className="page-shadow-overlay" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
