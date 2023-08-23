import {formats} from "./features";

interface Format {
  format: string;
  tag: string;
  shortcut: string;
  classes: string[];
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

    return this.index;
  }

  public filterFormats(search: string): number {
    this.formatsList = formats.filter((format) => format.format.toLowerCase().includes(search.toLowerCase()));
    this.index = 1;

    return this.index;
  }

  public onItemSelect(ev: React.KeyboardEvent, callback: (format: Format) => void): void {
    ev.preventDefault();
    callback(this.formatsList[this.index - 1]);
  }

  public show(): void {
    this.popover.classList.add("popover-visible");
  }

  public hide(): void {
    this.popover.classList.remove("popover-visible");
    this.index = 1;
  }

  private selectPreviousItem(): void {
    this.index = Math.max(this.index - 1, 1);
  }

  private selectNextItem(): void {
    this.index = Math.min(this.index + 1, this.formatsList.length);
  }
}

export default Popover;