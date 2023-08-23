import CaretUtils from "./utils/caret/caretUtils";

interface Format {
  format: string;
  tag: string;
  shortcut: string;
  classes: string[];
}

class Editor {
  private contentEditable: HTMLDivElement;

  constructor(contentEditableRef: HTMLDivElement) {
    this.contentEditable = contentEditableRef;
    this.initEventListeners();
  }

  private initEventListeners() {
    this.contentEditable.addEventListener("paste", this.pasteAsPlainText);
  }

  public onInput(callback: (e: KeyboardEvent) => void): void {
    this.contentEditable.addEventListener("keydown", (e) => {
      callback(e as KeyboardEvent);
      this.resetOnEmptyContent(e);
    });
  }

  public addElementAtCaret(format: Format): void {
    const { node, selection, range } = CaretUtils.getNodeAtCursor() as {
      node: HTMLElement;
      selection: Selection;
      range: Range;
    };

    const elem = document.createElement(format.tag);
    elem.classList.add(...format.classes);

    if (this.contentEditable != node) {
      this.splitElementAtCursorAndInsertNode(elem, node, selection);
    } else {
      range.insertNode(elem);
    }

    const textNode = document.createTextNode("\0");
    elem.appendChild(textNode);
    range.selectNodeContents(textNode);
    //range.setStartAfter(textNode);
    this.restoreCaret(range);
  }

  public breakLineAtCaret(ev: React.KeyboardEvent): void {
    ev.preventDefault();

    const { node, selection, range } = CaretUtils.getNodeAtCursor() as {
      node: HTMLElement;
      selection: Selection;
      range: Range;
    };

    const br = document.createElement("br");

    if (this.contentEditable != node) {
      this.splitElementAtCursorAndInsertNode(br, node, selection);
    } else {
      range.insertNode(br);
    }

    range.setStartAfter(br);
    range.setEndAfter(br);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  public deleteCommand(currentRange: Range | undefined, command: string): void {
    if (!currentRange) return;

    const start = currentRange.startOffset;
    const end = currentRange.startOffset + command.length;

    CaretUtils.deleteText(
      start,
      end,
    );
  }

  public restoreCaret(range: Range): void {
    CaretUtils.restoreCaretPosition(this.contentEditable, range);
  }

  private splitElementAtCursorAndInsertNode(
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

  private resetOnEmptyContent(e: Event) {
    const target = e.target as Element;
    const value = target.innerHTML;
    (value === "<br>" || value === "<div><br></div>") &&
      (target.innerHTML = "<br>");
  }

  private pasteAsPlainText(e: ClipboardEvent) {
    const { clipboardData, preventDefault } = e;
    preventDefault();
    const text = clipboardData?.getData("text/plain") || "";
    this.contentEditable.innerText = text;
  }
}

export default Editor;
