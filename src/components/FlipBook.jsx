import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { PageFlip } from 'page-flip';
import '../styles/flipbook.css';

export const FlipBook = forwardRef(function FlipBook(
  { pages, onPageChange, onFlipStart, onInit },
  ref
) {
  const containerRef = useRef(null);
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
    if (!containerRef.current || !pages || pages.length === 0) return;

    // Limpa qualquer montagem anterior no container
    containerRef.current.innerHTML = '';

    // Cria elemento DOM exclusivo para o PageFlip gerenciar
    const mountEl = document.createElement('div');
    mountEl.className = 'flipbook-mount';
    containerRef.current.appendChild(mountEl);

    const containerWidth = containerRef.current.clientWidth || 360;
    const containerHeight = containerRef.current.clientHeight || 560;

    // Proporção de página do guia
    const baseWidth = Math.min(containerWidth, 420);
    const baseHeight = Math.min(containerHeight, baseWidth * 1.45);

    try {
      const pageFlip = new PageFlip(mountEl, {
        width: Math.round(baseWidth),
        height: Math.round(baseHeight),
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
        flippingTime: 600,
        useMouseEvents: true,
        swipeDistance: 25,
        clickEventForward: true,
      });

      const imageUrls = pages.map((p) => p.src);
      pageFlip.loadFromImages(imageUrls);

      pageFlip.on('flip', (e) => {
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
        } catch (e) {
          // cleanup seguro
        }
        pageFlipInstance.current = null;
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [pages]);

  return (
    <div className="flipbook-wrapper" ref={containerRef} />
  );
});

export default FlipBook;
