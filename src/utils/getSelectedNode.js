export const getSelectedNode = () => {
  let selection = window.getSelection();
  let node = selection.anchorNode;

  if (!node && document.selection) {
      selection = document.selection
      var range = selection.getRangeAt ? selection.getRangeAt(0) : selection.createRange();
      node = range.commonAncestorContainer ? range.commonAncestorContainer :
             range.parentElement ? range.parentElement() : range.item(0);
  }

  if (node) {
    return { node: (node.nodeName == "#text" ? node.parentNode : node), selection };
  }
};