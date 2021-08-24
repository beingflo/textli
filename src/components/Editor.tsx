import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';

export const Editor = (): React.ReactElement => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content: '<p>Write something nice...</p>',
    autofocus: 'end',
    editable: true,
    editorProps: {
      attributes: {
        class: 'prose p-2 focus:outline-none h-screen',
      },
    },
  });

  return <EditorContent editor={editor} />;
};

export default Editor;
