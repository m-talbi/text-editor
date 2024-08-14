import { EditorState } from "../types";
import CaretUtils from "../utils/caret/caretUtils";

class MenuContext {
  private menuEl: HTMLDivElement;
  private keyActionMap: Map<string, (state: EditorState) => void> = new Map([
    ["ArrowUp", (state) => this.selectPreviousItem(state)],
    ["ArrowDown", (state) => this.selectNextItem(state)],
  ]);

  constructor(menuEl: HTMLDivElement) {
    this.menuEl = menuEl;
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
        if (state.isMenuOpen) {
          this.hide(state);
        }
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
    this.menuEl.classList.add("popover-visible");
    this.updatePopoverPosition();
    state.isMenuOpen = true;
  }

  public hide(state: EditorState): void {
    this.menuEl.classList.remove("popover-visible");
    state.shouldMenuClose = true;
    state.isMenuOpen = false;
    state.itemIndex = 1;
  }

  public updatePopoverPosition(): void {
    const { x, y } = CaretUtils.getCaretRect();
    const screenWidth = window.innerWidth;
    const popoverWidth = this.menuEl.offsetWidth;

    this.menuEl.style.left = `${Math.min(x, screenWidth - (popoverWidth - 50))}px`;
    this.menuEl.style.top = `${y + 30}px`;
  }

  private selectPreviousItem(state: EditorState): void {
    state.itemIndex = Math.max(state.itemIndex - 1, 1);
  }

  private selectNextItem(state: EditorState): void {
    state.itemIndex = Math.min(state.itemIndex + 1, state.formats.length);
  }
}

export default MenuContext;
