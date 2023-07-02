/* eslint-disable react/prop-types */
import { Pencil } from "lucide-react"
import { useEffect, useRef } from "react";
import getCaretIndex from "../hooks/useCaretIndex"

const Popover = ({ keywords, textformats, editorRef }) => {
  const popoverRef = useRef(null);
  const pos = getCaretIndex(editorRef.current);
  const bottom = useRef(0);
  const left = useRef(0);

  function getRect() {
    const selection = window.getSelection();
    
    if (selection.rangeCount === 0) return { width: 0, height: 0 };
    
    const range = selection.getRangeAt(0);
    return range.getBoundingClientRect();
  }

  let rect = getRect();

  useEffect(() => {
    if (!popoverRef.current) return;

    function movePopoverToCaret() {
      popoverRef.current.style.top = bottom.current + "px";
      popoverRef.current.style.left = left.current + "px";
    }

    bottom.current = pos.height;
    left.current = rect.x - (popoverRef.current.offsetWidth / 2) - 10;

    movePopoverToCaret();
  }, [pos.height, rect.x]);

  console.log(rect);


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