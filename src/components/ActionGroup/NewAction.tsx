import React from 'react';
import { useAppDispatch } from '../../context';
import { setCurrentNote } from '../../context/currentNoteReducer';
import { useAppEditor } from '../../context/editorReducer';
import { setNoteStatus } from '../../context/noteStatusReducer';
import { NewIcon } from '../../icons';
import { NoteStatus } from '../../types';

export const NewAction = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const editor = useAppEditor();

  const handleNew = React.useCallback(() => {
    // If unsaved, handle gracefully
    setNoteStatus(NoteStatus.SYNCED, dispatch);

    editor?.commands.setContent('');
    editor?.commands?.focus();

    setCurrentNote(undefined, dispatch);
  }, [dispatch, editor]);

  return (
    <button onClick={handleNew}>
      <NewIcon className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
    </button>
  );
};
