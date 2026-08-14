# UI & Event Contracts: Leitor Interativo Page Flip

## 1. Contrato do Provedor de Páginas (`PageProvider`)

Interface responsável por escanear o diretório de páginas e fornecer a lista ordenada e validada.

```typescript
export interface PageProviderContract {
  /** Retorna a lista ordenada de todas as páginas detectadas */
  getPages(): PageItem[];
  
  /** Retorna o total de páginas no acervo */
  getTotalPages(): number;
  
  /** Pré-carrega na memória do navegador a imagem de uma página específica */
  preloadPage(pageIndex: number): Promise<void>;
  
  /** Pré-carrega um lote de páginas adjacentes (ex: atual - 1, atual + 1, atual + 2) */
  preloadAdjacentPages(currentPage: number, bufferRange?: number): void;
}
```

---

## 2. Contrato de Controle do Leitor (`ReaderController`)

Interface que os componentes de UI (botões, barra de progresso, atalhos de teclado) utilizam para comandar o folheto.

```typescript
export interface ReaderControllerContract {
  /** Vira para a próxima página */
  flipNext(): void;
  
  /** Vira para a página anterior */
  flipPrev(): void;
  
  /** Salta diretamente para um índice de página específico */
  goToPage(pageIndex: number): void;
  
  /** Notificação de evento quando uma virada de página é iniciada */
  onFlipStart(callback: (pageIndex: number) => void): void;
  
  /** Notificação de evento quando a página termina de virar */
  onFlipEnd(callback: (pageIndex: number) => void): void;
  
  /** Notificação de evento quando o estado muda */
  onStateChange(callback: (state: ReaderState) => void): void;
}
```

---

## 3. Contrato de Acessibilidade e Gestos

| Gesto / Ação | Gatilho | Resposta do Sistema |
| :--- | :--- | :--- |
| **Swipe Left (Arrastar p/ Esquerda)** | Touch drag > 30px ou velocidade rápida | Dispara `flipNext()` com física 3D |
| **Swipe Right (Arrastar p/ Direita)** | Touch drag > 30px ou velocidade rápida | Dispara `flipPrev()` com física 3D |
| **Tap Borda Direita** | Clique/Toque nos 15% laterais direitos | Dispara `flipNext()` suave |
| **Tap Borda Esquerda** | Clique/Toque nos 15% laterais esquerdos | Dispara `flipPrev()` suave |
| **Teclas Seta Direita / Esquerda** | Eventos `keydown` (ArrowRight / ArrowLeft) | Dispara `flipNext()` / `flipPrev()` |
