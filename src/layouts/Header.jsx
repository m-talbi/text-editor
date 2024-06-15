/* eslint-disable react/prop-types */
import { ChevronsRight, Unlock, ChevronDown } from 'lucide-react'
import BreadCrumb from '../components/BreadCrumb'
import Separator from '../components/Separator'

const Header = ({ breadCrumbs }) => {
  return (
    <header className='w-full h-16 flex justify-between p-2 bg-gray-50 dark:bg-[#1A1C26]'>
      <section className='flex items-center gap-2'>
        <div className='text-slate-600 px-4'>
          <ChevronsRight size={18} />
        </div>
        <div className='flex gap-2'>
          {breadCrumbs.map((crumb, index) => (
            index !== breadCrumbs.length - 1
            ? (
              <BreadCrumb slash={true} key={index}>
                {crumb}
              </BreadCrumb>
            ) : (
              <BreadCrumb slash={false} key={index}>
                {crumb}
              </BreadCrumb>
            )
          ))}
        </div>
      </section>
      <section className='flex items-center gap-3'>
        <div className='text-slate-400 dark:text-[#deddda] inline-flex items-center'>
          <Unlock size={18} />
          <span className='ml-1'>Editing</span>
        </div>
        <Separator className={"h-5"} vertical={true} />
        <div className='text-blue-600 dark:text-[#EA861A] font-semibold inline-flex items-center'>
          <span>Publish Space</span>
          <ChevronDown className='pt-1' size={22} />
        </div>
      </section>
    </header>
  )
}

export default Header