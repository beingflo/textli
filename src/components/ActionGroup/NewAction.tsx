import { useAtom } from 'jotai';
import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { getEditorState, useAppDispatch } from '../../context';
import { setCurrentNote } from '../../context/currentNoteReducer';
import { setNoteStatus } from '../../context/noteStatusReducer';
import { NewIcon } from '../../icons';
import { NoteStatus } from '../../types';

export const NewAction = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const [editor] = useAtom(getEditorState);

  const handleNew = React.useCallback(() => {
    // If unsaved, handle gracefully
    setNoteStatus(NoteStatus.SYNCED, dispatch);

    editor?.commands.setContent('');
    editor?.commands?.focus();

    setCurrentNote(undefined, dispatch);
  }, [dispatch, editor]);

  useHotkeys(
    'command+e,ctrl+e',
    (event: KeyboardEvent) => {
      handleNew();
      event.preventDefault();
    },
    { enableOnContentEditable: true },
    [handleNew]
  );

  return (
    <button onClick={handleNew}>
      <NewIcon className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
    </button>
  );
};
