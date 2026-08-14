# Data Model: Leitor Interativo Page Flip

## Entidades Principais

### 1. `PageItem` (Página Individual do Guia)
Representa uma página do folheto carregada a partir do acervo de imagens.

| Campo | Tipo | Descrição | Regras de Validação |
| :--- | :--- | :--- | :--- |
| `index` | `number` | Índice sequencial da página (1 a N) | Obrigatório, inteiro >= 1 |
| `src` | `string` | URL/Path do arquivo WebP da página | Obrigatório, caminho válido de imagem |
| `filename` | `string` | Nome do arquivo (ex: `pagina-01.webp`) | Formato `pagina-XX.webp` |
| `title` | `string` | Rótulo acessível da página (ex: "Página 1") | Gerado automaticamente |
| `isCover` | `boolean` | Indica se é a capa inicial (página 1) | `index === 1` |
| `isBackCover` | `boolean` | Indica se é a contracapa final (página 33) | `index === totalPages` |

---

### 2. `ReaderState` (Estado do Leitor)
Representa o estado de execução da sessão de leitura.

| Campo | Tipo | Descrição | Regras de Validação |
| :--- | :--- | :--- | :--- |
| `currentPage` | `number` | Índice da página atualmente em foco | `1 <= currentPage <= totalPages` |
| `totalPages` | `number` | Quantidade total de páginas detectadas | `>= 1` (33 páginas no acervo inicial) |
| `isFlipping` | `boolean` | Indica se uma animação de virada está em curso | Booleano |
| `orientation` | `'portrait' \| 'landscape'` | Orientação da tela do usuário | Calculada dinamicamente via viewport |
| `isLoading` | `boolean` | Indica carregamento inicial dos assets | Booleano |

---

### 3. `FlipConfig` (Configuração do Mecanismo de Page Flip)
Parâmetros de física e renderização do componente.

| Parâmetro | Tipo | Valor Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `width` | `number` | `375` (ou calculado) | Largura base da folha |
| `height` | `number` | `600` (ou calculado) | Altura base da folha respeitando aspect-ratio |
| `size` | `string` | `'stretch'` | Ajuste elástico proporcional ao container pai |
| `minWidth` | `number` | `300` | Largura mínima de renderização |
| `maxWidth` | `number` | `600` | Largura máxima em mobile |
| `showCover` | `boolean` | `true` | Trata primeira e última como capas |
| `mobileScrollSupport` | `boolean` | `true` | Permite interação por touch/swipe sem interferência |
| `flippingTime` | `number` | `600` (ms) | Duração suave da animação de virada |
