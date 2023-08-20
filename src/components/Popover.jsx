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

    if (key === "Enter") {
      ev.preventDefault();
      setIsFormatSelected(true);
    } else if (key === "ArrowUp") {
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
      className="absolute overflow-x-hidden overflow-y-auto w-[270px] h-[350px] border border-gray-200 dark:border-none rounded-sm shadow-md bg-gray-50 dark:bg-[#1A1C26]">
      <PopoverList
        items={sortedFormats}
        selectedItemIndex={selectedIndex}
        onItemClick={onItemSelect}
      />
    </div>
  )
}

export default Popover