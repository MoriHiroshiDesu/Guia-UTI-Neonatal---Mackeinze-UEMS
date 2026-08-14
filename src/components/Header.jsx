import React from 'react';
import { HeartHandshake } from 'lucide-react';
import '../styles/header.css';

export function Header() {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="header-icon-wrapper" aria-hidden="true">
          <HeartHandshake className="header-icon" size={20} />
        </div>
        <div className="header-text">
          <h1 className="header-title">Guia UTI Neonatal</h1>
          <span className="header-subtitle">Mackenzie • UEMS</span>
        </div>
      </div>
    </header>
  );
}
