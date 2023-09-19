import {formats} from "./features";
import CaretUtils from "./utils/caret/caretUtils";

interface Format {
  format: string;
  tag: string;
  shortcut: string;
  classes: string[];
  id: number;
}

class Popover {
  private index: number = 1;
  private formatsList: Format[] = formats;
  private popover: HTMLDivElement;
  private keyActionMap: Map<string, () => void> = new Map([
    ["ArrowUp", () => this.selectPreviousItem()],
    ["ArrowDown", () => this.selectNextItem()],
  ]);

  constructor(popover: HTMLDivElement) {
    this.popover = popover;
  }

  public handleNavigation(ev: React.KeyboardEvent<HTMLDivElement>): number {
    ev.preventDefault();
    const action = this.keyActionMap.get(ev.key);

    if (action) action();

    return this.formatsList[this.index - 1].id;
  }

  public filterFormats(search: string): number {
    this.formatsList = formats.filter((format) => format.format.toLowerCase().includes(search.toLowerCase()));
    this.index = 1;
    this.updatePopoverPosition();

    return this.formatsList[this.index - 1]?.id;
  }

  public onItemSelect(ev: React.KeyboardEvent, callback: (format: Format) => void): void {
    ev.preventDefault();
    callback(this.formatsList[this.index - 1]);
  }

  public show(): void {
    this.popover.classList.add("popover-visible");
    this.updatePopoverPosition();
  }

  public hide(): void {
    this.popover.classList.remove("popover-visible");
    this.index = 1;
  }

  public updatePopoverPosition(): void {
    const { x, y } = CaretUtils.getCaretRect();
    const screenWidth = window.innerWidth;
    const popoverWidth = this.popover.offsetWidth;

    this.popover.style.left = `${Math.min(x, screenWidth - (popoverWidth + 50))}px`;
    this.popover.style.top = `${y + 30}px`;
  }

  private selectPreviousItem(): void {
    this.index = Math.max(this.index - 1, 1);
  }

  private selectNextItem(): void {
    this.index = Math.min(this.index + 1, this.formatsList.length);
  }
}

export default Popover;