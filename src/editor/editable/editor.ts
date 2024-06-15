import CaretUtils from "../utils/caret/caretUtils";
import Inline from "../utils/editing/inline";

interface Format {
  format: string;
  tag: string;
  shortcut: string;
  classes: string[];
  id: number;
}

interface EditorState {
  command: string;
  isMenuOpen: boolean;
  itemIndex: number;
  itemId: number;
  formats: Format[];
}

class Editor {
  public editable: HTMLDivElement;
  private commandStartOffset: number = -1;
  private formatsList: Format[];

  constructor(contentEditableRef: HTMLDivElement, state: EditorState) {
    this.editable = contentEditableRef;
    this.formatsList = state.formats;
    this.handlePasting();
  }

  public handleInput(state: EditorState) {
    if (this.commandStartOffset > -1) {
      state.command = CaretUtils.copyText(this.commandStartOffset);
      state.itemId = this.filterFormats(state.command, state);
    }
  }

  public handleKeypress(
    ev: React.KeyboardEvent<HTMLDivElement>,
    state: EditorState
  ) {
    const r = CaretUtils.getRange() as Range;
    const endOffset = CaretUtils.getCommandEndOffset(
      this.commandStartOffset,
      r
    );

    if (this.commandStartOffset != -1 && this.commandStartOffset == endOffset) {
      this.commandStartOffset = -1;
      return;
    }

    switch (ev.key) {
      case "Enter":
        // check if caret is between "/" and the last character of command
        if (
          r.startOffset > this.commandStartOffset &&
          r.endOffset <= endOffset
        ) {
          ev.preventDefault();
          CaretUtils.deleteText(this.commandStartOffset, endOffset);
          state.command = "";
          this.commandStartOffset = -1;
        }
        break;
      case "Escape":
        state.command = "";
        this.commandStartOffset = -1;
        break;
      case "/":
        this.commandStartOffset = r.startOffset;
    }
  }

  public filterFormats(search: string, state: EditorState): number {
    state.formats = this.formatsList.filter((format) =>
      format.format.toLowerCase().includes(search.slice(1))
    );
    state.itemIndex = 1;

    return state.formats[state.itemIndex - 1]?.id;
  }

  public breakLine(ev: React.KeyboardEvent): void {
    ev.preventDefault();
    Inline.breakLineAtCaret(this.editable);
  }

  public AddNode(format: Format): void {
    Inline.addElementAtCaret(format.tag, format.classes, this.editable);
  }

  public resetOnEmptyContent(e: any) {
    const target = e.target as Element;
    const value = target.innerHTML;

    (value === "<br>" || value === "<div><br></div>") &&
      (target.innerHTML = "<br>");
  }

  private handlePasting() {
    this.editable.addEventListener("paste", this.pasteAsPlainText);
  }

  private pasteAsPlainText(ev: any): void {
    ev.preventDefault();
    const text = ev.clipboardData?.getData("text/plain") || "";
    document.execCommand("insertText", false, text);
  }
}

export default Editor;
