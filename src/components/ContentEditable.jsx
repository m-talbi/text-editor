import { twMerge } from "tailwind-merge"
import { forwardRef } from "react";

/* eslint-disable react/prop-types */
const ContentEditable = forwardRef(({ onKeypress, placeholder, className }, ref) => {

  return (
    <>
      <div
        ref={ref}
        data-placeholder={placeholder}
        className={twMerge('w-full text-slate-700 dark:text-[#deddda] text-base font-normal focus-within:outline-none whitespace-pre-wrap break-words before:text-slate-400 before:cursor-text empty:before:content-[attr(data-placeholder)]', className)}
        contentEditable
        suppressContentEditableWarning
        onKeyDown={onKeypress}
      >
        <br/>
      </div>
    </>
  )
})

ContentEditable.displayName = "ContentEditable";

export default ContentEditable;