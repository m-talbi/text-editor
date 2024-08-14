import CaretUtils from "../utils/caret/caretUtils";
import Inline from "../utils/editing/inline";

interface Format {
  format: string;
  tag: string;
  shortcut: string;
  classes: string[];
}

export const AddNode = (format: Format, editable: HTMLDivElement) => {
  Inline.addElementAtCaret(format.tag, format.classes, editable);
}