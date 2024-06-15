import { forwardRef, useContext } from "react";
import { EditorStateContext } from "../contexts/EditorStateContext";

/* eslint-disable react/prop-types */
const Editable = forwardRef(({ placeholder }, ref) => {
  const { onKeypress, onInput } = useContext(EditorStateContext);

  return (
    <>
      <div
        ref={ref}
        data-placeholder={placeholder}
        className={'w-full text-slate-700 dark:text-[#deddda] text-base font-normal focus-within:outline-none whitespace-pre-wrap break-words before:text-slate-400 before:cursor-text empty:before:content-[attr(data-placeholder)]'}
        contentEditable
        suppressContentEditableWarning
        onKeyDown={onKeypress}
        onInput={onInput}
      >
        <br/>
      </div>
    </>
  )
})

Editable.displayName = "Editable";

export default Editable;