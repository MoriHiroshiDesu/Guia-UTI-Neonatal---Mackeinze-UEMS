import React, { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from 'react';
import { PageFlip } from 'page-flip';
import '../styles/flipbook.css';

export const FlipBook = forwardRef(function FlipBook(
  {
    pages,
    currentPage = 1,
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

  // Atualiza o alinhamento da capa/livro aberto para simulação física realista em Desktop
  const updateMountPosition = useCallback((pageIndex) => {
    if (!mountElRef.current || !containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth || 360;
    const isDesktop = containerWidth >= 700;

    if (!isDesktop) {
      mountElRef.current.style.transform = 'none';
      return;
    }

    const total = pages ? pages.length : 33;
    if (pageIndex <= 1) {
      // Capa fechada: centraliza no meio da tela (desloca 25% para a esquerda do canvas duplo)
      mountElRef.current.style.transform = 'translateX(-25%)';
    } else if (pageIndex >= total) {
      // Contracapa fechada: centraliza no meio da tela (desloca 25% para a direita do canvas duplo)
      mountElRef.current.style.transform = 'translateX(25%)';
    } else {
      // Livro aberto com duas páginas: centralizado normalmente
      mountElRef.current.style.transform = 'translateX(0)';
    }
  }, [pages]);

  // Expõe métodos do PageFlip para o componente pai (App / Controls) com antecipação imediata da transição
  useImperativeHandle(ref, () => ({
    flipNext: () => {
      if (pageFlipInstance.current) {
        const cur = pageFlipInstance.current.getCurrentPageIndex() + 1;
        // Inicia a transição do container IMEDIATAMENTE junto com o início do flip
        if (cur <= 1) {
          updateMountPosition(2);
        } else if (cur >= (pages?.length || 33) - 2) {
          updateMountPosition(pages?.length || 33);
        }
        pageFlipInstance.current.flipNext();
      }
    },
    flipPrev: () => {
      if (pageFlipInstance.current) {
        const cur = pageFlipInstance.current.getCurrentPageIndex() + 1;
        // Inicia a transição de fechamento IMEDIATAMENTE junto com o início do flip
        if (cur <= 3) {
          updateMountPosition(1);
        } else if (cur >= (pages?.length || 33)) {
          updateMountPosition((pages?.length || 33) - 1);
        }
        pageFlipInstance.current.flipPrev();
      }
    },
    goToPage: (pageIndex) => {
      if (pageFlipInstance.current) {
        updateMountPosition(pageIndex);
        // page-flip usa índice 0-based
        pageFlipInstance.current.flip(pageIndex - 1);
      }
    },
    getCurrentPageIndex: () => {
      return pageFlipInstance.current
        ? pageFlipInstance.current.getCurrentPageIndex() + 1
        : currentPage;
    },
  }), [pages, currentPage, updateMountPosition]);

  // Sincroniza o alinhamento quando a página mudar ou a janela for redimensionada
  useEffect(() => {
    updateMountPosition(currentPage);
  }, [currentPage, updateMountPosition]);

  useEffect(() => {
    const handleResize = () => {
      updateMountPosition(currentPage);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentPage, updateMountPosition]);

  // Interceptador em fase de captura para blindagem total de eventos de toque (Pinch vs Swipe)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isShieldActive = false;
    let cooldownTimer = null;

    const handleCaptureTouch = (e) => {
      if (e.touches.length >= 2) {
        isShieldActive = true;
        if (cooldownTimer) {
          clearTimeout(cooldownTimer);
          cooldownTimer = null;
        }
      }

      if (isShieldActive || isZoomActive || isPinching) {
        e.stopPropagation();

        // Se todos os dedos foram soltos, mantém o bloqueio ativo por 350ms para engolir eventos residuais
        if (e.touches.length === 0 && isShieldActive) {
          cooldownTimer = setTimeout(() => {
            isShieldActive = false;
          }, 350);
        }
      }
    };

    container.addEventListener('touchstart', handleCaptureTouch, { capture: true, passive: false });
    container.addEventListener('touchmove', handleCaptureTouch, { capture: true, passive: false });
    container.addEventListener('touchend', handleCaptureTouch, { capture: true, passive: false });
    container.addEventListener('touchcancel', handleCaptureTouch, { capture: true, passive: false });

    return () => {
      container.removeEventListener('touchstart', handleCaptureTouch, { capture: true });
      container.removeEventListener('touchmove', handleCaptureTouch, { capture: true });
      container.removeEventListener('touchend', handleCaptureTouch, { capture: true });
      container.removeEventListener('touchcancel', handleCaptureTouch, { capture: true });
      if (cooldownTimer) clearTimeout(cooldownTimer);
    };
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
        updateMountPosition(newPage);
        if (onPageChange) {
          onPageChange(newPage);
        }
      });

      pageFlip.on('changeState', (e) => {
        if (e.data === 'flipping' || e.data === 'user_fold') {
          const cur = pageFlip.getCurrentPageIndex() + 1;
          if (cur <= 1) {
            // Antecipa abertura imediatamente durante o início da dobra/virada
            updateMountPosition(2);
          }
          if (onFlipStart) {
            onFlipStart();
          }
        }
      });

      pageFlip.on('init', () => {
        updateMountPosition(initialPage);
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
  }, [pages, initialPage, onPageChange, onFlipStart, onInit, updateMountPosition]);

  return (
    <div className="flipbook-wrapper" ref={containerRef} />
  );
});

export default FlipBook;
