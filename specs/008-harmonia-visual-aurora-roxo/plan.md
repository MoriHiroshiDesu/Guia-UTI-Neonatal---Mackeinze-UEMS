# Implementation Plan: Harmonia Visual com Roxo das Páginas e Intensificação da Aurora

**Feature**: Harmonia Visual com Roxo das Páginas e Intensificação da Aurora
**Related Spec**: [spec.md](./spec.md)

## Architecture & Technical Approach

### 1. Sistema de Design e Variáveis Globais (`src/styles/index.css`)
- Atualizar as variáveis de `:root` para ancorar a identidade visual nos tons de roxo do guia:
  - `--color-bg`: `#eae5f2` (lilás suave e caloroso)
  - `--color-bg-gradient`: radial suave com tons de lavanda e lilás
  - `--color-text-main`: `#21182c` (ameixa profundo de alta legibilidade)
  - `--color-text-muted`: `#685f73` (lavanda acinzentado sereno)
  - `--color-brand-primary`: `#6b28a8` (roxo nobre correspondente aos títulos das páginas)
  - `--color-brand-primary-hover`: `#561c8a`
  - `--color-brand-light`: `#ede8fa` (lavanda claro para botões e fundos)
  - `--color-brand-accent`: `#d946ef` / `#c026d3` (rosa/magenta acolhedor)
  - `--color-border`: `rgba(107, 40, 168, 0.16)`
  - `--color-border-subtle`: `rgba(107, 40, 168, 0.08)`
  - `--shadow-book`: profundidade tátil com oclusão ambiente levemente arroxeada (`rgba(60, 20, 95, 0.22)`)

### 2. Efeito Aurora Dinâmico e Intenso (`src/styles/aurora.css`)
- Reconfigurar as 4 camadas da Aurora com paletas de roxo, rosa, fúcsia, lilás e lavanda:
  - Layer 1 (Canto Superior Esquerdo): Roxo Violeta Profundo (`rgba(124, 58, 237, 0.85)`)
  - Layer 2 (Topo / Direita): Rosa Magenta Floral (`rgba(236, 72, 153, 0.8)`)
  - Layer 3 (Fundo Direita): Lilás / Pêssego Rosado (`rgba(192, 132, 252, 0.75)`)
  - Layer 4 (Fundo Esquerda): Lavanda Luminosa (`rgba(168, 85, 247, 0.75)`)
- Aumentar saturação para `saturate(145%)` e opacidade geral para `0.9` garantindo presença viva sem poluição visual.

### 3. Controles de Leitura e Scrubber (`src/styles/controls.css`)
- Botões de navegação `.control-btn` com fundo `--color-brand-light` (`#ede8fa`) e ícone `--color-brand-primary` (`#6b28a8`).
- Hover nos botões com transição para lavanda mais intenso (`#ddd6fe`) e elevação suave.
- Scrubber track com translucidez roxa (`rgba(107, 40, 168, 0.14)`).
- Scrubber fill com gradiente roxo linear (`linear-gradient(90deg, #6b28a8, #a855f7)`).
- Scrubber thumb com anel de borda roxa e sombra com halo púrpura.
- Indicador de página com destaque do número atual em `--color-brand-primary`.

### 4. Cabeçalho e Ações (`src/styles/header.css` & `src/styles/zoom.css`)
- Botão "Baixar PDF" com tipografia e ícone em `--color-brand-primary` e borda adaptada.
- Toolbar de Zoom com ícones e hover integrados ao tema roxo.
- Badge flutuante de zoom reset e loading spinner com anel em roxo.

## Impact Analysis

- `src/styles/index.css`: Atualização das variáveis globais CSS.
- `src/styles/aurora.css`: Atualização dos gradientes, filtros e opacidades da Aurora.
- `src/styles/controls.css`: Refinamento de cores de botões, scrubber e indicador.
- `src/styles/header.css`: Harmonização do botão de download e ícones.
- `src/styles/zoom.css`: Harmonização do zoom toolbar e badge.
- `src/styles/flipbook.css`: Sombra de vinco de página ajustada.

## Rollback Plan

Reverter as alterações nos arquivos CSS se houver qualquer divergência visual indesejada.
