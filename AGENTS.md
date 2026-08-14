# Diretrizes para Agentes de IA (AGENTS.md)

Este documento contém as regras arquiteturais, metodologias e padrões operacionais inegociáveis para qualquer agente de IA que trabalhar neste repositório.

---

## 1. Visão Geral do Projeto

* **Nome do Projeto**: Guia UTI Neonatal (Mackenzie • UEMS)
* **Público-Alvo**: Mães, pais e familiares de recém-nascidos internados na UTI Neonatal (linguagem acolhedora, sem jargões desnecessários).
* **Objetivo**: Leitor digital interativo com efeito de folheação física (*Page Flip*), navegação fluida, zoom por gestos e carregamento rápido em redes hospitalares.

---

## 2. Metodologia: Spec-Driven Development (SDD) com Spec-Kit

Este repositório segue rigorosamente a abordagem **SDD** através do **Spec-Kit**:

1. **Ciclo de Features**: Toda nova funcionalidade, refatoração de grande porte ou conjunto de ajustes deve ter sua pasta de especificação sob `specs/<numero>-<nome-da-feature>/`:
   * `spec.md`: Cenários de usuário (*User Stories*), critérios de aceitação e *edge cases*.
   * `plan.md`: Decisões técnicas de arquitetura, estratégia de implementação e impacto nos arquivos.
   * `tasks.md`: Lista ordenada e acionável de tarefas com marcação de progresso `[x]`.
2. **Constituição**: As regras e princípios fundamentais definidos em `.specify/memory/constitution.md` têm prioridade máxima e devem ser respeitados em qualquer implementação.

---

## 3. Arquitetura e Regras Inegociáveis

1. **Deploy Estático (GitHub Pages)**:
   * A aplicação deve compilar para arquivos estáticos puros (HTML, CSS, JS). Não utilize servidores Node.js / SSR em runtime.
   * O arquivo `vite.config.js` deve manter `base: './'` para garantir que os assets funcionem em subdiretórios no GitHub Pages.
   * O deploy em produção é automático via GitHub Actions (`.github/workflows/deploy.yml`).
2. **Modularidade e Auto-Descoberta de Páginas**:
   * As páginas do guia residem em `docs/paginas/*.webp`.
   * O código **nunca** deve listar nomes de arquivos manualmente; a descoberta de páginas deve continuar dinâmica via `import.meta.glob('/docs/paginas/*.{webp,png,jpg,jpeg}')` no `pageService.js`.
   * A ordenação deve ser natural (extraída do padrão numérico do nome do arquivo).
3. **Licenciamento Open-Source (MIT)**:
   * Utilize apenas dependências livres com licença compatível com MIT.
4. **Experiência Mobile-First**:
   * O layout prioriza celulares (resoluções entre 360px e 430px de largura).
   * O folheto deve maximizar a área útil da tela mantendo respiro lateral de **8px**.
   * Suporte a gestos táteis: folheação suave, pinça para zoom (*pinch-to-zoom*), duplo toque e arrasto (*pan*) com zoom ativo.
   * Persistência da leitura via `localStorage` e hash da URL (`#page-X`).
   * Renderização nítida em alta definição (*High-DPI / Retina*).

---

## 4. Padrões de Git e Commits

1. **Commits Atômicos e Separados**:
   * **NUNCA execute `git add .` indiscriminadamente**.
   * Arquivos de skills/ferramentas (como `.agents/skills/` e `skills-lock.json`) **devem** ser commitados separadamente de alterações de código da aplicação.
2. **Convenção de Mensagens**:
   * Use o padrão Conventional Commits em português:
     * `feat(reader): ...` para novas funcionalidades do leitor.
     * `fix(reader): ...` para correções de bugs.
     * `chore(skills): ...` para instalação ou ajustes de skills/agentes.
     * `docs: ...` para documentações e specs.
