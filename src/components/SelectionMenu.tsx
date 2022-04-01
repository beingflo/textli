import { BubbleMenu } from '@tiptap/react';
import React from 'react';
import {
  BoldIcon,
  ClearFormattingIcon,
  CodeIcon,
  HighlightIcon,
  ItalicIcon,
  StrikeIcon,
  UnderlineIcon,
} from '../icons';

export const SelectionMenu = ({
  editor,
}: {
  editor: any;
}): React.ReactElement => {
  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{
            duration: [300, 200],
            placement: 'top-start',
          }}
          className='grid grid-flow-col grid-rows-1 divide-x divide-gray-700 rounded border border-gray-700 bg-white fill-gray-700'
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`h-7 w-7 p-1 ${
              editor.isActive('bold') && 'fill-yellow-400'
            }`}
          >
            <BoldIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`h-7 w-7 p-1 ${
              editor.isActive('italic') && 'fill-yellow-400'
            }`}
          >
            <ItalicIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`h-7 w-7 p-1 ${
              editor.isActive('strike') && 'fill-yellow-400'
            }`}
          >
            <StrikeIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`h-7 w-7 p-1 ${
              editor.isActive('underline') && 'fill-yellow-400'
            }`}
          >
            <UnderlineIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`h-7 w-7 p-1 ${
              editor.isActive('highlight') && 'fill-yellow-400'
            }`}
          >
            <HighlightIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`h-7 w-7 p-1 ${
              editor.isActive('code') && 'fill-yellow-400'
            }`}
          >
            <CodeIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
            className={`h-7 w-7 p-1`}
          >
            <ClearFormattingIcon />
          </button>
        </BubbleMenu>
      )}
    </>
  );
};

export default SelectionMenu;
