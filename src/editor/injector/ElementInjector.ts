import { EditorState, Format } from "../types";
import CaretUtils from "../utils/caret/caretUtils";
import Inline from "../utils/editing/inline";
import { Block, BlockElement } from "../utils/elements/Block";

class ElementInjector {
  private editableEl: HTMLDivElement;

  constructor(editableEl: HTMLDivElement) {
    this.editableEl = editableEl;
    const block = Block("span", "Hello World");
    this.editableEl.insertAdjacentElement("beforeend", block);
    this.handlePasting();
  }

  public handleInput(ev: React.SyntheticEvent, state: EditorState) {
    //console.log(ev);
  }

  public handleKeypress(ev: React.KeyboardEvent<HTMLDivElement>, state: EditorState) {
    switch (ev.key) {
      case "Enter":
        if (state.shouldMenuClose) break;

        ev.preventDefault();
        if (ev.shiftKey) {
          this.insertInline(ev);
          break;
        }
        this.insertNewLine();
        break;
      case "Backspace":
        const { selection, range } = CaretUtils.getRange();
        if (selection && range) {
          if (!range.startContainer.previousSibling && range.startOffset == 0) {
            let el = range.startContainer as HTMLElement;
            const parentBlock = el.parentElement?.closest(".block");
            if (parentBlock?.previousSibling) {
              ev.preventDefault();
              const prev = parentBlock?.previousSibling as HTMLElement;
              const container = prev.querySelector(".inner-block-container");
              //debugger
              while (el) {
                console.log(el);
                container?.appendChild(el);
                el = el.nextSibling as HTMLElement;
              }
              parentBlock.remove();
            }
          }
        }
    }
  }

  public breakLine(ev: React.KeyboardEvent): void {
    ev.preventDefault();
    Inline.breakLineAtCaret(this.editableEl);
  }

  public AddNode(format: Format): void {
    Inline.addElementAtCaret(format.tag, format.classes, this.editableEl);
  }

  public insertInline(ev: any) {

  }

  private insertNewLine() {
    const { selection, range } = CaretUtils.getRange();

    const el = range?.commonAncestorContainer as Text;
    if (range && selection && el.nodeName === "#text") {
      const temp = el.substringData(range.startOffset, el.length - range.startOffset);
      el.textContent = el.substringData(0, range.startOffset);
      const parent = el.parentElement?.closest(".block");
      if (parent) {
        const block = Block("span", temp);
        parent.after(block);
        const textNode = block.querySelector(".block-element") as Element;
        range.setStart(textNode, 0);
        range.setEnd(textNode, 0);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }

  public resetOnEmptyContent(e: any) {
    const target = e.target as Element;
    const value = target.innerHTML;

    (value === "<br>" || value === "<div><br></div>") &&
      (target.innerHTML = "<br>");
  }

  private handlePasting() {
    this.editableEl.addEventListener("paste", this.pasteAsPlainText);
  }

  private pasteAsPlainText(ev: any): void {
    ev.preventDefault();
    const text = ev.clipboardData?.getData("text/plain") || "";
    document.execCommand("insertText", false, text);
  }
}

export default ElementInjector;