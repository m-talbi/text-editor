import { useEffect, useRef } from "react";

export const useScrollIntoItem = (selectedItemIndex, items) => {
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current && selectedItemIndex < items.length) {
      listRef.current.children[selectedItemIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }
  }, [selectedItemIndex]);

  return listRef;
}