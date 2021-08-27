import { Transition } from '@headlessui/react';
import React from 'react';
import {
  delete_note,
  get_note,
  get_notes,
  undelete_note,
} from '../../api/note_api';
import { useAppDispatch } from '../../context';
import {
  setCurrentNote,
  useCurrentNote,
} from '../../context/currentNoteReducer';
import { useAppEditor } from '../../context/editorReducer';
import { setNoteStatus } from '../../context/noteStatusReducer';
import { DeleteIcon } from '../../icons';
import { NoteStatus } from '../../types';

export const DeleteAction = (): React.ReactElement => {
  const currentNote = useCurrentNote();
  const dispatch = useAppDispatch();
  const editor = useAppEditor();

  const [showUndelete, setShowUndelete] = React.useState(false);
  const [deletedNote, setDeletedNote] = React.useState('');

  const handleDelete = React.useCallback(() => {
    editor?.commands?.focus();

    if (!currentNote) {
      setNoteStatus(NoteStatus.SYNCED, dispatch);

      editor?.commands.setContent('');

      setCurrentNote(undefined, dispatch);
      return;
    }

    setShowUndelete(true);
    setTimeout(() => setShowUndelete(false), 5000);

    setDeletedNote(currentNote?.id);

    setNoteStatus(NoteStatus.INPROGRESS, dispatch);
    delete_note(currentNote?.id, () => {
      get_notes(dispatch);
      setCurrentNote(undefined, dispatch);
      setNoteStatus(NoteStatus.SYNCED, dispatch);
    });
  }, [currentNote, dispatch, showUndelete, editor]);

  const handleUndelete = React.useCallback(() => {
    setNoteStatus(NoteStatus.INPROGRESS, dispatch);

    undelete_note(deletedNote, () => {
      get_notes(dispatch);
      get_note(deletedNote, dispatch);
      setNoteStatus(NoteStatus.SYNCED, dispatch);
      setDeletedNote('');
    });
  }, [dispatch, deletedNote]);

  return (
    <div className="relative">
      <button onClick={handleDelete}>
        <DeleteIcon className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
      </button>
      <Transition
        show={showUndelete}
        enter="transition-opacity ease-linear duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <button
          onClick={handleUndelete}
          className="absolute top-0 right-8 text-white bg-yellow-400 rounded-sm px-1
                       hover:-translate-x-0.5 transform transition active:scale-90"
        >
          Undo
        </button>
      </Transition>
    </div>
  );
};
