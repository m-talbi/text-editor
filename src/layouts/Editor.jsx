/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import ContentEditable from '../components/ContentEditable';
import Popover from '../components/Popover';
import Seperator from '../components/Seperator';
import MyEditor from '../editor/main'

const Editor = ({ title, onTitleUpdate }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedItemIndex, setSelectedItemIndex] = useState(1);
  const editor = useRef(null);
  const popoverRef = useRef(null);
  const contentEditableRef = useRef(null);
  const onKeypress = (e) => {
    if (!editor.current) return;

    const { isPopoverOpened, command, selectedItemIndex } = editor.current.onKeypress(e);
    if (isPopoverOpened) setSearchKeyword(command.slice(1));
    setSelectedItemIndex(selectedItemIndex);
  }

  useEffect(() => {
    editor.current = new MyEditor(contentEditableRef, popoverRef);
  }, [])

  return (
    <div className='flex flex-col mt-6'>
      <div>
        <input
          className='w-full text-slate-700 text-4xl font-bold focus-within:outline-none bg-gray-50 dark:bg-[#15171F] dark:text-[#deddda] placeholder:text-slate400 placeholder:dark:text-slate-600'
          placeholder='Write your title here...'
          onChange={onTitleUpdate}
          value={title}
        />
      </div>
      <Seperator vertical={false} className="bg-slate-200 dark:bg-slate-400 my-4" />
      <div className=''>
        <ContentEditable
          ref={contentEditableRef}
          onKeypress={onKeypress}
          placeholder='Type / for blocks, or @ to link docs or people'
        />
        <Popover
          ref={popoverRef}
          searchKeyword={searchKeyword}
          selectedItemIndex={selectedItemIndex}
        />
      </div>
    </div>
  )
}

export default Editor;