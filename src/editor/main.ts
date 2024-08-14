import MenuContext from "./menu/popover";
import { formats } from "./features";
import ElementInjector from "./injector/ElementInjector";
import CommandContext from "./editable/editor";
import { EditorState } from "./types";

class EditorContext {
  private commandCtx: CommandContext;
  private menuCtx: MenuContext;
  private injector: ElementInjector;

  private state: EditorState = {
    itemIndex: 1,
    itemId: 1,
    isMenuOpen: false,
    shouldMenuClose: false,
    command: "",
    formats: formats
  }

  constructor(
      editable: HTMLDivElement,
      menu: HTMLDivElement
    ) {
      this.commandCtx = new CommandContext(editable, this.state);
      this.menuCtx = new MenuContext(menu);
      this.injector = new ElementInjector(editable);
  }

  public onInput(ev: any): EditorState {
    this.commandCtx.handleInput(this.state);
    this.menuCtx.handleInput(this.state);
    this.injector.handleInput(ev, this.state);

    if (this.state.shouldMenuClose) {
      this.state.shouldMenuClose = false;
    }

    return {
      command: this.state.command,
      isMenuOpen: this.state.isMenuOpen,
      shouldMenuClose: this.state.shouldMenuClose,
      itemIndex: this.state.itemIndex,
      itemId: this.state.itemId,
      formats: this.state.formats
    }
  }

  public onKeypress(ev: any): EditorState {
    this.commandCtx.handleKeypress(ev, this.state);
    this.menuCtx.handleKeypress(ev, this.state);
    this.injector.handleKeypress(ev, this.state);

    if (this.state.shouldMenuClose) {
      this.state.shouldMenuClose = false;
    }

    //console.log(`command: ${this.state.command}\nisMenuOpen: ${this.state.isMenuOpen}\nitemIndex: ${this.state.itemIndex}\nformats: ${JSON.stringify(this.state.formats.map(item => ({ id: item.id, tag: item.tag, format: item.format })))}`);

    return {
      command: this.state.command,
      isMenuOpen: this.state.isMenuOpen,
      shouldMenuClose: this.state.shouldMenuClose,
      itemIndex: this.state.itemIndex,
      itemId: this.state.itemId,
      formats: this.state.formats
    }
  }
}

export default EditorContext;