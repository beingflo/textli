import React from 'react';
import {
  delete_note,
  get_notes,
  save_note,
  update_note,
} from '../api/note_api';
import { useAppDispatch } from '../context';
import { setCurrentNote, useCurrentNote } from '../context/currentNoteReducer';
import { useAppEditor } from '../context/editorReducer';
import { getMetainfo } from './util';

export const ActionGroup = (): React.ReactElement => {
  const currentNote = useCurrentNote();
  const dispatch = useAppDispatch();
  const editor = useAppEditor();

  const handleDelete = React.useCallback(() => {
    if (!currentNote) {
      //TODO Handle more gracefully
      console.log('No file to delete');
      return;
    }

    delete_note(currentNote?.id, () => {
      get_notes(dispatch);
      setCurrentNote(undefined, dispatch);
    });
  }, [currentNote, dispatch]);

  const handleSave = React.useCallback(() => {
    const content = editor?.getHTML() ?? '';
    // New note
    if (!currentNote) {
      const request = {
        metainfo: getMetainfo(content),
        encrypted_key: '',
        content: content,
      };

      save_note(request, dispatch, () => get_notes(dispatch));
      return;
    }

    // Existing note
    const request = {
      metainfo: getMetainfo(content),
      encrypted_key: '',
      content: content,
    };

    update_note(currentNote?.id ?? '', request, dispatch, () =>
      get_notes(dispatch)
    );
  }, [currentNote, dispatch, editor]);

  const handleNew = React.useCallback(() => {
    // If unsaved, handle gracefully

    setCurrentNote(undefined, dispatch);
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 space-y-2 sticky top-4">
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
          className="text-gray-700 hover:-translate-x-0.5 transform transition active:text-yellow-300"
        >
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="19" cy="12" r="1"></circle>
          <circle cx="5" cy="12" r="1"></circle>
        </svg>
      </button>
    </div>
  );
};

export default ActionGroup;
