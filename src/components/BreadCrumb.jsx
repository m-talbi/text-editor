/* eslint-disable react/prop-types */
const BreadCrumb = ({ children, slash }) => {
  return (
    <div className="inline-flex items-center text-slate-400">
      {children}
      {slash && <span className="text-xl ml-2">  /</span> }
    </div>
  )
}

export default BreadCrumb