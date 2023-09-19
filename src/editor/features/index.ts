import headings from "./block/headings";
import inlineText from "./inline/inlineText";

export const formatsWithTitles = [
  inlineText,
  headings,
]

export const formats = [
  ...inlineText.formats,
  ...headings.formats,
]