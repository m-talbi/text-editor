import { twMerge } from "tailwind-merge"

/* eslint-disable react/prop-types */
const ContentEditable = ({ onInput, placeholder, className }) => {

  function setPlaceholder(e) {
    const value = e.target.innerHTML;
    value === placeholder && (e.target.innerHTML = '');
  }

  const onBlur = (e) => {
    console.log(e);
    onInput(e)
    const value = e.target.innerHTML;
    value === '<br>' && (e.target.innerHTML = "");
  };


  const pasteAsPlainText = (event) => {
    event.preventDefault()
    const text = event.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }

  return (
    <div
      data-placeholder={placeholder}
      className={twMerge('w-full text-slate-700 text-base font-medium focus-within:outline-none whitespace-pre-wrap break-words before:text-slate-400 empty:before:content-[attr(data-placeholder)]', className)}
      contentEditable
      suppressContentEditableWarning
      onPaste={pasteAsPlainText}
      onInput={onBlur}
      onFocus={setPlaceholder}
    />
  )
}

export default ContentEditable;