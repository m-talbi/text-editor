/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import ContentEditable from '../components/ContentEditable';
import Popover from '../components/Popover';
import Seperator from '../components/Seperator';
import { getTextType } from '../utils/utils';
import { restoreCaretPosition } from '../utils/getCaretRect';

const Editor = ({ title, text, onTitleUpdate, onTextUpdate }) => {
  const [format, setFormat] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const command = useRef("");
  const contentEditableRef = useRef(null);
  const keywords = command.current.slice(1).replace(/ /g, "");
  const caretRange = useRef(null);

  useEffect(() => {
    if (command.current == "") {
      setIsPopoverOpen(false);
    }
  }, [text]);

  useEffect(() => {
    if (!caretRange.current) return;

    deleteCommandFromEditor();
    restoreCaretPosition(contentEditableRef.current, caretRange.current);
    onTextUpdate(contentEditableRef.current.textContent);

    command.current = "";
    caretRange.current = null;
  }, [format]);

  const deleteCommandFromEditor = () => {
    const start = Math.max(caretRange.current.endOffset - command.current.length, 0);
    caretRange.current.setStart(contentEditableRef.current, start);
    caretRange.current.setEnd(contentEditableRef.current, caretRange.current.endOffset);
    caretRange.current.deleteContents();
  }
  
  const inputText = (ev) => {
    const userInput = getTextType(ev.nativeEvent.data);

    onTextUpdate(ev.target.outerText);

    if (userInput.type == "command" && command.current === "") {
      setFormat(null);
      command.current = userInput.value;
      setIsPopoverOpen(true);
      return;
    }

    if (command.current != "") {
      const value = command.current
      command.current = userInput.value ? value + userInput.value : value.slice(0, value.length - 1);
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
            keywords={keywords}
            editorEl={contentEditableRef.current}
            savedSelection={caretRange}
            onClose={() => setIsPopoverOpen(false)}
            onFormatSelect={setFormat}
          />
        }
      </div>
    </div>
  )
}

export default Editor;