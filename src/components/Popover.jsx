/* eslint-disable react/prop-types */
import { Pencil } from "lucide-react"
import { forwardRef } from "react";
import { formatsWithTitles } from "../editor/features";
import { twMerge } from "tailwind-merge";
import { useScrollIntoItem } from "../hooks/useScrollIntoItem";

const Popover = forwardRef(({ searchKeyword, selectedItemIndex }, ref) => {
  let index = 1;
  const listRef = useScrollIntoItem(selectedItemIndex);

  return (
    <div
      ref={ref}
      className="hidden absolute overflow-x-hidden overflow-y-auto w-[270px] h-[350px] border border-gray-200 dark:border-none rounded-sm shadow-md bg-gray-50 dark:bg-[#1A1C26]"
    >
      <div ref={listRef} className="bg-gray-50 dark:bg-[#303031]">
        {formatsWithTitles.map((format) => (
          <div key={format.name}>
            <div
              key={`format-${format.name}`}
              className="py-1 px-2 text-sm text-slate-500 dark:text-[#deddda]"
            >
              <span>{format.name}</span>
            </div>
            <ul className="flex flex-col focus-within:outline-none focus-within:border-none">
              {
                format
                  .formats
                  .filter((item) => item.format.toLowerCase().includes(searchKeyword.toLowerCase()))
                  .map((item) => (
                <li
                  key={`format-${item.format}`}
                  className={twMerge("flex items-center justify-start gap-6 py-2 px-5 duration-150 ease-in hover:bg-gray-200 hover:dark:bg-[#EA861A] cursor-pointer", `${selectedItemIndex === index && "bg-gray-200 dark:bg-[#EA861A]"}`)}
                  data-id={index++}
                >
                  <Pencil color="#000000" />
                  <div>
                    <p className="text-gray-700 dark:text-[#deddda] font-bold">
                      {item.format}
                    </p>
                    <p className="text-gray-400 dark:text-gray-100 text-xs">
                      Shortcut: type {item.shortcut}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
});

Popover.displayName = 'Popover';

export default Popover