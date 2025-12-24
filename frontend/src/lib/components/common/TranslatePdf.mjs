// translate-pdf.mjs
export default class TranslatePDF {
  constructor(root, map) {
    if (!root) throw new Error('TranslatePDF: rootNode is required');
    this.root = root;
		const style = document.createElement('style');
		style.textContent = `
			 div:hover::-webkit-scrollbar {
					background: #f1f3f5;
			}
			
			div:hover::-webkit-scrollbar-thumb {
					background: linear-gradient(45deg, #4285f4, #34a853);
					border: 1px solid #f1f3f5;
			}
			 div::-webkit-scrollbar {
					width: 6px;
					height:6px;
					margin-left: 10px;
					background-color: transparent;
			}
			div::-webkit-scrollbar-track {
					background-color: transparent;
					border-radius: 4px;
			}
			div::-webkit-scrollbar-thumb {
					border-radius: 4px;
					/* 创建边框效果 */
			}
			div::-webkit-scrollbar-thumb:hover {
					background: #4285f4;
			}
			`;
		root.prepend(style);
    this.map  = Object.freeze(map || {});
    this.observer = null;
    this._translate(this.root);
    this._startObserver();
  }

  /* 私有方法 */
  _translate(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent;
      if (this.map[text]) { node.textContent = this.map[text]; return; }
      Object.keys(this.map).forEach(k => {
        text = text.replace(new RegExp(k, 'g'), this.map[k]);
      });
      node.textContent = text;
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      ['aria-label', 'title', 'placeholder'].forEach(attr => {
        if (node.hasAttribute?.(attr)) {
          let val = node.getAttribute(attr);
          Object.keys(this.map).forEach(k => {
            val = val.replace(new RegExp(k, 'g'), this.map[k]);
          });
          node.setAttribute(attr, val);
        }
      });
    }
    node.childNodes.forEach(n => this._translate(n));
  }

  _startObserver() {
    this.observer = new MutationObserver(ms => {
      this.observer.disconnect();
      ms.forEach(m => {
        if (m.type === 'childList') m.addedNodes.forEach(n => this._translate(n));
        if (m.type === 'characterData') this._translate(m.target);
      });
      this._observe();
    });
    this._observe();
  }

  _observe() {
    this.observer?.observe(this.root, { childList: true, subtree: true, characterData: true });
  }

  /* 公开方法 */
  destroy() {
    this.observer?.disconnect();
    this.observer = this.root = this.map = null;
  }
}