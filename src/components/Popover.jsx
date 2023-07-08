/* eslint-disable react/prop-types */
import { Pencil } from "lucide-react"
import { useEffect, useRef, useState } from "react";
import { useKeyPress } from '../hooks/useKeypress';
import { clearSelection, restoreCaretPosition, saveCaretPosition, getCaretRect } from '../utils/getCaretRect';

const Popover = ({ keywords, textformats, editorEl, onClose, onFormatSelect }) => {
  const [isFormatSelected, setIsFormatSelected] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState(0);
  const searchPattern = new RegExp(keywords.split("").join('|'), 'gi');
  let { x, y } = getCaretRect(editorEl);
  const popoverRef = useRef(null);
  const savedSelection = useRef(null);
  const hoveredFormatRef = useRef(null);
  const left = useRef(0);
  const top = useRef(0);

  const hideCaret = () => {
    savedSelection.current = saveCaretPosition();
    editorEl.blur();
    clearSelection();
  }

  const restoreCaret = () => {
    restoreCaretPosition(editorEl, savedSelection.current);
    savedSelection.current = null;
  }

  useKeyPress((ev) => {
    if (document.activeElement.nodeName !== "BODY" && document.activeElement !== editorEl) {
      onClose();
      return;
    }

    const key = ev.key;
    const isCaretVisible = !savedSelection.current;

    if (key === "Enter") {
      hideCaret();
      setIsFormatSelected(true);
    } else if (key === "Escape") {
      restoreCaret();
      onClose();
    } else if (key === "ArrowUp") {
      if (isCaretVisible) hideCaret();
      setSelectedFormat((prev) => Math.max(prev - 1, 0));
    } else if (key === "ArrowDown") {
      if (isCaretVisible) hideCaret();
      setSelectedFormat((prev) => Math.min(prev + 1, textformats.length - 1));
    } else {
      if (isCaretVisible) return;
      restoreCaret();
      setSelectedFormat(0);
    }
  });

  useEffect(() => {
    if (isFormatSelected) {
      onFormatSelect(textformats[selectedFormat]);
      onClose();
      return;
    }

    hoveredFormatRef.current.scrollIntoView({ behavior: "smooth", block: 'nearest' });
  }, [isFormatSelected, selectedFormat]);

  useEffect(() => {
    if (!popoverRef.current || editorEl !== document.activeElement) return;

    function movePopoverToCaret() {
      popoverRef.current.style.top = top.current + "px";
      if (editorEl.offsetWidth - left.current > popoverRef.current.offsetWidth) {
        popoverRef.current.style.left = left.current + "px";
      }
    }

    left.current = x - (popoverRef.current.offsetWidth / 2) - 10 || 0;
    top.current = y - (popoverRef.current.offsetHeight / 2) + 10 || 30;

    movePopoverToCaret();
  }, [editorEl, x, y]);


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
      <ul className="flex flex-col overflow-y-scroll overflow-x-hidden w-full h-3/4">
        {
          textformats
          .filter((textFormat) => keywords.length === 0 || textFormat.format.match(searchPattern)?.length === keywords.length)
          .map((item, index) => {
            return selectedFormat === index ? (
              <li ref={hoveredFormatRef} key={index} className="flex items-center justify-start gap-6 py-2 px-5 duration-150 ease-in hover:bg-gray-200 cursor-pointer bg-gray-200">
                <Pencil color="#000000" />
                <div>
                  <p className="text-gray-700 font-bold text-lg">{item.format}</p>
                  <p className="text-gray-400 text-sm">Shortcut: type {item.shortcut}</p>
                </div>
              </li>
            ) : (           
            <li key={index} className="flex items-center justify-start gap-6 py-2 px-5 duration-150 ease-in hover:bg-gray-200 cursor-pointer">
              <Pencil color="#000000" />
              <div>
                <p className="text-gray-700 font-bold text-lg">{item.format}</p>
                <p className="text-gray-400 text-sm">Shortcut: type {item.shortcut}</p>
              </div>
            </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Popover