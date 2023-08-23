import { useEffect, useRef } from "react";

export const useScrollIntoItem = (selectedItemIndex) => {
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      const items = listRef.current.querySelectorAll("[data-id]");
      items.item(selectedItemIndex - 1).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }
  }, [selectedItemIndex]);

  return listRef;
}