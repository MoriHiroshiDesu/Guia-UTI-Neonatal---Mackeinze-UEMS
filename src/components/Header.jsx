import React from 'react';
import { HeartHandshake, ZoomIn, ZoomOut, Download } from 'lucide-react';
import pdfUrl from '/docs/pdf/guia-uti.pdf?url';
import '../styles/header.css';

export function Header({
  onZoomIn,
  onZoomOut,
  zoomScale = 1,
}) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="header-icon-wrapper" aria-hidden="true">
          <HeartHandshake className="header-icon" size={18} />
        </div>
        <div className="header-text">
          <h1 className="header-title">Guia UTI Neonatal</h1>
          <span className="header-subtitle">Mackenzie • UEMS</span>
        </div>
      </div>

      {/* Ações do cabeçalho: Download PDF e Zoom */}
      <div className="header-actions">
        <a
          href={pdfUrl}
          download="guia-uti-neonatal.pdf"
          className="header-download-btn"
          title="Baixar Guia completo em formato PDF"
          aria-label="Baixar Guia completo em formato PDF"
        >
          <Download size={16} className="download-icon" />
          <span className="download-btn-text">Baixar PDF</span>
        </a>

        {/* Controles de Zoom rápidos no topo */}
        <div className="zoom-toolbar" role="toolbar" aria-label="Controles de zoom do guia">
          <button
            type="button"
            className="zoom-tool-btn"
            onClick={onZoomOut}
            disabled={zoomScale <= 1.05}
            title="Diminuir zoom"
            aria-label="Diminuir zoom"
          >
            <ZoomOut size={16} />
          </button>

          <span className="zoom-level-text" title="Nível de ampliação atual">
            {zoomScale > 1.05 ? `${zoomScale.toFixed(1)}x` : '1x'}
          </span>

          <button
            type="button"
            className="zoom-tool-btn"
            onClick={onZoomIn}
            disabled={zoomScale >= 3.4}
            title="Aumentar zoom"
            aria-label="Aumentar zoom"
          >
            <ZoomIn size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
