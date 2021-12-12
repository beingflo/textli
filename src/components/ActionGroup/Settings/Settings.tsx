import { Dialog, Tab, Transition } from '@headlessui/react';
import React from 'react';
import {
  BinIcon,
  CloseIcon,
  DataIcon,
  HappyIcon,
  LinkIcon,
  UsersIcon,
} from '../../../icons';
import Bin from './Bin';
import Shares from './Shares';
import GeneralSettings from './GeneralSettings';

export type Props = {
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
};

export const Settings = ({
  showSettings,
  setShowSettings,
}: Props): React.ReactElement => {
  return (
    <Transition show={showSettings} as={React.Fragment} appear>
      <Dialog
        onClose={() => setShowSettings(false)}
        className="fixed z-20 inset-0 overflow-y-auto"
      >
        <div className="flex justify-center min-h-screen">
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
            <div className="relative p-6 bg-white border border-gray-300 border-dashed shadow-lg rounded mx-auto max-w-sm min-w-sm sm:min-w-lg sm:max-w-lg lg:min-w-3xl lg:max-w-3xl my-4">
              <div className="flex flex-row justify-between">
                <Dialog.Title className="text-2xl font-bold highlight inline">
                  Settings
                </Dialog.Title>

                <button onClick={() => setShowSettings(false)}>
                  <CloseIcon className="h-6 w-6" />
                </button>
              </div>

              <Tab.Group vertical>
                <div className="flex flex-col sm:flex-row mt-8">
                  <Tab.List className="flex flex-row flex-wrap gap-y-2 justify-center border-b border-gray-400 pb-4 mb-4 border-dashed sm:border-none sm:flex-col sm:justify-start sm:gap-y-0 sm:w-max md:whitespace-nowrap space-x-4 sm:space-x-0 sm:space-y-4 sm:mb-0 sm:mr-8">
                    <Tab as={React.Fragment}>
                      {({ selected }) => (
                        <button className="flex">
                          <UsersIcon className="h-5 w-5 mr-2 self-center" />
                          <span
                            className={`${
                              selected ? 'highlight' : ''
                            } whitespace-nowrap`}
                          >
                            General
                          </span>
                        </button>
                      )}
                    </Tab>
                    <Tab as={React.Fragment}>
                      {({ selected }) => (
                        <button className="flex">
                          <LinkIcon className="h-5 w-5 mr-2 self-center" />
                          <span className={selected ? 'highlight' : ''}>
                            Shares
                          </span>
                        </button>
                      )}
                    </Tab>
                    <Tab as={React.Fragment}>
                      {({ selected }) => (
                        <button className="flex">
                          <BinIcon className="h-5 w-5 mr-2 self-center" />
                          <span className={selected ? 'highlight' : ''}>
                            Bin
                          </span>
                        </button>
                      )}
                    </Tab>
                    <Tab as={React.Fragment}>
                      {({ selected }) => (
                        <button className="flex">
                          <DataIcon className="h-5 w-5 mr-2 self-center" />
                          <span className={selected ? 'highlight' : ''}>
                            Export
                          </span>
                        </button>
                      )}
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className="flex-grow min-w-0">
                    <Tab.Panel>
                      <GeneralSettings />
                    </Tab.Panel>
                    <Tab.Panel>
                      <Shares />
                    </Tab.Panel>
                    <Tab.Panel>
                      <Bin />
                    </Tab.Panel>
                    <Tab.Panel className="flex flex-row gap-1">
                      <div className="w-full flex flex-col items-center">
                        <div className="flex flex-col items-center">
                          <HappyIcon className="w-16 h-16" />
                          <div>Coming soon</div>
                        </div>
                      </div>
                    </Tab.Panel>
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
