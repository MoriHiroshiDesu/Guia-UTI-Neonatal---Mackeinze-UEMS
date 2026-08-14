import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { RotateCcw } from 'lucide-react';
import '../styles/zoom.css';

export const ZoomViewer = forwardRef(function ZoomViewer(
  { children, onZoomChange, onActiveStateChange, onPinchStateChange },
  ref
) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [isDraggingVisual, setIsDraggingVisual] = useState(false);

  // Rastreamento de toques para Pinch, Pan e Double-Tap
  const touchState = useRef({
    initialDistance: 0,
    initialScale: 1,
    lastTouch: { x: 0, y: 0 },
    isDragging: false,
    isPinching: false,
    lastTapTime: 0,
    pinchReleaseTimeout: null,
  });

  // Rastreamento de mouse para Pan e Double-Click no desktop
  const mouseState = useRef({
    isDragging: false,
    lastPos: { x: 0, y: 0 },
    movedDistance: 0,
  });

  const getDistance = (t1, t2) => {
    return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
  };

  const clampPosition = useCallback((pos, currentScale) => {
    if (currentScale <= 1 || !containerRef.current) {
      return { x: 0, y: 0 };
    }
    const container = containerRef.current;
    const maxPanX = ((currentScale - 1) * container.clientWidth) / 2;
    const maxPanY = ((currentScale - 1) * container.clientHeight) / 2;

    return {
      x: Math.max(-maxPanX, Math.min(maxPanX, pos.x)),
      y: Math.max(-maxPanY, Math.min(maxPanY, pos.y)),
    };
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsZoomActive(false);
    setIsDraggingVisual(false);
    mouseState.current.isDragging = false;
    onActiveStateChange?.(false);
    onZoomChange?.(1);
  }, [onActiveStateChange, onZoomChange]);

  const updateZoom = useCallback(
    (newScale) => {
      const clampedScale = Math.max(1, Math.min(3.5, newScale));
      const active = clampedScale > 1.05;
      
      setScale(clampedScale);
      setIsZoomActive(active);
      onActiveStateChange?.(active);
      onZoomChange?.(clampedScale);

      if (!active) {
        setPosition({ x: 0, y: 0 });
        setIsDraggingVisual(false);
        mouseState.current.isDragging = false;
      } else {
        setPosition((prev) => clampPosition(prev, clampedScale));
      }
    },
    [clampPosition, onActiveStateChange, onZoomChange]
  );

  // Expõe métodos para controle externo (ex: botões no Header)
  useImperativeHandle(ref, () => ({
    zoomIn: () => updateZoom(scale + 0.5),
    zoomOut: () => (scale <= 1.5 ? resetZoom() : updateZoom(scale - 0.5)),
    resetZoom: () => resetZoom(),
    getScale: () => scale,
  }));

  // ==================== MANIPULADORES DE MOUSE (DESKTOP) ====================
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Apenas botão principal (esquerdo)

    if (scale > 1.05) {
      e.preventDefault();
      e.stopPropagation();
      mouseState.current.isDragging = true;
      mouseState.current.lastPos = { x: e.clientX, y: e.clientY };
      mouseState.current.movedDistance = 0;
      setIsDraggingVisual(true);
    }
  };

  const handleDoubleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (scale > 1.05) {
      resetZoom();
    } else {
      updateZoom(2.2);
    }
  };

  // Listeners globais de mouse para continuidade de arraste mesmo saindo do container
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (mouseState.current.isDragging && scale > 1.05) {
        e.preventDefault();
        e.stopPropagation();
        const deltaX = e.clientX - mouseState.current.lastPos.x;
        const deltaY = e.clientY - mouseState.current.lastPos.y;
        mouseState.current.movedDistance += Math.hypot(deltaX, deltaY);
        mouseState.current.lastPos = { x: e.clientX, y: e.clientY };

        setPosition((prev) => {
          const next = { x: prev.x + deltaX, y: prev.y + deltaY };
          return clampPosition(next, scale);
        });
      }
    };

    const handleGlobalMouseUp = (e) => {
      if (mouseState.current.isDragging) {
        if (mouseState.current.movedDistance > 4) {
          e.preventDefault();
          e.stopPropagation();
        }
        mouseState.current.isDragging = false;
        setIsDraggingVisual(false);
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { capture: true, passive: false });
    window.addEventListener('mouseup', handleGlobalMouseUp, { capture: true, passive: false });

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove, { capture: true });
      window.removeEventListener('mouseup', handleGlobalMouseUp, { capture: true });
    };
  }, [scale, clampPosition]);

  // ==================== MANIPULADORES DE TOQUE (MOBILE) ====================
  const handleTouchStart = (e) => {
    if (touchState.current.pinchReleaseTimeout) {
      clearTimeout(touchState.current.pinchReleaseTimeout);
      touchState.current.pinchReleaseTimeout = null;
    }

    if (e.touches.length >= 2) {
      // Bloqueio rigoroso de propagação para não afetar o PageFlip
      e.preventDefault();
      e.stopPropagation();
      touchState.current.isPinching = true;
      onPinchStateChange?.(true);

      const dist = getDistance(e.touches[0], e.touches[1]);
      touchState.current.initialDistance = dist;
      touchState.current.initialScale = scale;
      touchState.current.isDragging = false;
    } else if (e.touches.length === 1) {
      const now = Date.now();
      const timeDiff = now - touchState.current.lastTapTime;
      const touch = e.touches[0];

      // Detecção de Duplo Toque
      if (timeDiff < 320 && timeDiff > 0) {
        if (scale > 1.05) {
          resetZoom();
        } else {
          updateZoom(2.2);
        }
        touchState.current.lastTapTime = 0;
        return;
      }
      touchState.current.lastTapTime = now;

      // Se já estiver com zoom, inicia pan de arrasto
      if (scale > 1.05) {
        e.preventDefault();
        e.stopPropagation();
        touchState.current.isDragging = true;
        touchState.current.lastTouch = { x: touch.clientX, y: touch.clientY };
      }
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length >= 2) {
      // Gesto de pinça contínuo
      e.preventDefault();
      e.stopPropagation();
      const dist = getDistance(e.touches[0], e.touches[1]);
      if (touchState.current.initialDistance > 0) {
        const factor = dist / touchState.current.initialDistance;
        const targetScale = touchState.current.initialScale * factor;
        updateZoom(targetScale);
      }
    } else if (e.touches.length === 1 && touchState.current.isDragging && scale > 1.05) {
      // Arrastar (pan) na página ampliada
      e.preventDefault();
      e.stopPropagation();
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchState.current.lastTouch.x;
      const deltaY = touch.clientY - touchState.current.lastTouch.y;

      touchState.current.lastTouch = { x: touch.clientX, y: touch.clientY };

      setPosition((prev) => {
        const next = { x: prev.x + deltaX, y: prev.y + deltaY };
        return clampPosition(next, scale);
      });
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length < 2) {
      touchState.current.initialDistance = 0;
    }
    if (e.touches.length === 0) {
      touchState.current.isDragging = false;
      if (scale < 1.05) {
        resetZoom();
      }
      // Cooldown de 150ms para evitar falsos swipes ao soltar a pinça
      touchState.current.pinchReleaseTimeout = setTimeout(() => {
        touchState.current.isPinching = false;
        onPinchStateChange?.(false);
      }, 150);
    }
  };

  const isPanningActive =
    mouseState.current.isDragging ||
    isDraggingVisual ||
    touchState.current.isDragging ||
    touchState.current.initialDistance > 0;

  return (
    <div
      className={`zoom-container ${isZoomActive ? 'zoom-active' : ''} ${isDraggingVisual ? 'zoom-dragging' : ''}`}
      ref={containerRef}
      onMouseDownCapture={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <div
        className="zoom-content"
        onTouchStartCapture={handleTouchStart}
        onTouchMoveCapture={handleTouchMove}
        onTouchEndCapture={handleTouchEnd}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
          transformOrigin: 'center center',
          transition: isPanningActive
            ? 'none'
            : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {children}
      </div>

      {/* Botão flutuante para reset rápido de zoom */}
      {isZoomActive && (
        <div
          className="zoom-floating-badge"
          onClick={(e) => {
            e.stopPropagation();
            resetZoom();
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => {
            e.stopPropagation();
            e.preventDefault();
            resetZoom();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          role="button"
          tabIndex={0}
          aria-label="Redefinir zoom para tamanho original"
        >
          <RotateCcw size={14} />
          <span>Resetar Zoom ({scale.toFixed(1)}x)</span>
        </div>
      )}
    </div>
  );
});

export default ZoomViewer;
