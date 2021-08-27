import { Popover, Transition } from '@headlessui/react';
import React from 'react';
import {
  delete_note,
  get_note,
  get_notes,
  undelete_note,
} from '../../api/note_api';
import { user_logout } from '../../api/user_api';
import { useAppDispatch } from '../../context';
import {
  setCurrentNote,
  useCurrentNote,
} from '../../context/currentNoteReducer';
import { useAppEditor } from '../../context/editorReducer';
import { setNoteStatus } from '../../context/noteStatusReducer';
import {
  DeleteIcon,
  LinkIcon,
  LogoutIcon,
  MoreIcon,
  NewIcon,
  SettingsIcon,
} from '../../icons';
import { NoteStatus } from '../../types';
import { SaveAction } from './SaveAction';

export const ActionGroup = (): React.ReactElement => {
  const currentNote = useCurrentNote();
  const dispatch = useAppDispatch();
  const editor = useAppEditor();

  const [showUndelete, setShowUndelete] = React.useState(false);
  const [deletedNote, setDeletedNote] = React.useState('');

  const handleDelete = React.useCallback(() => {
    if (!currentNote) {
      handleNew();
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
  }, [currentNote, dispatch, showUndelete]);

  const handleUndelete = React.useCallback(() => {
    setNoteStatus(NoteStatus.INPROGRESS, dispatch);

    undelete_note(deletedNote, () => {
      get_notes(dispatch);
      get_note(deletedNote, dispatch);
      setNoteStatus(NoteStatus.SYNCED, dispatch);
      setDeletedNote('');
    });
  }, [dispatch, deletedNote]);

  const handleNew = React.useCallback(() => {
    // If unsaved, handle gracefully
    setNoteStatus(NoteStatus.SYNCED, dispatch);
    editor?.commands.setContent('');
    setCurrentNote(undefined, dispatch);
  }, [dispatch, editor]);

  const handleLogout = React.useCallback(() => {
    user_logout(() => get_notes(dispatch));
  }, [dispatch]);

  return (
    <div className="space-y-2">
      <SaveAction />
      <button onClick={handleNew}>
        <NewIcon className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
      </button>
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
            className="absolute top-0 right-8 text-gray-700 bg-yellow-100 rounded-sm px-1
                       hover:-translate-x-0.5 transform transition active:scale-90"
          >
            Undo
          </button>
        </Transition>
      </div>
      <Popover className="relative">
        <Popover.Button>
          <MoreIcon className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
        </Popover.Button>
        <Transition
          enter="transition-opacity ease-linear duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Panel className="absolute top-8 left-0">
            <div className="space-y-2">
              <button>
                <LinkIcon className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
              </button>
              <button>
                <SettingsIcon className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
              </button>
              <button onClick={handleLogout}>
                <LogoutIcon className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
              </button>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};

export default ActionGroup;
