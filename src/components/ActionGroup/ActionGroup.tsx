import { Dialog, Popover, Transition } from '@headlessui/react';
import React from 'react';
import { get_notes } from '../../api/note_api';
import { user_logout } from '../../api/user_api';
import { useAppDispatch } from '../../context';
import {
  CloseIcon,
  LinkIcon,
  LogoutIcon,
  MoreIcon,
  SettingsIcon,
} from '../../icons';
import { SaveAction } from './SaveAction';
import { DeleteAction } from './DeleteAction';
import { NewAction } from './NewAction';
import '../../style.css';

export const ActionGroup = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const [showSettings, setShowSettings] = React.useState(false);

  const handleLogout = React.useCallback(() => {
    user_logout(() => get_notes(dispatch));
  }, [dispatch]);

  return (
    <div className="space-y-2">
      <SaveAction />
      <NewAction />
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
              <button onClick={() => setShowSettings(true)}>
                <SettingsIcon className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
              </button>
              <button onClick={handleLogout}>
                <LogoutIcon className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
              </button>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <Transition show={showSettings} as={React.Fragment}>
        <Dialog
          onClose={() => setShowSettings(false)}
          className="fixed z-10 inset-0 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-200 opacity-40" />
            </Transition.Child>
            <Transition.Child
              enter="transition-opacity ease-linear duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-75"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="relative p-6 bg-white rounded max-w-lg mx-auto">
                <div className="flex flex-row justify-between min-w-md">
                  <Dialog.Title className="text-2xl font-bold highlight inline">
                    Settings
                  </Dialog.Title>

                  <button onClick={() => setShowSettings(false)}>
                    <CloseIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ActionGroup;
