import { getSelectedNode } from "./getSelectedNode";

export const addElementAtSelection = (format, parentDiv) => {
  const selectedNode = getSelectedNode();
  const range = selectedNode.selection.getRangeAt(0);
  const elem = document.createElement(format.tag);
  elem.classList.add(...format.classes);

  if (parentDiv != selectedNode.node) {
    const selectedNodeContent = selectedNode.node.textContent;
    const selectedNodeCaretIndex = selectedNode.selection.focusOffset;
    const selectedNodeTag = selectedNode.node.nodeName;

    const nodeBeforeCaret = document.createElement(selectedNodeTag);
    const nodeAfterCaret = document.createElement(selectedNodeTag);

    nodeBeforeCaret.textContent = selectedNodeContent.substring(0, selectedNodeCaretIndex);
    nodeAfterCaret.textContent = selectedNodeContent.substring(selectedNodeCaretIndex);

    selectedNode.node.parentNode.insertBefore(nodeBeforeCaret, selectedNode.node);
    selectedNode.node.parentNode.insertBefore(elem, selectedNode.node);
    selectedNode.node.parentNode.insertBefore(nodeAfterCaret, selectedNode.node.nextSibling);

    selectedNode.node.remove();
  } else {
    range.insertNode(elem);
  }

  elem.focus();

  // Place the caret at the end of the newly added element
  range.selectNodeContents(elem);
  selectedNode.selection.removeAllRanges();
  selectedNode.selection.addRange(range);

  return elem;
}