import CaretUtils from "../utils/caret/caretUtils";

interface EditorState {
  command: string;
  isMenuOpen: boolean;
  itemIndex: number;
  itemId: number;
  formats: Format[];
}

interface Format {
  format: string;
  tag: string;
  shortcut: string;
  classes: string[];
  id: number;
}

class Popover {
  private popover: HTMLDivElement;
  private keyActionMap: Map<string, (state: EditorState) => void> = new Map([
    ["ArrowUp", (state) => this.selectPreviousItem(state)],
    ["ArrowDown", (state) => this.selectNextItem(state)],
  ]);

  constructor(popover: HTMLDivElement) {
    this.popover = popover;
  }

  public handleInput(state: EditorState) {
    if (!state.isMenuOpen && state.command[0] === "/") {
      this.show(state);
    } else if (state.isMenuOpen && state.command === "") {
      this.hide(state);
    } else {
      this.updatePopoverPosition();
    }
  }

  public handleKeypress(
    ev: React.KeyboardEvent<HTMLDivElement>,
    state: EditorState,
  ) {
    switch (ev.key) {
      case "ArrowUp":
      case "ArrowDown":
        state.itemId = this.handleNavigation(ev, state);
        break;
      case "Enter":
        this.hide(state);
        break;
    }
  }

  public handleNavigation(
    ev: React.KeyboardEvent<HTMLDivElement>,
    state: EditorState
  ): number {
    ev.preventDefault();
    const action = this.keyActionMap.get(ev.key);

    if (action) action(state);

    return state.formats[state.itemIndex - 1].id;
  }

  public show(state: EditorState): void {
    this.popover.classList.add("popover-visible");
    this.updatePopoverPosition();
    state.isMenuOpen = true;
  }

  public hide(state: EditorState): void {
    this.popover.classList.remove("popover-visible");
    state.isMenuOpen = false;
    state.itemIndex = 1;
  }

  public updatePopoverPosition(): void {
    const { x, y } = CaretUtils.getCaretRect();
    const screenWidth = window.innerWidth;
    const popoverWidth = this.popover.offsetWidth;

    this.popover.style.left = `${Math.min(x, screenWidth - (popoverWidth - 50))}px`;
    this.popover.style.top = `${y + 30}px`;
  }

  private selectPreviousItem(state: EditorState): void {
    state.itemIndex = Math.max(state.itemIndex - 1, 1);
  }

  private selectNextItem(state: EditorState): void {
    state.itemIndex = Math.min(state.itemIndex + 1, state.formats.length);
  }
}

export default Popover;
