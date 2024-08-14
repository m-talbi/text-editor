import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { EditorContextR } from "./EditorContext";
import EditorContext from "../editor/main";

interface Format {
  format: string;
  tag: string;
  shortcut: string;
  classes: string[];
  id: number;
}

interface EditorState {
  command: string,
  isMenuOpen: boolean,
  itemIndex: number,
  itemId: number,
}

interface IEditorStateContext {
  state: EditorState;
  onKeypress: (
    e: React.KeyboardEventHandler<HTMLDivElement>
  ) => void | undefined;
  onInput: (
    e: React.SyntheticEvent<HTMLDivElement>
  ) => void | undefined;
}

export const EditorStateContext = createContext<IEditorStateContext | null>(
  null
);

const EditorStateProvider = ({ children }) => {
  const [state, setState] = useState<EditorState>({ command: "", isMenuOpen: false, itemIndex: 1, itemId: 1 });
  const comps = useContext(EditorContextR)?.comps;
  const editor = useRef<EditorContext>();

  useEffect(() => {
    if (!comps?.editable || !comps.menu) return;
    editor.current = new EditorContext(
      comps.editable as HTMLDivElement,
      comps.menu as HTMLDivElement
    );
  }, [comps]);

  const onKeypress = (e) => {
    if (!editor.current) return;
		const { command, isMenuOpen, itemIndex, itemId } = editor.current.onKeypress(e);
    setState({ command, isMenuOpen, itemIndex, itemId });
  };

  const onInput = (e) => {
    if (!editor.current) return;
		const { command, isMenuOpen, itemIndex, itemId } = editor.current.onInput(e);
    setState({ command, isMenuOpen, itemIndex, itemId });
  };

  return (
    <EditorStateContext.Provider value={{ state, onKeypress, onInput }}>
      {children}
    </EditorStateContext.Provider>
  );
};

export default EditorStateProvider;
