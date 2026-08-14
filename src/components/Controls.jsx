import React from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import '../styles/controls.css';

export function Controls({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  onFirstPage,
}) {
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;
  const progressPercent = totalPages > 0 ? (currentPage / totalPages) * 100 : 0;

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

      {/* Indicador Central de Página e Progresso */}
      <div className="page-indicator-container">
        <div className="page-indicator-text">
          <span className="page-current">Página {currentPage}</span>
          <span className="page-divider">de</span>
          <span className="page-total">{totalPages}</span>
        </div>
        
        {/* Barra de Progresso Visual */}
        <div className="progress-bar-track" aria-hidden="true">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
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
