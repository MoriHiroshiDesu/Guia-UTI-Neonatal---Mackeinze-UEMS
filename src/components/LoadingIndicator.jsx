import React from 'react';
import '../styles/loading.css';

export function LoadingIndicator({ message = 'Carregando o guia com carinho...' }) {
  return (
    <div className="loading-container fade-in" role="status" aria-live="polite">
      <div className="loading-spinner-ring" />
      <p className="loading-text">{message}</p>
    </div>
  );
}
