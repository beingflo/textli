import { Popover, Transition } from '@headlessui/react';
import React from 'react';
import { get_notes } from '../../api/note_api';
import { user_logout } from '../../api/user_api';
import { useAppDispatch } from '../../context';
import { setCurrentNote } from '../../context/currentNoteReducer';
import { useAppEditor } from '../../context/editorReducer';
import { setNoteStatus } from '../../context/noteStatusReducer';
import {
  LinkIcon,
  LogoutIcon,
  MoreIcon,
  NewIcon,
  SettingsIcon,
} from '../../icons';
import { NoteStatus } from '../../types';
import { SaveAction } from './SaveAction';
import { DeleteAction } from './DeleteAction';

export const ActionGroup = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const editor = useAppEditor();

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
      <DeleteAction />
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
