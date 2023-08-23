class CaretUtils {
  static getNodeAtCursor(): {
    node: HTMLElement | Node | null;
    selection: Selection | null;
    range: Range | null;
  } {
    const selection = window.getSelection();
    if (!selection) {
      return { node: null, selection: null, range: null };
    }

    const range = selection.getRangeAt(0);
    let node = selection.anchorNode;

    if (!node) {
      node = range.commonAncestorContainer;
    }

    if (node) return {
        node: node.nodeName == "#text" ? node.parentNode : node,
        selection,
        range,
      };

    return { node: null, selection: null, range: null };
  }

  static getCaretRect(node: HTMLElement): { x: number; y: number } {
    const isSupported = typeof window.getSelection !== "undefined";

    if (isSupported) {
      const currentRange = this.getRange();
      const selection = window.getSelection() as Selection;

      if (selection.rangeCount !== 0 && currentRange) {
        const range = selection.getRangeAt(0);
        const temp = document.createTextNode("\0");
        range.insertNode(temp);
        const { x, y } = range.getBoundingClientRect();
        temp.parentNode?.removeChild(temp);
        this.restoreCaretPosition(node, currentRange);
        return { x, y };
      }
    }

    return { x: 0, y: 0 };
  }

  public static getRange(): Range | undefined {
    const selection = window.getSelection() as Selection;
    if (selection.rangeCount > 0) {
      return selection.getRangeAt(0).cloneRange();
    }
  }

  public static deleteText(startOffset: number, endOffset: number): void {
    const selection = window.getSelection() as Selection;
    const range = selection.getRangeAt(0);
    range.setStart(range.commonAncestorContainer, startOffset);
    range.setEnd(range.commonAncestorContainer, endOffset);
    range.deleteContents();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  public static restoreCaretPosition(node: HTMLElement, range: Range): void {
    if (range && node) {
      const selection = window.getSelection() as Selection;
      //range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
      node.focus();
    }
  }
}

export default CaretUtils;
