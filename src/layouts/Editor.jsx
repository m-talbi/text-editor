/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef } from "react";
import Editable from "../components/Editable";
import Menu from "../components/Menu";
import Separator from "../components/Separator";
import { EditorContextR } from "../contexts/EditorContext";

const Editor = ({ title, onTitleUpdate }) => {
  const { setComps } = useContext(EditorContextR);
  const menuRef = useRef(null);
  const editableRef = useRef(null);

  useEffect(() => {
    setComps(() => ({ editable: editableRef.current, menu: menuRef.current }));
  }, [setComps]);

  return (
    <div className="flex flex-col mt-6 h-[1000px]">
      <div>
        <input
          className="w-full text-slate-700 text-4xl font-bold focus-within:outline-none bg-gray-50 dark:bg-[#15171F] dark:text-[#deddda] placeholder:text-slate400 placeholder:dark:text-slate-600"
          placeholder="Write your title here..."
          onChange={onTitleUpdate}
          value={title}
        />
      </div>
      <Separator
        vertical={false}
        className="bg-slate-200 dark:bg-slate-400 my-4"
      />
      <Editable
        ref={editableRef}
        placeholder="Type / for blocks, or @ to link docs or people"
      />
      <Menu ref={menuRef} />
    </div>
  );
};

export default Editor;
