import React from 'react';
import '../styles/aurora.css';

export function AuroraBackground() {
  return (
    <div className="aurora-container" aria-hidden="true">
      <div className="aurora-layer aurora-1"></div>
      <div className="aurora-layer aurora-2"></div>
      <div className="aurora-layer aurora-3"></div>
      <div className="aurora-layer aurora-4"></div>
      <div className="aurora-noise"></div>
    </div>
  );
}
