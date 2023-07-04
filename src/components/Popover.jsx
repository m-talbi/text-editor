/* eslint-disable react/prop-types */
import { Pencil } from "lucide-react"
import { useEffect, useRef } from "react";
import getCaretRect from "../utils/getCaretRect";

const Popover = ({ keywords, textformats, editorRef }) => {
  const popoverRef = useRef(null);
  let { x, y } = getCaretRect();
  const left = useRef(0);
  const top = useRef(0);

  useEffect(() => {
    if (!popoverRef.current) return;

    function movePopoverToCaret() {
      popoverRef.current.style.top = top.current  + "px";
      if (editorRef.current.offsetWidth - left.current > popoverRef.current.offsetWidth) {
        popoverRef.current.style.left = left.current + "px";
      }
    }

    left.current = x ? x - (popoverRef.current.offsetWidth / 2) - 10 : 0;
    top.current = y ? y - (popoverRef.current.offsetHeight / 2) + 10 : 30;

    movePopoverToCaret();
  }, [editorRef, x, y]);


  return (
    <div
      ref={popoverRef}
      className="absolute w-[20rem] h-[26rem] border border-gray-200 rounded-md shadow-md bg-white">
      <div className="h-1/4 p-3">
        <div className="text-base mb-2">
          <span className="font-bold text-lg">Add blocks</span>
          <p className="text-gray-400">Keep typing to filter, or escape to exit.</p>
        </div>
        <div className="text-base ">
          <span className="text-gray-600">Filtering Keywords&nbsp;</span>
          <span className="bg-sky-700 text-white px-[0.3rem] py-1 rounded-[4px]">{keywords.length}</span>
        </div>
      </div>
      <ul className="flex flex-col overflow-y-auto overflow-x-hidden w-full h-3/4">
        {textformats.map((item, index) => (
          <li key={index} className="flex items-center justify-start gap-6 py-2 px-5 duration-150 ease-in hover:bg-gray-200 cursor-pointer">
            <Pencil color="#000000" />
            <div>
              <p className="text-gray-700 font-bold text-lg">{item.format}</p>
              <p className="text-gray-400 text-sm">Shortcut: type {item.shortcut}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Popover