import Seperator from "../components/Seperator"
import { Clock, ArrowDownLeft, CheckCircle, Cloud, GripVertical } from 'lucide-react'

/* eslint-disable react/prop-types */
const Toolbar = ({ username, readTime, viewCount }) => {
  return (
    <div className="py-[0.3rem] px-[0.4rem] border border-slate-100 dark:border-slate-400 rounded-md shadow-sm flex items-center justify-between">
      <section className="flex items-center gap-2">
        <div className="bg-[#EA861A] rounded-[4px] px-[0.35rem] flex items-center justify-center">
          <span className="text-gray-800 text-lg font-bold p-[0.15rem] h-fit">{username[0].toUpperCase()}</span>
        </div>
        <Seperator className={"h-4 bg-slate-400"} vertical={true} />
        <div className="inline-flex items-center gap-2 text-slate-400">
          <Clock size={20} />
          <span>{readTime}min</span>
        </div>
        <Seperator className={"h-4 bg-slate-400"} vertical={true} />
        <div className="text-slate-400 flex items-center">
          <ArrowDownLeft size={20} />
          <span>{viewCount}</span>
        </div>
      </section>
      <section className="flex items-center gap-3">
        <CheckCircle size={20} className="text-slate-400" />
        <Cloud size={20} className="text-green-500" />
        <GripVertical className="text-slate-400" size={20} />
      </section>
    </div>
  )
}

export default Toolbar