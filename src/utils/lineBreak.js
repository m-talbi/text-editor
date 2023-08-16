import { getSelectedNode } from "./getSelectedNode";

export const breakElementAtSelection = (parentDiv) => {
  const selectedNode = getSelectedNode();
  const range = selectedNode.selection.getRangeAt(0);
  const br = document.createElement("br");

  if (parentDiv != selectedNode.node) {
    const selectedNodeContent = selectedNode.node.textContent;
    const selectedNodeCaretIndex = selectedNode.selection.focusOffset;
    const selectedNodeTag = selectedNode.node.nodeName;

    const nodeBeforeCaret = document.createElement(selectedNodeTag);
    const nodeAfterCaret = document.createElement(selectedNodeTag);

    nodeBeforeCaret.textContent = selectedNodeContent.substring(0, selectedNodeCaretIndex);
    nodeAfterCaret.textContent = selectedNodeContent.substring(selectedNodeCaretIndex);

    if (nodeBeforeCaret.textContent.length != 0) {
      selectedNode.node.parentNode.insertBefore(nodeBeforeCaret, selectedNode.node);
    }

    selectedNode.node.parentNode.insertBefore(br, selectedNode.node);

    if (nodeAfterCaret.textContent.length != 0) {
      selectedNode.node.parentNode.insertBefore(nodeAfterCaret, selectedNode.node.nextSibling);
    }

    selectedNode.node.remove();
  } else {
    range.insertNode(br);
  }

  // Adjust the range's position slightly to ensure the caret remains visible
  range.setStartAfter(br);
  range.setEndAfter(br);
  range.collapse(true); // Collapse the range to the start of the caret
  selectedNode.selection.removeAllRanges(); // Clear existing ranges
  selectedNode.selection.addRange(range); // Add the adjusted range
}