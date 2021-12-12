import { useAtom } from 'jotai';
import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { currentNoteState, getEditorState, noteStatusState } from '../state';
import { NewIcon } from '../../icons';
import { NoteStatus } from '../../types';

export const NewAction = (): React.ReactElement => {
  const [editor] = useAtom(getEditorState);
  const [, setNoteStatus] = useAtom(noteStatusState);
  const [, setCurrentNote] = useAtom(currentNoteState);

  const handleNew = React.useCallback(() => {
    // If unsaved, handle gracefully
    setNoteStatus(NoteStatus.SYNCED);

    editor?.commands.setContent('');
    editor?.commands?.focus();

    setCurrentNote(undefined);
  }, [editor]);

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
    <div>
      <button onClick={handleNew}>
        <NewIcon className="h-7 w-7 sm:h-6 sm:w-6 text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
      </button>
    </div>
  );
};
