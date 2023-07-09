/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import { Pencil } from "lucide-react"
import { twMerge } from "tailwind-merge";
import {  } from '../utils/getCaretRect';

const PopoverList = ({ items, selectedIndex, onItemClick }) => {
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current && selectedIndex < items.length) {
      listRef.current.children[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }
  }, [selectedIndex]);

  return (
    <ul ref={listRef} className="flex flex-col overflow-y-scroll overflow-x-hidden w-full h-3/4 focus-within:outline-none focus-within:border-none">
      {
        items.map((item, index) => (
          <li
            key={index}
            onClick={() => onItemClick(index)}
            className={twMerge("flex items-center justify-start gap-6 py-2 px-5 duration-150 ease-in hover:bg-gray-200 cursor-pointer", `${selectedIndex === index && "bg-gray-200"}`)}
          >
            <Pencil color="#000000" />
            <div>
              <p className="text-gray-700 font-bold text-lg">{item.format}</p>
              <p className="text-gray-400 text-sm">Shortcut: type {item.shortcut}</p>
            </div>
          </li>
        ))
      }
    </ul>
  )
};

export default PopoverList;