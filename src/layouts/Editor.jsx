/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import ContentEditable from '../components/ContentEditable';
import Popover from '../components/Popover';
import Seperator from '../components/Seperator';
import { getTextType } from '../utils/utils';
import textformats from '../constants/formats';

const Editor = ({ title, text, onTitleUpdate, onTextUpdate }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState(0);
  const command = useRef({ value: "", indexOfSlash: -1 });
  const contentEditableRef = useRef(null);

  useEffect(() => {
    const slashIndex = command.current.indexOfSlash;

    if (slashIndex < 0 || text[slashIndex] !== '/') {
      command.current = { value: "", indexOfSlash: -1 };
      setIsPopoverOpen(false);
    }
    console.log(command.current);
  }, [command.current.value, text]);
  
  const inputText = (ev) => {
    const userInput = getTextType(ev.nativeEvent.data);

    onTextUpdate(ev.target.outerText);

    if (userInput.type == "command") {
      command.current = { value: userInput.value, indexOfSlash: text.length };
      setIsPopoverOpen(true);
      return;
    }

    if (command.current.value != "") {
      const value = command.current.value
      const newValue =  userInput.value ? value + userInput.value : value.slice(0, value.length - 1);
      command.current = { ...command.current, value: newValue };
    }
  }

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
          onInput={inputText}
          placeholder='Type / for blocks, or @ to link docs or people'
        />
        {isPopoverOpen &&
          <Popover
            keywords={command.current.value.slice(1)}
            textformats={textformats}
            editorRef={contentEditableRef}
            selectedFormat={selectedFormat}
          />
        }
      </div>
    </div>
  )
}

export default Editor;