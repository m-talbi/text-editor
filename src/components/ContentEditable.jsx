import { twMerge } from "tailwind-merge"
import { forwardRef } from "react";

/* eslint-disable react/prop-types */
const ContentEditable = forwardRef(({ onInput, placeholder, className }, ref) => {

  const handleInput = (e) => {
    const value = e.target.innerHTML;
    (value === '<br>' || value === '<div><br></div>') && (e.target.innerHTML = "<br>");
    onInput(e);
  };


  const pasteAsPlainText = (event) => {
    event.preventDefault()
    const text = event.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }

  return (
    <>
      <div
        ref={ref}
        data-placeholder={placeholder}
        className={twMerge('w-full text-slate-700 text-base font-normal focus-within:outline-none whitespace-pre-wrap break-words before:text-slate-400 before:cursor-text empty:before:content-[attr(data-placeholder)]', className)}
        contentEditable
        suppressContentEditableWarning
        onPaste={pasteAsPlainText}
        onInput={handleInput}
      >
        <br/>
      </div>
    </>
  )
})

ContentEditable.displayName = "ContentEditable";

export default ContentEditable;