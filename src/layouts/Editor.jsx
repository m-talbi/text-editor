/* eslint-disable react/prop-types */
import ContentEditable from '../components/ContentEditable';
import Seperator from '../components/Seperator';

const Editor = ({ title, text, onTitleUpdate, onTextUpdate }) => {

  return (
    <div className='flex flex-col mt-6'>
      <div>
        <input
          className='w-full text-slate-800 text-4xl font-bold focus-within:outline-none'
          placeholder='Write your title here...' 
          onChange={onTitleUpdate}
          value={title}
        />
      </div>
      <Seperator vertical={false} className="bg-slate-200 my-4" />
      <div>
        <ContentEditable
          value={text}
          onInput={onTextUpdate}
          placeholder='Type / for blocks, or @ to link docs or people'
        />
      </div>
    </div>
  )
}

export default Editor;