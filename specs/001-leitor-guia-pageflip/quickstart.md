# Quickstart & Validation Guide: Leitor Interativo Page Flip

Guia de execução e validação ponta a ponta da feature.

## 1. Pré-requisitos

- **Node.js**: versão 18+ ou 20+ instalada
- **NPM**: versão 9+
- **Navegador**: Chrome, Firefox, Safari ou Edge (com DevTools em modo mobile)

## 2. Comandos de Configuração e Execução

```bash
# 1. Instalar dependências do projeto
npm install

# 2. Iniciar servidor de desenvolvimento local
npm run dev

# 3. Validar build estático para GitHub Pages
npm run build

# 4. Pré-visualizar a versão de produção estática localmente
npm run preview
```

## 3. Roteiro de Testes e Validação Manual (Cenários de Aceitação)

### Cenário 1: Carregamento Inicial no Celular
1. Abra o navegador em `http://localhost:5173/` (ou porta indicada pelo Vite).
2. Abra as Ferramentas de Desenvolvedor (F12) e ative a emulação mobile (ex: iPhone 14 / Pixel 7).
3. **Resultado Esperado**:
   - A capa do guia (`pagina-01.webp`) é exibida centralizada sem cortes.
   - O contador de páginas exibe `Página 1 de 33`.
   - O botão "Anterior" está desabilitado.

### Cenário 2: Virada de Página por Toque / Gesto (Page Flip)
1. Clique e arraste o canto inferior direito da página em direção à esquerda (ou dê um toque na lateral direita).
2. **Resultado Esperado**:
   - A página dobra realisticamente com sombra 3D e vira para a `pagina-02.webp`.
   - O contador atualiza instantaneamente para `Página 2 de 33`.
   - O botão "Anterior" passa a ficar habilitado.

### Cenário 3: Navegação por Botões de Acessibilidade
1. Clique no botão "Próxima" no controle inferior repetidas vezes.
2. **Resultado Esperado**:
   - Cada clique avança uma página com animação consistente.
   - Ao chegar na página 33 (`pagina-33.webp`), o botão "Próxima" fica desabilitado.

### Cenário 4: Validação de Build Estático para GitHub Pages
1. Execute `npm run build`.
2. Verifique o diretório gerado (`dist/`):
   - Deve conter `index.html`, pasta `assets/` e imagens WebP sem erros de caminho absoluto (caminhos relativos `./` preservados).
