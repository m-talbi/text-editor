import { EditorState, Format } from "../types";
import CaretUtils from "../utils/caret/caretUtils";

class CommandContext {
  public editable: HTMLDivElement;
  private commandStartOffset: number = -1;
  private formatsList: Format[];

  constructor(contentEditableRef: HTMLDivElement, state: EditorState) {
    this.editable = contentEditableRef;
    this.formatsList = state.formats;
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
    const {range} = CaretUtils.getRange();
    const endOffset = CaretUtils.getCommandEndOffset(
      this.commandStartOffset,
      range
    );

    if (this.commandStartOffset != -1 && this.commandStartOffset == endOffset) {
      this.commandStartOffset = -1;
      return;
    }

    switch (ev.key) {
      case "Enter":
        // check if caret is between "/" and the last character of command
        if (
          range &&
          range.startOffset > this.commandStartOffset &&
          range.endOffset <= endOffset
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
        if (range) {
          this.commandStartOffset = range.startOffset;
        }
    }
  }

  public filterFormats(search: string, state: EditorState): number {
    state.formats = this.formatsList.filter((format) =>
      format.format.toLowerCase().includes(search.slice(1))
    );
    state.itemIndex = 1;

    return state.formats[state.itemIndex - 1]?.id;
  }
}

export default CommandContext;
