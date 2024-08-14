import { forwardRef, useContext } from "react";
import { EditorStateContext } from "../contexts/EditorStateContext";

/* eslint-disable react/prop-types */
const Editable = forwardRef((_, ref) => {
  const { onKeypress, onInput } = useContext(EditorStateContext);

  return (
    <div
      ref={ref}
      onKeyDown={onKeypress}
      onInput={onInput}
      className="focus-within:outline-none flex flex-col"
    ></div>
  );
});

Editable.displayName = "Editable";

export default Editable;
