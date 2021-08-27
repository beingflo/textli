import { Popover, Transition } from '@headlessui/react';
import React from 'react';
import {
  delete_note,
  get_note,
  get_notes,
  save_note,
  undelete_note,
  update_note,
} from '../api/note_api';
import { user_logout } from '../api/user_api';
import { useAppDispatch } from '../context';
import { setCurrentNote, useCurrentNote } from '../context/currentNoteReducer';
import { useAppEditor } from '../context/editorReducer';
import { setNoteStatus, useNoteStatus } from '../context/noteStatusReducer';
import { NoteStatus } from '../types';
import { getMetainfo } from './util';

export const ActionGroup = (): React.ReactElement => {
  const currentNote = useCurrentNote();
  const dispatch = useAppDispatch();
  const editor = useAppEditor();
  const noteStatus = useNoteStatus();

  const [showUndelete, setShowUndelete] = React.useState(false);
  const [deletedNote, setDeletedNote] = React.useState('');
  const [showSaveConfirm, setShowSaveConfirm] = React.useState(false);

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

  const handleSave = React.useCallback(() => {
    const content = editor?.getHTML() ?? '';

    setShowSaveConfirm(true);
    setTimeout(() => setShowSaveConfirm(false), 1000);

    // No changes to be saved
    if (noteStatus === NoteStatus.SYNCED) {
      return;
    }

    // New note
    if (!currentNote) {
      const request = {
        metainfo: getMetainfo(content),
        encrypted_key: '',
        content: content,
      };

      setNoteStatus(NoteStatus.INPROGRESS, dispatch);
      save_note(request, dispatch, () => {
        get_notes(dispatch);
        setNoteStatus(NoteStatus.SYNCED, dispatch);
      });
      return;
    }

    // Existing note
    const request = {
      metainfo: getMetainfo(content),
      encrypted_key: '',
      content: content,
    };

    setNoteStatus(NoteStatus.INPROGRESS, dispatch);
    update_note(currentNote?.id ?? '', request, dispatch, () => {
      get_notes(dispatch);
      setNoteStatus(NoteStatus.SYNCED, dispatch);
    });
  }, [currentNote, dispatch, editor, noteStatus]);

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
    <div className="grid grid-cols-1 space-y-2">
      <div className="relative">
        <button onClick={handleSave}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90"
          >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
        </button>
        <Transition
          show={showSaveConfirm}
          enter="transition-opacity ease-linear duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-4 w-4 text-green-600 absolute top-0.5 right-8 rounded-sm"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </Transition>
      </div>
      <button onClick={handleNew}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="12" y1="18" x2="12" y2="12"></line>
          <line x1="9" y1="15" x2="15" y2="15"></line>
        </svg>
      </button>
      <div className="relative">
        <button onClick={handleDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
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
            <div className="bg-white space-y-2">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90"
                >
                  <line x1="4" y1="21" x2="4" y2="14"></line>
                  <line x1="4" y1="10" x2="4" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12" y2="3"></line>
                  <line x1="20" y1="21" x2="20" y2="16"></line>
                  <line x1="20" y1="12" x2="20" y2="3"></line>
                  <line x1="1" y1="14" x2="7" y2="14"></line>
                  <line x1="9" y1="8" x2="15" y2="8"></line>
                  <line x1="17" y1="16" x2="23" y2="16"></line>
                </svg>
              </button>
              <button onClick={handleLogout}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};

export default ActionGroup;
