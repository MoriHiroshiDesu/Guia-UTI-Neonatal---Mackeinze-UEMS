import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/controls.css';

export function Controls({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  onPageSelect,
}) {
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  // Estado local para arrasto interativo do scrubber
  const [scrubberValue, setScrubberValue] = useState(currentPage);
  const [isScrubbing, setIsScrubbing] = useState(false);

  // Sincroniza o valor do scrubber quando a página externa mudar
  useEffect(() => {
    if (!isScrubbing) {
      setScrubberValue(currentPage);
    }
  }, [currentPage, isScrubbing]);

  const displayPage = isScrubbing ? scrubberValue : currentPage;
  const progressPercent = totalPages > 0 ? (displayPage / totalPages) * 100 : 0;

  const handleSliderChange = (e) => {
    e.stopPropagation();
    const val = parseInt(e.target.value, 10);
    setScrubberValue(val);
  };

  const handleSliderStart = (e) => {
    e.stopPropagation();
    setIsScrubbing(true);
  };

  const handleSliderCommit = (e) => {
    e.stopPropagation();
    setIsScrubbing(false);
    if (onPageSelect) {
      onPageSelect(scrubberValue);
    }
  };

  return (
    <nav className="reader-controls" aria-label="Controles de Navegação do Guia">
      {/* Botão Página Anterior */}
      <button
        type="button"
        className="control-btn control-btn-prev"
        onClick={onPrev}
        disabled={isFirst}
        aria-label="Página anterior"
        title="Página anterior"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Indicador Central de Página e Scrubber Interativo */}
      <div className="page-indicator-container">
        <div className="page-indicator-text">
          <span className="page-current">Página {displayPage}</span>
          <span className="page-divider">de</span>
          <span className="page-total">{totalPages}</span>
        </div>

        {/* Scrubber / Slider de Navegação Rápida */}
        <div className="scrubber-wrapper">
          <div className="scrubber-track" aria-hidden="true">
            <div
              className="scrubber-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <input
            type="range"
            min={1}
            max={totalPages || 33}
            value={scrubberValue}
            onChange={handleSliderChange}
            onPointerDown={handleSliderStart}
            onPointerUp={handleSliderCommit}
            onTouchStart={handleSliderStart}
            onTouchEnd={handleSliderCommit}
            onKeyDown={(e) => e.stopPropagation()}
            onKeyUp={handleSliderCommit}
            className="scrubber-input"
            aria-label="Deslizar para mudar de página rapidamente"
            aria-valuenow={displayPage}
            aria-valuemin={1}
            aria-valuemax={totalPages || 33}
            aria-valuetext={`Página ${displayPage} de ${totalPages}`}
          />

          {/* Tooltip flutuante exibido durante o arrasto */}
          {isScrubbing && (
            <div
              className="scrubber-tooltip"
              style={{ left: `calc(${progressPercent}% - 30px)` }}
              aria-hidden="true"
            >
              Pág. {scrubberValue}
            </div>
          )}
        </div>
      </div>

      {/* Botão Próxima Página */}
      <button
        type="button"
        className="control-btn control-btn-next"
        onClick={onNext}
        disabled={isLast}
        aria-label="Próxima página"
        title="Próxima página"
      >
        <ChevronRight size={24} />
      </button>
    </nav>
  );
}

export default Controls;
