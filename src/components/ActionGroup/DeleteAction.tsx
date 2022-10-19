import { Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { handleException } from '../../api';
import { useGetDeletedNoteList, useGetNote } from '../../api/hooks';
import { delete_note, undelete_note } from '../../api/note_api';
import {
  currentNoteState,
  deleteFromNoteListState,
  getEditorState,
  noteStatusState,
  sharesState,
} from '../state';
import { BinIcon } from '../../icons';
import { NoteStatus } from '../../types';
import { useLocation } from 'wouter';
import { list_shares } from '../../api/share_api';

export const DeleteAction = (): React.ReactElement => {
  const getDeletedNoteList = useGetDeletedNoteList();
  const [currentNote, setCurrentNote] = useAtom(currentNoteState);
  const [, setShares] = useAtom(sharesState);
  const [editor] = useAtom(getEditorState);
  const getNote = useGetNote();
  const [noteStatus, setNoteStatus] = useAtom(noteStatusState);
  const [, deleteFromNoteList] = useAtom(deleteFromNoteListState);
  const [, setLocation] = useLocation();

  const [showUndelete, setShowUndelete] = React.useState(false);
  const [deletedNote, setDeletedNote] = React.useState('');

  const handleDelete = React.useCallback(() => {
    editor?.commands?.focus();

    if (!currentNote) {
      setNoteStatus(NoteStatus.SYNCED);

      editor?.commands.setContent('');

      setCurrentNote(undefined);
      setLocation('/');
      return;
    }

    setNoteStatus(NoteStatus.INPROGRESS);
    delete_note(currentNote?.id)
      .then(() => {
        setCurrentNote(undefined);
        setLocation('/');

        setDeletedNote(currentNote?.id);

        setShowUndelete(true);
        setTimeout(() => setShowUndelete(false), 5000);

        deleteFromNoteList(currentNote?.id);
        getDeletedNoteList();
        list_shares(setShares, false);
      })
      .catch((error) => {
        handleException(error);
      })
      .finally(() => {
        setNoteStatus(NoteStatus.SYNCED);
      });
  }, [currentNote, showUndelete, editor, setShares]);

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
        setLocation(`/note/${deletedNote}`);
        setDeletedNote('');
        setShowUndelete(false);
      })
      .catch((error) => handleException(error))
      .finally(() => {
        setNoteStatus(NoteStatus.SYNCED);
      });
  }, [deletedNote]);

  return (
    <div className='relative'>
      <button
        onClick={handleDelete}
        disabled={!currentNote && noteStatus !== NoteStatus.CHANGED}
        className='disabled:opacity-60'
      >
        <BinIcon className='h-7 w-7 text-black transition hover:-translate-x-0.5 active:scale-90 sm:h-6 sm:w-6' />
      </button>
      <Transition
        show={showUndelete}
        enter='transition-opacity ease-linear duration-500'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity ease-linear duration-500'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <button
          onClick={handleUndelete}
          className='absolute -right-3 rounded-sm bg-yellow-400 px-1 text-white transition hover:-translate-x-0.5
                       active:scale-90 sm:top-0 sm:right-8'
        >
          Undo
        </button>
      </Transition>
    </div>
  );
};
