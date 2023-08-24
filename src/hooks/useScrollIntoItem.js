import { useEffect, useRef } from "react";

export const useScrollIntoItem = (selectedItemIndex) => {
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      const item = listRef.current.querySelector(`[data-id="${selectedItemIndex}"]`);
      if (!item) return;

      item.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }, [selectedItemIndex]);

  return listRef;
}