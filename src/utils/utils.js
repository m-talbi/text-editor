export const getTextType = (text) => {
  if (/\//.test(text)) {
    return {
      type: 'command',
      value: text
    }
  } else if (/@/.test(text)) {
    return {
      type: 'link',
      value: text
    }
  } else if (/#/g.test(text)) {
    return {
      type: 'heading',
      value: text
    }
  } else {
    return {
      type: 'text',
      value: text
    }
  }
}

export function sortByMatchedCharacters(searchTerm, formats) {
  const lowercaseSearchTerm = searchTerm.toLowerCase();
  
  formats.sort((a, b) => {
    const aMatchCount = getMatchCount(a.format.toLowerCase(), lowercaseSearchTerm);
    const bMatchCount = getMatchCount(b.format.toLowerCase(), lowercaseSearchTerm);

    return bMatchCount - aMatchCount;
  });

  return formats;
}

function getMatchCount(format, searchTerm) {
  let count = 0;
  for (let i = 0; i < searchTerm.length; i++) {
    if (format.includes(searchTerm[i])) {
      count++;
    }
  }
  return count;
}