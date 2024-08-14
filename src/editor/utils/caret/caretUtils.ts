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

  static getCaretRect(): { x: number; y: number } {
    const selection = window.getSelection() as Selection;
    const currentRange = selection.getRangeAt(0);

    if (selection.rangeCount !== 0 && currentRange) {
      const range = selection.getRangeAt(0);
      const temp = document.createTextNode("\0");
      range.insertNode(temp);
      const { x, y } = range.getBoundingClientRect();
      temp.parentNode?.removeChild(temp);
      currentRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(currentRange);
      return { x, y };
    }

    return { x: 0, y: 0 };
  }

  public static getRange(): { selection: Selection | undefined, range: Range | undefined } {
    const selection = window.getSelection() as Selection;
    if (selection.rangeCount > 0) {
      return { selection, range: selection.getRangeAt(0).cloneRange()};
    }
    return { selection: undefined, range: undefined };
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

  public static copyText(startOffset: number): string {
    const selection = window.getSelection() as Selection;
    const text: Array<string> = [];
    let endOffset = startOffset;
    if (selection.focusNode?.textContent) {
      for (; selection.focusNode.textContent[endOffset]; endOffset++) {
        text.push(selection.focusNode.textContent[endOffset]);
      };
    }
    return text.join("");
  }

  public static getCommandEndOffset(startOffset: number, range: Range | undefined) {
    let endOffset = startOffset;
    if (range?.startContainer?.textContent) {
      for (; range.startContainer.textContent[endOffset] &&
            range.startContainer.textContent[endOffset] !== " "; endOffset++) {};
    }
    return endOffset;
  }

  public static deleteCommand(startOffset: number): void {
    const selection = window.getSelection() as Selection;
    const range = selection.getRangeAt(0);
    let endOffset = startOffset;
    if (selection.focusNode?.textContent) {
      for (; selection.focusNode.textContent[endOffset]; endOffset++) {};
    }
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
