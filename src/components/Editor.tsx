import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import './editorStyles.css';

export const Editor = (): React.ReactElement => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: 'Write something nice ...',
      }),
      FontFamily,
      TextStyle,
    ],
    autofocus: 'end',
    editable: true,
    content: null,
    editorProps: {
      attributes: {
        class: 'prose p-2 focus:outline-none h-screen',
      },
    },
  });

  return <EditorContent editor={editor} />;
};

export default Editor;
