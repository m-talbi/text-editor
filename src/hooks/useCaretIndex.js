const getCaretIndex = (element) => {
  let position = 0;
  const isSupported = typeof window.getSelection !== "undefined";

  if (isSupported) {
    const selection = window.getSelection();

    if (selection.rangeCount !== 0) {
      const range = window.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      position = preCaretRange.getBoundingClientRect();
    }

  }

  return position;
}

export default getCaretIndex;