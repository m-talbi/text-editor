/* eslint-disable react/prop-types */
import { useRef } from 'react';
import ContentEditable from '../components/ContentEditable';
import Popover from '../components/Popover';
import Seperator from '../components/Seperator';

const Editor = ({ title, text, onTitleUpdate, onTextUpdate }) => {
  const textformats = [
    {format: "Heading 1", shortcut: "# + space"},
    {format: "Heading 2", shortcut: "## + space"},
    {format: "Heading 3", shortcut: "### + space"},
    {format: "Heading 4", shortcut: "#### + space"},
    {format: "Heading 5", shortcut: "##### + space"},
    {format: "Heading 6", shortcut: "###### + space"},
  ]

  const contentEditableRef = useRef(null);

  return (
    <div className='flex flex-col mt-6'>
      <div>
        <input
          className='w-full text-slate-700 text-4xl font-bold focus-within:outline-none'
          placeholder='Write your title here...' 
          onChange={onTitleUpdate}
          value={title}
        />
      </div>
      <Seperator vertical={false} className="bg-slate-200 my-4" />
      <div className='relative'>
        <ContentEditable
          ref={contentEditableRef}
          value={text}
          onInput={onTextUpdate}
          placeholder='Type / for blocks, or @ to link docs or people'
        />
        <Popover
          keywords={['link', 'docs', 'people']}
          textformats={textformats}
          editorRef={contentEditableRef}
        />
      </div>
    </div>
  )
}

export default Editor;