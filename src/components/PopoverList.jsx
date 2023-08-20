/* eslint-disable react/prop-types */
import { Pencil } from "lucide-react"
import { twMerge } from "tailwind-merge";
import { useScrollIntoItem } from "../hooks/useScrollIntoItem";

const PopoverList = ({ items, selectedItemIndex, onItemClick }) => {
  const listRef = useScrollIntoItem(selectedItemIndex, items);

  return (
    <div className="bg-gray-50 dark:bg-[#303031]">
      <div className="py-1 px-2 text-sm text-[#deddda]">
        <span>Basic blocks</span>
      </div>
      <ul ref={listRef} className="flex flex-col focus-within:outline-none focus-within:border-none">
        {
          items.map((item, index) => (
            <li
              key={index}
              onClick={() => onItemClick(index)}
              className={twMerge("flex items-center justify-start gap-6 py-2 px-5 duration-150 ease-in hover:bg-gray-200 hover:dark:bg-[#EA861A] cursor-pointer", `${selectedItemIndex === index && "bg-gray-200 dark:bg-[#EA861A]"}`)}
            >
              <Pencil color="#000000" />
              <div>
                <p className="text-gray-700 dark:text-[#deddda] font-bold">{item.format}</p>
                <p className="text-gray-400 dark:text-gray-100 text-xs">Shortcut: type {item.shortcut}</p>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
};

export default PopoverList;