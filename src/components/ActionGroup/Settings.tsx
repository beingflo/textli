import { Dialog, Tab, Transition } from '@headlessui/react';
import React from 'react';
import {
  BinIcon,
  CashIcon,
  CloseIcon,
  EyeIcon,
  KeyIcon,
  LinkIcon,
  UsersIcon,
} from '../../icons';

export type Props = {
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
};

export const Settings = ({
  showSettings,
  setShowSettings,
}: Props): React.ReactElement => {
  return (
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
            <Dialog.Overlay className="fixed inset-0 bg-gray-200 opacity-30" />
          </Transition.Child>
          <Transition.Child
            enter="transition-opacity ease-linear duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-75"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="relative p-6 bg-gray-50 shadow-lg rounded max-w-lg mx-auto">
              <div className="flex flex-row justify-between min-w-md">
                <Dialog.Title className="text-2xl font-bold highlight inline">
                  Settings
                </Dialog.Title>

                <button onClick={() => setShowSettings(false)}>
                  <CloseIcon className="h-6 w-6" />
                </button>
              </div>

              <Tab.Group vertical>
                <div className="flex justify-between mt-8">
                  <Tab.List className="flex flex-col w-max space-y-4">
                    <Tab className="flex">
                      <CashIcon className="h-5 w-5 mr-2 self-center" />
                      <span>Balance</span>
                    </Tab>
                    <Tab className="flex">
                      <LinkIcon className="h-5 w-5 mr-2 self-center" />
                      <span>Shares</span>
                    </Tab>
                    <Tab className="flex">
                      <EyeIcon className="h-5 w-5 mr-2 self-center" />
                      <span>Publications</span>
                    </Tab>
                    <Tab className="flex">
                      <BinIcon className="h-5 w-5 mr-2 self-center" />
                      <span>Bin</span>
                    </Tab>
                    <Tab className="flex">
                      <KeyIcon className="h-5 w-5 mr-2 self-center" />
                      Workspaces
                    </Tab>
                    <Tab className="flex">
                      <UsersIcon className="h-5 w-5 mr-2 self-center" />
                      <span>User settings</span>
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className="flex-grow ml-4">
                    <Tab.Panel>Content 1</Tab.Panel>
                    <Tab.Panel>Content 2</Tab.Panel>
                    <Tab.Panel>Content 3</Tab.Panel>
                    <Tab.Panel>Content 4</Tab.Panel>
                    <Tab.Panel>Content 5</Tab.Panel>
                    <Tab.Panel>Content 6</Tab.Panel>
                  </Tab.Panels>
                </div>
              </Tab.Group>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Settings;
