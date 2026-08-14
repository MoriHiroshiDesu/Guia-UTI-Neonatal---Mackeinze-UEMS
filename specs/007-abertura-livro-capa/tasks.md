# Implementation Tasks: Efeito de Livro Aberto e Capa

**Feature**: Efeito de Livro Aberto e Capa
**Related Plan**: [plan.md](./plan.md)
**Status**: In Progress

## Tasks

- [x] 1. Atualizar `src/components/FlipBook.jsx` para receber `currentPage` e atualizar dinamicamente a posição do container (`.flipbook-mount`) com base na página atual (capa = `-25%`, páginas internas = `0%`, contracapa = `+25%` quando em desktop).
- [x] 2. Atualizar `src/styles/flipbook.css` removendo o fundo branco fixo de `.flipbook-mount`, adicionando sombras realistas nas páginas e transição suave de `transform` no `.flipbook-mount`.
- [x] 3. Atualizar `src/App.jsx` para garantir que `currentPage` seja passado como prop para `FlipBook`.
- [x] 4. Validar o build de produção (`npm run build`).
- [x] 5. Testar e inspecionar visualmente com o Playwright no modo Desktop e no modo Mobile.
