class CaretNavigation {
  private editable: HTMLDivElement;

  constructor(editable: HTMLDivElement) {
    this.editable = editable;
  }

  public handleKeypress(ev: React.KeyboardEvent<HTMLDivElement>) {
    switch (ev.key) {
      case "ArrowUp":
        break;
      case "ArrowDown":
        break;
    }
  }
}