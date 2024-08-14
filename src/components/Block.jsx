import { GripVertical } from "lucide-react";

const Block = () => {
  return (
    <div contentEditable="false" className="w-full h-6 relative">
      <div className="relative">
        <div className="absolute left-[-25px]">
          <GripVertical className="text-white" />
        </div>
      </div>
      <div
        data-placeholder="Write something"
        contentEditable
        className={
          "w-full min-h-[24px] text-[#deddda] text-base font-normal relative focus-within:outline-none whitespace-pre-wrap break-words before:text-slate-400 before:cursor-text empty:before:content-[attr(data-placeholder)]"
        }
      >
        Hello World
      </div>
    </div>
  );
};

export default Block;
