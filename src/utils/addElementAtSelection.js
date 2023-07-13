export const addElementAtSelection = (parent, range, format) => {
  const selection = window.getSelection(); // Get the current selection
  if (selection.rangeCount === 0) return;

  const newNode = document.createElement(format.tag); // Create the new element
  newNode.className = format.tag;

  parent.appendChild(newNode);

  newNode.focus();

  // Place the caret at the end of the newly added element
  range.selectNodeContents(newNode);
  selection.removeAllRanges();
  selection.addRange(range);
}