import { isHTMLElement } from '@fluentui/react-utilities';

type ElementFilter = (node: HTMLElement) => number;

export class HTMLElementWalker {
  private _treeWalker: TreeWalker;
  private _filter: ElementFilter;

  constructor(root: HTMLElement, filter: ElementFilter) {
    const doc = root.ownerDocument;
    this._filter = filter;
    this._treeWalker = doc.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
      acceptNode: this.acceptNode,
    });
  }

  private acceptNode = (node: Node): number => {
    if (!isHTMLElement(node)) {
      return NodeFilter.FILTER_REJECT;
    }

    if (node.getAttribute('data-tabster-dummy')) {
      return NodeFilter.FILTER_REJECT;
    }

    return this._filter(node);
  };

  set filter(val: ElementFilter) {
    this._filter = val;
  }

  get filter(): ElementFilter {
    return this._filter;
  }

  get currentElement(): HTMLElement {
    return this._treeWalker.currentNode as HTMLElement;
  }

  set currentElement(val: HTMLElement) {
    this._treeWalker.currentNode = val;
  }

  get root(): HTMLElement {
    return this._treeWalker.root as HTMLElement;
  }

  firstChild(): HTMLElement | null {
    return this._treeWalker.firstChild() as HTMLElement | null;
  }
  lastChild(): HTMLElement | null {
    return this._treeWalker.lastChild() as HTMLElement | null;
  }
  nextElement(): HTMLElement | null {
    return this._treeWalker.nextNode() as HTMLElement | null;
  }
  nextSibling(): HTMLElement | null {
    return this._treeWalker.nextSibling() as HTMLElement | null;
  }
  parentElement(): HTMLElement | null {
    return this._treeWalker.parentNode() as HTMLElement | null;
  }
  previousElement(): HTMLElement | null {
    return this._treeWalker.previousNode() as HTMLElement | null;
  }
  previousSibling(): HTMLElement | null {
    return this._treeWalker.previousSibling() as HTMLElement | null;
  }
}
