import React from 'react'
import Seperator from '../components/Seperator';

const Editor = ({ title, text, onTitleUpdate, onTextUpdate }) => {

  return (
    <div className='flex flex-col mt-6'>
      <div>
        <h3
          className='text-slate-800 text-4xl font-bold focus-within:outline-none'
          placeholder='Write your title here...'
          contentEditable 
          onKeyDown={onTitleUpdate}
          content={title}
        />
      </div>
      <Seperator vertical={false} className="bg-slate-200 my-4" />
      <div>
        <p onInput={onTextUpdate}>{text}</p>
      </div>
    </div>
  )
}

export default Editor;