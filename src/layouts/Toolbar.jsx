import Seperator from "../components/Seperator"
import { Clock, ArrowDownLeft, CheckCircle, Cloud, GripVertical } from 'lucide-react'

/* eslint-disable react/prop-types */
const Toolbar = ({ username, userIcon, readTime, viewCount }) => {
  return (
    <div className="py-[0.4rem] px-2 border border-slate-200 rounded-md shadow-sm flex items-center justify-between">
      <section className="flex items-center gap-2">
        <div className="bg-green-200 rounded-md px-[0.35rem] flex items-center justify-center">
          <span className="text-green-800 text-lg font-bold p-1 h-fit">{username[0].toUpperCase()}</span>
        </div>
        <Seperator className={"h-4 bg-slate-400"} vertical={true} />
        <div className="inline-flex items-center gap-2 text-slate-400">
          <Clock size={20} />
          <span>{readTime}min</span>
        </div>
        <Seperator className={"h-4 bg-slate-400"} vertical={true} />
        <div className="text-slate-400">
          {userIcon}
        </div>
        <Seperator className={"h-4 bg-slate-400"} vertical={true} />
        <div className="text-slate-400 flex items-center">
          <ArrowDownLeft size={24} className="pt-1" />
          <span>{viewCount}</span>
        </div>
      </section>
      <section className="flex items-center gap-3">
        <CheckCircle size={20} className="text-slate-400" />
        <Cloud size={20} className="text-green-500" />
        <GripVertical size={20} />
      </section>
    </div>
  )
}

export default Toolbar