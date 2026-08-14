import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { PageFlip } from 'page-flip';
import '../styles/flipbook.css';

export const FlipBook = forwardRef(function FlipBook(
  {
    pages,
    initialPage = 1,
    onPageChange,
    onFlipStart,
    onInit,
    isZoomActive = false,
    isPinching = false,
  },
  ref
) {
  const containerRef = useRef(null);
  const pageFlipInstance = useRef(null);
  const mountElRef = useRef(null);

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
        : initialPage;
    },
  }));

  // Desativa gestos de folheação durante zoom ou pinça multitouch
  useEffect(() => {
    if (mountElRef.current) {
      mountElRef.current.style.pointerEvents = isZoomActive || isPinching ? 'none' : 'auto';
    }
  }, [isZoomActive, isPinching]);

  useEffect(() => {
    if (!containerRef.current || !pages || pages.length === 0) return;

    // Limpa montagem anterior
    containerRef.current.innerHTML = '';

    // Cria elemento DOM exclusivo para o PageFlip gerenciar
    const mountEl = document.createElement('div');
    mountEl.className = 'flipbook-mount';
    mountElRef.current = mountEl;
    containerRef.current.appendChild(mountEl);

    // Monta a estrutura HTML com <img> nativo para máxima nitidez (High-DPI / Retina)
    pages.forEach((page, idx) => {
      const pageDiv = document.createElement('div');
      pageDiv.className = `flip-page ${page.isCover ? 'page-cover' : ''} ${page.isBackCover ? 'page-back' : ''}`;
      pageDiv.setAttribute('data-density', page.isCover || page.isBackCover ? 'hard' : 'soft');

      const pageInner = document.createElement('div');
      pageInner.className = 'page-inner';

      const img = document.createElement('img');
      img.src = page.src;
      img.alt = `Guia UTI Neonatal - ${page.title}`;
      img.className = 'page-image';
      img.loading = Math.abs(idx + 1 - initialPage) <= 3 ? 'eager' : 'lazy';
      img.draggable = false;

      const shadowOverlay = document.createElement('div');
      shadowOverlay.className = 'page-shadow-overlay';
      shadowOverlay.setAttribute('aria-hidden', 'true');

      pageInner.appendChild(img);
      pageInner.appendChild(shadowOverlay);
      pageDiv.appendChild(pageInner);
      mountEl.appendChild(pageDiv);
    });

    const containerWidth = containerRef.current.clientWidth || 360;
    const containerHeight = containerRef.current.clientHeight || 560;

    // Proporção de página única (874 x 1241 = ~0.70427)
    const singleRatio = 874 / 1241;
    // Tela larga (Desktop / Widescreen >= 700px)
    const isDesktop = containerWidth >= 700;

    let baseWidth, baseHeight;

    if (isDesktop) {
      // Proporção de livro aberto duplo: (2 * 874) / 1241 = ~1.40854
      const doubleRatio = (2 * 874) / 1241;
      let bookWidth = containerWidth;
      let bookHeight = bookWidth / doubleRatio;

      if (bookHeight > containerHeight) {
        bookHeight = containerHeight;
        bookWidth = bookHeight * doubleRatio;
      }

      // Largura de cada folha no PageFlip = metade da largura do livro aberto
      baseWidth = Math.round(bookWidth / 2);
      baseHeight = Math.round(bookHeight);
    } else {
      // Modo Mobile retrato (folha única)
      baseWidth = containerWidth;
      baseHeight = baseWidth / singleRatio;

      if (baseHeight > containerHeight) {
        baseHeight = containerHeight;
        baseWidth = baseHeight * singleRatio;
      }
      baseWidth = Math.round(baseWidth);
      baseHeight = Math.round(baseHeight);
    }

    try {
      const pageFlip = new PageFlip(mountEl, {
        width: baseWidth,
        height: baseHeight,
        size: 'stretch',
        minWidth: 260,
        maxWidth: 900,
        minHeight: 360,
        maxHeight: 1400,
        maxShadowOpacity: 0.35,
        showCover: true,
        mobileScrollSupport: false,
        usePortrait: !isDesktop, // No desktop ativa abertura dupla de livro
        startPage: Math.max(0, Math.min(pages.length - 1, initialPage - 1)),
        drawShadow: true,
        flippingTime: 550,
        useMouseEvents: true,
        swipeDistance: 20,
        clickEventForward: true,
      });

      pageFlip.loadFromHTML(mountEl.querySelectorAll('.flip-page'));

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
      console.error('Erro ao inicializar PageFlip com HTML:', error);
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
      mountElRef.current = null;
    };
  }, [pages]);

  return (
    <div className="flipbook-wrapper" ref={containerRef} />
  );
});

export default FlipBook;
