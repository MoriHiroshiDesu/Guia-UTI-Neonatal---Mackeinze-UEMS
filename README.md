# 📖 Guia de Orientação aos Acompanhantes da UTI Neonatal
### Hospital Evangélico Mackenzie • UEMS (PPGES)

[![Deploy to GitHub Pages](https://github.com/MoriHiroshiDesu/Guia-UTI-Neonatal---Mackeinze-UEMS/actions/workflows/deploy.yml/badge.svg)](https://github.com/MoriHiroshiDesu/Guia-UTI-Neonatal---Mackeinze-UEMS/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](https://opensource.org/licenses/MIT)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB.svg?logo=react&logoColor=black)](https://react.dev/)

Leitor digital interativo e acolhedor do **Guia de Orientação aos Acompanhantes da UTI Neonatal**, desenvolvido para mães, pais e familiares de recém-nascidos internados na Unidade de Terapia Intensiva Neonatal do Hospital Evangélico Dr. e Sra. Goldsby King (Mackenzie), em parceria com a Universidade Estadual de Mato Grosso do Sul (UEMS) através do Programa de Pós-Graduação em Ensino em Saúde (PPGES).

---

## 🌟 Funcionalidades e Destaques

* 📖 **Efeito de Folheação Realista (*Page Flip*)**: Simulação física de virada de páginas de livro com sombras táteis de papel e curvatura de lombada.
* 🖥️ **Experiência Desktop Dinâmica**: Abertura animada com capa fechada centralizada na página 1, transição fluida para exibição de página dupla (*spread*) e fechamento na contracapa.
* 📱 **Mobile-First & Gestos Táteis**: Otimizado para navegação com toques, gestos de arrasto, *pinch-to-zoom* (pinça) e duplo toque.
* 🔍 **Sistema de Zoom Avançado**: Suporte a ampliação tátil e controles rápidos no topo (`+`, `-`, `1x`), com navegação por arrasto (*pan*) quando ampliado.
* 🎛️ **Scrubber / Slider de Navegação Rápida**: Navegação por qualquer uma das 33 páginas com indicador em tempo real e visualização de progresso.
* 📥 **Download do PDF Completo**: Acesso direto ao documento original em formato PDF de alta resolução para leitura offline e impressão.
* 🌌 **Ambiente Atmosférico Imersivo (*Aurora Effect*)**: Fundo dinâmico com iluminação orgânica em tons suaves de roxo, rosa, lilás e lavanda, perfeitamente harmonizados com a paleta do livro.
* ⚡ **Descoberta Dinâmica de Páginas**: Carregamento automático e otimizado em formato WebP de alta definição sem necessidade de listas estáticas de arquivos.

---

## 🛠️ Tecnologias Utilizadas

* **[React 18](https://react.dev/)**: Interface declarativa e componentizada.
* **[Vite 5](https://vitejs.dev/)**: Build tool ultrarrápido com auto-descoberta dinâmica de assets (`import.meta.glob`).
* **[PageFlip (StPageFlip)](https://nodegarden.github.io/page-flip/)**: Motor de física para renderização de folheação em 2D/3D no Canvas/DOM.
* **[Lucide React](https://lucide.dev/)**: Conjunto de ícones leves e consistentes.
* **Vanilla CSS Moderno**: Sistema de design baseado em tokens, efeitos de *glassmorphism*, variáveis nativas e micro-animações em 60fps.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
* **Node.js**: versão 18 ou superior.
* **npm**: gerenciador de pacotes incluído no Node.js.

### Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/MoriHiroshiDesu/Guia-UTI-Neonatal---Mackeinze-UEMS.git
   cd Guia-UTI-Neonatal---Mackeinze-UEMS
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a aplicação no navegador em `http://localhost:5173`.

4. **Gerar build de produção:**
   ```bash
   npm run build
   ```

5. **Testar build localmente:**
   ```bash
   npm run preview
   ```

---

## 🚢 Deploy Contínuo

O projeto é compilado para arquivos estáticos puros (HTML, CSS e JavaScript) e publicado automaticamente no **GitHub Pages** a cada push ou merge na branch `main` via GitHub Actions (`.github/workflows/deploy.yml`).

---

## 👥 Créditos e Autoria

* **Organização**: Caroline Santos (Enfermeira especialista em saúde da criança e mestranda PPGES/UEMS)
* **Orientação**: Profa. Dra. Vivian Rahmeier Fietz (Docente permanente PPGES/UEMS)
* **Instituições**:
  * Hospital Evangélico Dr. e Sra. Goldsby King (Mackenzie)
  * Universidade Estadual de Mato Grosso do Sul (UEMS) — Mestrado Profissional em Ensino em Saúde (PPGES)
* **Local e Ano**: Dourados - MS, 2026

---

## 📄 Licença

Este projeto está licenciado sob a licença [MIT](LICENSE).
