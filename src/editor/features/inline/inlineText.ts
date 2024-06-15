const boldIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bold"><path d="M14 12a4 4 0 0 0 0-8H6v8"/><path d="M15 20a4 4 0 0 0 0-8H6v8Z"/></svg>';
const italicIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-italic"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg>';

const inlineText = {
  name: "Inline Text",
  formats: [
    {
      format: "Bold",
      tag: "b",
      icon: boldIcon,
      classes: ["b"],
      shortcut: "** + space",
      id: 1,
    },
    {
      format: "Italic",
      tag: "i",
      icon: italicIcon,
      classes: ["italic"],
      shortcut: "* + space",
      id: 2,
    },
  ],
};

export default inlineText;
