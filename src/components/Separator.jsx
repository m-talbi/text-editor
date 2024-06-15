import { twMerge } from 'tailwind-merge'

// eslint-disable-next-line react/prop-types
const Separator = ({ vertical, className }) => {
  return (
    <div className={twMerge(`${vertical ? 'h-full w-[1px]' : 'w-full h-[1px]'} bg-slate-400 rounded-md`, className)}></div>
  )
}

export default Separator;