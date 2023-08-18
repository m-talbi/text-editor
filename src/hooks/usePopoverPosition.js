import { useLayoutEffect, useRef } from "react";

const usePopoverPosition = (editorEl, { x, y }) => {
  const popoverRef = useRef(null);

  useLayoutEffect(() => {
    if (!popoverRef.current || editorEl !== document.activeElement) return;

    const movePopoverToCaret = () => {
      popoverRef.current.style.top = `${top}px`;
      if (editorEl.offsetWidth - left > popoverRef.current.offsetWidth) {
        popoverRef.current.style.left = `${left}px`;
      } else {
        popoverRef.current.style.left = `${editorEl.offsetWidth - popoverRef.current.offsetWidth}px`;
      }
    };

    const popoverWidth = popoverRef.current.offsetWidth;
    const popoverHeight = popoverRef.current.offsetHeight;
    const editorWidth = editorEl.offsetWidth;
    const editorHeight = editorEl.offsetHeight;

    const popoverLeft = x - popoverWidth / 2 - 10;
    const popoverTop = y - popoverHeight / 2;

    const left = Math.max(0, Math.min(popoverLeft, editorWidth - popoverWidth));
    const top = Math.max(25, Math.min(popoverTop, editorHeight - popoverHeight));

    movePopoverToCaret();
  }, [editorEl, x, y]);

  return popoverRef;
};

export default usePopoverPosition;