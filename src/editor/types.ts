export interface Format {
  format: string;
  tag: string;
  shortcut: string;
  classes: string[];
  id: number;
}

export interface EditorState {
  command: string;
  isMenuOpen: boolean;
  shouldMenuClose: boolean;
  itemIndex: number;
  itemId: number;
  formats: Format[];
}