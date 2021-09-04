import { Transition } from '@headlessui/react';
import React from 'react';
import { get_notes, save_note, update_note } from '../../api/note_api';
import { useAppDispatch } from '../../context';
import { useCurrentNote } from '../../context/currentNoteReducer';
import { useAppEditor } from '../../context/editorReducer';
import { setNoteStatus, useNoteStatus } from '../../context/noteStatusReducer';
import { CheckIcon, SaveIcon } from '../../icons';
import { NoteStatus } from '../../types';
import { getMetadata } from '../util';

export const SaveAction = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const editor = useAppEditor();
  const noteStatus = useNoteStatus();
  const currentNote = useCurrentNote();

  const [showSaveConfirm, setShowSaveConfirm] = React.useState(false);

  const handleSave = React.useCallback(() => {
    editor?.commands?.focus();

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
        metadata: getMetadata(content),
        key: '',
        public: false,
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
      metadata: getMetadata(content),
      key: '',
      public: false,
      content: content,
    };

    setNoteStatus(NoteStatus.INPROGRESS, dispatch);
    update_note(currentNote?.id ?? '', request, dispatch, () => {
      get_notes(dispatch);
      setNoteStatus(NoteStatus.SYNCED, dispatch);
    });
  }, [currentNote, dispatch, editor, noteStatus]);

  return (
    <div className="relative">
      <button onClick={handleSave}>
        <SaveIcon className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
      </button>
      <Transition
        show={showSaveConfirm}
        enter="transition-opacity ease-linear duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute top-0.5 right-8"
      >
        <CheckIcon className="h-4 w-4 text-green-600" />
      </Transition>
    </div>
  );
};
