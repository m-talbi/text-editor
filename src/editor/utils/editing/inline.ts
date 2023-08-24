import CaretUtils from "../caret/caretUtils";

class Inline {
  public static breakLineAtCaret(parentNode: HTMLDivElement): void {
    const { node, selection, range } = CaretUtils.getNodeAtCursor() as {
      node: HTMLElement;
      selection: Selection;
      range: Range;
    };

    const br = document.createElement("br");

    if (parentNode != node) {
      this.splitElementAtCursorAndInsertNode(br, node, selection);
    } else {
      range.insertNode(br);
    }

    range.setStartAfter(br);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  public static addElementAtCaret(tag: string, classes: string[], parentNode: HTMLDivElement): void {
    const { node, selection, range } = CaretUtils.getNodeAtCursor() as {
      node: HTMLElement;
      selection: Selection;
      range: Range;
    };

    const elem = document.createElement(tag);
    elem.classList.add(...classes);

    if (parentNode != node) {
      this.splitElementAtCursorAndInsertNode(elem, node, selection);
    } else {
      range.insertNode(elem);
    }

    const textNode = document.createTextNode("\0");
    elem.appendChild(textNode);
    range.selectNodeContents(textNode);
    //range.setStartAfter(textNode);
    CaretUtils.restoreCaretPosition(parentNode, range);
  }

  private static splitElementAtCursorAndInsertNode(
    nodeTobeInserted: HTMLElement,
    element: HTMLElement,
    selection: Selection
  ): void {
    const nodeContent = element.textContent || "";
    const caretIndex = selection.focusOffset;
    const nodeHtmlTag = element.nodeName;

    const nodeBeforeCaret = document.createElement(nodeHtmlTag);
    const nodeAfterCaret = document.createElement(nodeHtmlTag);

    nodeBeforeCaret.textContent = nodeContent.substring(0, caretIndex);
    nodeAfterCaret.textContent = nodeContent.substring(caretIndex);

    if (nodeBeforeCaret.textContent.length != 0)
      element.parentNode?.insertBefore(nodeBeforeCaret, element);

    element.parentNode?.insertBefore(nodeTobeInserted, element);

    if (nodeAfterCaret.textContent.length != 0)
      element.parentNode?.insertBefore(nodeAfterCaret, element.nextSibling);

    element.remove();
  }
}

export default Inline;