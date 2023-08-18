import { getSelectedNode } from "./getSelectedNode";

export const addElementAtSelection = (format, parentDiv, caretRange) => {
  const selectedNode = getSelectedNode();
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

    if (nodeBeforeCaret.textContent.length != 0) {
      selectedNode.node.parentNode.insertBefore(nodeBeforeCaret, selectedNode.node);
    }

    selectedNode.node.parentNode.insertBefore(elem, selectedNode.node);

    if (nodeAfterCaret.textContent.length != 0) {
      selectedNode.node.parentNode.insertBefore(nodeAfterCaret, selectedNode.node.nextSibling);
    }

    selectedNode.node.remove();
  } else {
    caretRange.insertNode(elem);
  }

  const textNode = document.createTextNode('\0');
  elem.appendChild(textNode);
  caretRange.selectNodeContents(textNode);

  selectedNode.selection.removeAllRanges();
  selectedNode.selection.addRange(caretRange);
  elem.focus();
}