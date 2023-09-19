import CaretUtils from "./utils/caret/caretUtils";
import Inline from "./utils/editing/inline";

interface Format {
  format: string;
  tag: string;
  shortcut: string;
  classes: string[];
}

class Editor {
  public contentEditable: HTMLDivElement;

  constructor(contentEditableRef: HTMLDivElement) {
    this.contentEditable = contentEditableRef;
    this.handlePasting();
  }

  public AddNode(format: Format): void {
    Inline.addElementAtCaret(format.tag, format.classes, this.contentEditable);
  }

  public breakLine(ev: React.KeyboardEvent): void {
    ev.preventDefault();
    Inline.breakLineAtCaret(this.contentEditable);
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

  public resetOnEmptyContent(e: any) {
    const target = e.target as Element;
    const value = target.innerHTML;
    console.log(target);

    (value === "<br>" || value === "<div><br></div>") &&
      (target.innerHTML = "<br>");
  }

  private handlePasting() {
    this.contentEditable.addEventListener("paste", this.pasteAsPlainText);
  }

  private pasteAsPlainText(ev: any): void {
    ev.preventDefault();
    const text = ev.clipboardData?.getData("text/plain") || "";
    document.execCommand("insertText", false, text);
  }
}

export default Editor;
