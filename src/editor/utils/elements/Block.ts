// export const Block = (
//   tag: string,
//   content: string = "",
//   classes: string[] = [""]
// ) => {
//   const root = document.createElement("div");
//   root.setAttribute("contentEditable", "false")
//   root.className = "block"


//   return `<div contentEditable="false" class="block"><div class="relative"><div class="image-container"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grip-vertical"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg></div></div><div contentEditable="true" class="inner-block-container" ><${tag} class="block-element ${classes.join(
//     " "
//   )}">${content}<br></${tag}></div></div>`;
// };

export const Block = (
  tag: string,
  content: string = "",
  classes: string[] = [""]
) => {
  // Create the main block div
  const blockDiv = document.createElement('div');
  blockDiv.contentEditable = 'false';
  blockDiv.className = 'block';

  // Create the relative div
  const relativeDiv = document.createElement('div');
  relativeDiv.className = 'relative';

  // Create the image container div
  const imageContainerDiv = document.createElement('div');
  imageContainerDiv.className = 'image-container';
  imageContainerDiv.insertAdjacentHTML("beforeend", '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grip-vertical"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>')

  // Append image container to relative div
  relativeDiv.appendChild(imageContainerDiv);

  // Create the inner block container div
  const innerBlockContainerDiv = document.createElement('div');
  innerBlockContainerDiv.contentEditable = 'true';
  innerBlockContainerDiv.className = 'inner-block-container';

  // Create the inner block element
  const innerBlockElement = document.createElement(tag);
  innerBlockElement.className = `block-element ${classes.join(' ')}`;
  innerBlockElement.innerHTML = `${content}`;

  // Append inner block element to inner block container
  innerBlockContainerDiv.appendChild(innerBlockElement);

  // Append relative div and inner block container to main block div
  blockDiv.appendChild(relativeDiv);
  blockDiv.appendChild(innerBlockContainerDiv);
  innerBlockElement.focus();

  return blockDiv;
}

export const BlockElement = (
  tag: string,
  content: string = "",
  classes: string[] = ["block-element"]
) => {
    // Create the inner block element
    const innerBlockElement = document.createElement(tag);
    innerBlockElement.className = `${classes.join(' ')}`;
    const text = document.createTextNode(content);
    innerBlockElement.appendChild(text);
    innerBlockElement.focus();
    return innerBlockElement;
}
