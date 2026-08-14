# Implementation Tasks: Download do Guia em PDF

**Feature**: Download do Guia em PDF
**Related Plan**: [plan.md](./plan.md)
**Status**: In Progress

## Tasks

- [x] 1. Importar `Download` de `lucide-react` e o asset `/docs/pdf/guia-uti.pdf?url` em `src/components/Header.jsx`.
- [x] 2. Adicionar o link/botão acessível de download de PDF no cabeçalho com `download="guia-uti-neonatal.pdf"`.
- [x] 3. Atualizar `src/styles/header.css` com o layout de `.header-actions` e estilização do botão `.header-download-btn` (com glassmorphism, hover/active states, e responsividade desktop/mobile).
- [x] 4. Validar o build de produção (`npm run build`) para assegurar que o PDF seja copiado e linkado corretamente.
- [x] 5. Testar e validar a interface no Playwright em resoluções mobile e desktop.
