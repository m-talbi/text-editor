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