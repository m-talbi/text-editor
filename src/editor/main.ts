import React from "react";
import Editor from "./editor";
import Popover from "./popover";
import InputUtils from "./utils/input/inputUtils";
import CaretUtils from "./utils/caret/caretUtils";

interface Format {
  format: string;
  tag: string;
  shortcut: string;
  classes: string[];
}

interface EditorState {
  command: string;
  isPopoverOpened: boolean;
  selectedItemIndex: number;
}

class MyEditor {
  private editor: Editor;
  private popover: Popover;
  private currentRange: Range | undefined;

  private selectedItemIndex: number = 1;
  private isPopoverOpened: boolean = false;
  private command: string = "";

  constructor(
      contentEditableRef: React.RefObject<HTMLDivElement>,
      popoverRef: React.RefObject<HTMLDivElement>
    ) {
      if (!contentEditableRef.current || !popoverRef.current) return;
      this.editor = new Editor(contentEditableRef.current as HTMLDivElement);
      this.popover = new Popover(popoverRef.current as HTMLDivElement);
  }

  public onKeypress(ev: React.KeyboardEvent<HTMLDivElement>): EditorState {
    const { input, type } = InputUtils.queryInputType(ev);

    if (this.isCommandActiveAndPopoverClosed(type))
      this.openPopover();
    else if (this.isCommandActiveAndKeyIsArrow(input))
      this.handlePopoverNavigation(ev);
    else if (this.isCommandActiveAndKeyIsEnter(input))
      this.popover.onItemSelect(ev, this.handleItemSelect.bind(this));
    else if (this.isCommandActiveAndKeyIsEscape(input))
      this.closePopover();
    else if (this.isCommandActive())
      this.updateCommand(input);
    else if (input === "Enter")
      this.editor.breakLineAtCaret(ev);

    return {
      command: this.command,
      isPopoverOpened: this.isPopoverOpened,
      selectedItemIndex: this.selectedItemIndex,
    }
  }

  private updateCommand(input: string): void {
    if (input === "Backspace") {
      this.command = this.command.slice(0, this.command.length - 1);
      if (this.command.length === 0) {
        this.closePopover();
        return;
      }
    }
    else if (input.length > 1)
      return;
    else
      this.command = this.command + input;

    this.selectedItemIndex = this.popover.filterFormats(this.command.slice(1));
  }

  private handleItemSelect(format: Format): void {
    this.editor.deleteCommand(this.currentRange, this.command);
    this.editor.addElementAtCaret(format);
    this.closePopover();
  }

  private handlePopoverNavigation(ev: React.KeyboardEvent<HTMLDivElement>): void {
    this.selectedItemIndex = this.popover.handleNavigation(ev);
  }

  private openPopover(): void {
    this.isPopoverOpened = true;
    this.command = "/";
    this.popover.show();
    this.currentRange = CaretUtils.getRange();
  }

  private closePopover(): void {
    this.popover.hide();
    this.resetStates();
  }

  private resetStates(): void {
    this.isPopoverOpened = false;
    this.command = "";
    this.currentRange = undefined;
    this.selectedItemIndex = 1;
  }

  private isCommandActiveAndKeyIsEnter(key: string | null): boolean {
    return this.isCommandActive() && key === "Enter";
  }

  private isCommandActiveAndKeyIsArrow(key: string | null): boolean {
    return this.isCommandActive() && (key === "ArrowUp" || key === "ArrowDown");
  }

  private isCommandActiveAndPopoverClosed(type: string): boolean {
    return type === "command" && this.isPopoverOpened === false;
  }

  private isCommandActive(): boolean {
    return this.command !== "";
  }

  private isCommandActiveAndKeyIsEscape(key: string | null): boolean {
    return this.isCommandActive() && key === "Escape";
  }
}

export default MyEditor;