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
import { useCurrentNote } from '../context/currentNoteReducer';
import './editorStyles.css';
import { editorState, useAppDispatch } from '../context';
import { setNoteStatus } from '../context/noteStatusReducer';
import { NoteStatus } from '../types';
import { useAtom } from 'jotai';

export const Editor = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const note = useCurrentNote();
  const [,setEditor] = useAtom(editorState);

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
    content: '',
    editorProps: {
      attributes: {
        class:
          'prose prose-sm md:prose py-6 px-2 focus:outline-none min-h-screen',
      },
    },
    onUpdate() {
      setNoteStatus(NoteStatus.CHANGED, dispatch);
    },
  });

  React.useEffect(() => {
    editor?.commands?.setContent(note?.content ?? '');
  }, [note]);

  React.useEffect(() => {
    setEditor(editor);
  }, [editor]);

  return <EditorContent editor={editor} />;
};

export default Editor;
