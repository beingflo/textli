import { BubbleMenu } from '@tiptap/react';
import React from 'react';
import {
  BoldIcon,
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
          tippyOptions={{ duration: 100 }}
          className="grid grid-rows-1 grid-flow-col divide-x divide-black bg-white rounded border border-gray-800 black fill-gray-800"
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1 w-7 h-7 ${
              editor.isActive('bold') && 'fill-yellow-400'
            }`}
          >
            <BoldIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1 w-7 h-7 ${
              editor.isActive('italic') && 'fill-yellow-400'
            }`}
          >
            <ItalicIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1 w-7 h-7 ${
              editor.isActive('strike') && 'fill-yellow-400'
            }`}
          >
            <StrikeIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`p-1 w-7 h-7 ${
              editor.isActive('highlight') && 'fill-yellow-400'
            }`}
          >
            <HighlightIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1 w-7 h-7 ${
              editor.isActive('underline') && 'fill-yellow-400'
            }`}
          >
            <UnderlineIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-1 w-7 h-7 ${
              editor.isActive('code') && 'fill-yellow-400'
            }`}
          >
            <CodeIcon />
          </button>
        </BubbleMenu>
      )}
    </>
  );
};

export default SelectionMenu;
