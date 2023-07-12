/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useKeyPress } from '../hooks/useKeypress';
import { restoreCaretPosition, getCaretRect, clearSelection, saveCaretPosition } from '../utils/getCaretRect';
import { sortByMatchedCharacters } from "../utils/utils";
import PopoverList from "./PopoverList";
import usePopoverPosition from "../hooks/usePopoverPosition";
import formats from '../constants/formats';

const Popover = ({ keywords, editorEl, onClose, onEscapePress, onFormatSelect, savedSelection }) => {
  const [isFormatSelected, setIsFormatSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sortedFormats] = useState(sortByMatchedCharacters(keywords, formats));

  let { x, y } = getCaretRect(editorEl);
  const popoverRef = usePopoverPosition(editorEl, {x, y});

  useKeyPress((ev) => {
    if (document.activeElement.nodeName !== "BODY" && document.activeElement !== editorEl) {
      onClose();
      return;
    }

    const key = ev.key;
    const isCaretVisible = !savedSelection.current;

    if (key === "Enter") setIsFormatSelected(true);
    else if (key === "ArrowUp") {
      ev.preventDefault();
      selectPreviousItem();
    } else if (key === "ArrowDown") {
      ev.preventDefault();
      selectNextItem();
    } else if (key === "Escape") {
      restoreCaret();
      onEscapePress();
    } else if (!isCaretVisible) restoreCaret();
  });

  useEffect(() => {
    if (isFormatSelected) {
      onItemSelect(selectedIndex);
    }
  }, [isFormatSelected]);

  const hideCaret = () => {
    savedSelection.current = saveCaretPosition();
    editorEl.blur();
    clearSelection();
  }

  const restoreCaret = () => {
    restoreCaretPosition(editorEl, savedSelection.current);
    savedSelection.current = null;
  }

  const selectPreviousItem = () => {
    setSelectedIndex((prev) => Math.max(prev - 1, 0));
  };

  const selectNextItem = () => {
    setSelectedIndex((prev) => Math.min(prev + 1, sortedFormats.length - 1));
  };

  const onItemSelect = (index) => {
    hideCaret();
    onFormatSelect(sortedFormats[index]);
    onClose();
  };

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
      <PopoverList
        items={sortedFormats}
        selectedIndex={selectedIndex}
        onItemClick={onItemSelect}
      />
    </div>
  )
}

export default Popover