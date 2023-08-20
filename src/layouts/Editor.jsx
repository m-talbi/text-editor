/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import ContentEditable from '../components/ContentEditable';
import Popover from '../components/Popover';
import Seperator from '../components/Seperator';
import { getTextType } from '../utils/utils';
import { restoreCaretPosition } from '../utils/getCaretRect';
import { addElementAtSelection } from '../utils/addElementAtSelection';
import { useKeyPress } from '../hooks/useKeypress';
import { breakElementAtSelection } from '../utils/lineBreak';

const Editor = ({ title, onTitleUpdate }) => {
  const [format, setFormat] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const command = useRef("");
  const contentEditableRef = useRef(null);
  const caretRange = useRef(null);

  const [keywords, setKeywords] = useState(command.current.slice(1).replace(/ /g, ""));

  useKeyPress((ev) => {
    if (ev.key === "Enter" && command.current == "") {
      ev.preventDefault();
      breakElementAtSelection(contentEditableRef.current);
    }
  })

  useEffect(() => {
    if (!caretRange.current && !format) return;

    deleteCommandFromEditor(caretRange);
    restoreCaretPosition(contentEditableRef.current, caretRange.current);
    addElementAtSelection(format, contentEditableRef.current, caretRange.current);
    resetStates();
  }, [format]);

  const deleteCommandFromEditor = (caretRange) => {
    let container = caretRange.current.startContainer;
    const start = Math.max(caretRange.current.endOffset - command.current.length, 0);
    const end = caretRange.current.endOffset;

    caretRange.current.setStart(container, start);
    caretRange.current.setEnd(container, end);
    caretRange.current.deleteContents();
  }

  const resetStates = () => {
    command.current = "";
    caretRange.current = null;
    setKeywords("");
    setFormat(null);
  }

  const inputText = (ev) => {
    const userInput = getTextType(ev.nativeEvent.data);

    if (userInput.type == "command" && command.current === "") {
      setFormat(null);
      command.current = userInput.value;
      setIsPopoverOpen(true);
      return;
    }

    if (command.current != "") {
      const value = command.current
      command.current = userInput.value ? value + userInput.value : value.slice(0, value.length - 1);
      setKeywords(keywords + userInput.value);
    }
  }

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  }

  const handleEscapePress = () => {
    command.current = "";
    setIsPopoverOpen(false);
  }

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
      <div className='relative'>
        <ContentEditable
          ref={contentEditableRef}
          onInput={inputText}
          placeholder='Type / for blocks, or @ to link docs or people'
        />
        {isPopoverOpen &&
          <Popover
            keywords={keywords}
            editorEl={contentEditableRef.current}
            savedSelection={caretRange}
            onClose={handlePopoverClose}
            onEscapePress={handleEscapePress}
            onFormatSelect={setFormat}
          />
        }
      </div>
    </div>
  )
}

export default Editor;