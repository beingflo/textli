import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import Image from '@tiptap/extension-image';
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
      TextStyle,
      Link,
      Image,
      Table,
      TableCell,
      TableRow,
      TableHeader,
    ],
    autofocus: 'end',
    editable: true,
    content: null,
    editorProps: {
      attributes: {
        class: 'prose p-8 focus:outline-none min-h-screen max-w-full',
      },
    },
  });

  return <EditorContent editor={editor} />;
};

export default Editor;
