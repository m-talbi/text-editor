const showCaret = (element) => {
  if (!element) return;

  element.focus();

  // Create a range object
  const range = document.createRange();

  // Select the entire contents of the div
  range.selectNodeContents(element);

  // Collapse the range to the end (to place the caret at the end)
  range.collapse(false);

  // Create a selection object
  const selection = window.getSelection();

  // Remove existing selections
  selection.removeAllRanges();

  // Add the range to the selection
  selection.addRange(range);
}

export const getCaretRect = (element) => {
  const isSupported = typeof window.getSelection !== "undefined";

  if (isSupported) {
    const selection = window.getSelection();

    if (selection.rangeCount !== 0) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const temp = document.createTextNode("\0"); 
      range.insertNode(temp);
      const res = range.getBoundingClientRect();
      temp.parentNode.removeChild(temp);
      showCaret(element);
      return res;
    }
  }

  return { x: 0, y: 0 };
}