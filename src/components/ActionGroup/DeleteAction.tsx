import { Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { handleException } from '../../api';
import { useGetNote } from '../../api/hooks';
import { delete_note, undelete_note } from '../../api/note_api';
import { getEditorState, noteStatusState, useAppDispatch } from '../../context';
import {
  setCurrentNote,
  useCurrentNote,
} from '../../context/currentNoteReducer';
import { deleteFromNoteList } from '../../context/noteListReducer';
import { BinIcon } from '../../icons';
import { NoteStatus } from '../../types';

export const DeleteAction = (): React.ReactElement => {
  const currentNote = useCurrentNote();
  const dispatch = useAppDispatch();
  const [editor] = useAtom(getEditorState);
  const getNote = useGetNote();
  const [,setNoteStatus] = useAtom(noteStatusState);

  const [showUndelete, setShowUndelete] = React.useState(false);
  const [deletedNote, setDeletedNote] = React.useState('');

  const handleDelete = React.useCallback(() => {
    editor?.commands?.focus();

    if (!currentNote) {
      setNoteStatus(NoteStatus.SYNCED);

      editor?.commands.setContent('');

      setCurrentNote(undefined, dispatch);
      return;
    }

    setNoteStatus(NoteStatus.INPROGRESS);
    delete_note(currentNote?.id)
      .then(() => {
        setCurrentNote(undefined, dispatch);

        setDeletedNote(currentNote?.id);

        setShowUndelete(true);
        setTimeout(() => setShowUndelete(false), 5000);

        deleteFromNoteList(currentNote?.id, dispatch);
      })
      .catch((error) => {
        handleException(error);
      })
      .finally(() => {
        setNoteStatus(NoteStatus.SYNCED);
      });
  }, [currentNote, dispatch, showUndelete, editor]);

  useHotkeys(
    'command+d,ctrl+d',
    (event: KeyboardEvent) => {
      handleDelete();
      event.preventDefault();
    },
    { enableOnContentEditable: true },
    [handleDelete]
  );

  const handleUndelete = React.useCallback(() => {
    setNoteStatus(NoteStatus.INPROGRESS);

    undelete_note(deletedNote)
      .then(() => {
        getNote(deletedNote);
        setDeletedNote('');
        setShowUndelete(false);
      })
      .catch((error) => handleException(error))
      .finally(() => {
        setNoteStatus(NoteStatus.SYNCED);
      });
  }, [dispatch, deletedNote]);

  return (
    <div className="relative">
      <button
        onClick={handleDelete}
        disabled={!currentNote}
        className="disabled:opacity-60"
      >
        <BinIcon className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
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
