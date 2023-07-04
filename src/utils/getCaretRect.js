const getCaretRect = () => {
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
      return res;
    }
  }

  return { x: 0, y: 0 };
}

export default getCaretRect;