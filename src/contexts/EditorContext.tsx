import React, { createContext, useState } from "react";

interface TComps {
  editable: HTMLDivElement | null;
  menu: HTMLDivElement | null;
}

export interface IEditorContext {
	comps: TComps,
	setComps: React.Dispatch<React.SetStateAction<TComps>> | undefined
}

export const EditorContextR = createContext<IEditorContext | null>(null);

const EditorProvider = ({children}) => {
	const [ comps, setComps ] = useState<TComps>({ editable: null, menu: null });

  return (
    <EditorContextR.Provider
      value={{ comps, setComps }}
    >
			{children}
		</EditorContextR.Provider>
  );
};

export default EditorProvider;
