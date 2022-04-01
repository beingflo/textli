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
import { ChatIcon, CloudUploadIcon } from '@heroicons/react/outline';

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
        className='fixed inset-0 z-20 overflow-y-auto'
      >
        <div className='flex min-h-screen justify-center'>
          <Transition.Child
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-400 opacity-40' />
          </Transition.Child>
          <Transition.Child
            enter='transition-opacity ease-linear duration-150'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-75'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='relative mx-auto my-4 min-w-sm max-w-sm rounded border border-gray-600 bg-white p-6 shadow-lg sm:min-w-lg sm:max-w-lg lg:min-w-3xl lg:max-w-3xl'>
              <div className='flex flex-row justify-between'>
                <Dialog.Title className='highlight inline text-2xl font-bold'>
                  Settings
                </Dialog.Title>

                <button
                  onClick={() => setShowSettings(false)}
                  className='outline-none'
                >
                  <CloseIcon className='h-6 w-6' />
                </button>
              </div>

              <Tab.Group vertical>
                <div className='mt-8 flex flex-col sm:flex-row'>
                  <Tab.List className='mb-4 flex flex-row flex-wrap justify-center gap-y-2 space-x-4 border-b border-dashed border-gray-400 pb-4 sm:mb-0 sm:mr-8 sm:w-max sm:flex-col sm:justify-start sm:gap-y-0 sm:space-x-0 sm:space-y-4 sm:border-none md:whitespace-nowrap'>
                    <Tab as={React.Fragment}>
                      {({ selected }) => (
                        <button className='flex focus:outline-none'>
                          <UsersIcon className='mr-2 h-5 w-5 self-center' />
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
                        <button className='flex focus:outline-none'>
                          <LinkIcon className='mr-2 h-5 w-5 self-center stroke-2' />
                          <span className={selected ? 'highlight' : ''}>
                            Shares
                          </span>
                        </button>
                      )}
                    </Tab>
                    <Tab as={React.Fragment}>
                      {({ selected }) => (
                        <button className='flex focus:outline-none'>
                          <BinIcon className='mr-2 h-5 w-5 self-center stroke-2' />
                          <span className={selected ? 'highlight' : ''}>
                            Bin
                          </span>
                        </button>
                      )}
                    </Tab>
                    <Tab as={React.Fragment}>
                      {({ selected }) => (
                        <button className='flex focus:outline-none'>
                          <DataIcon className='mr-2 h-5 w-5 self-center' />
                          <span className={selected ? 'highlight' : ''}>
                            Export
                          </span>
                        </button>
                      )}
                    </Tab>
                    <Tab as={React.Fragment}>
                      {({ selected }) => (
                        <button className='flex focus:outline-none'>
                          <CloudUploadIcon className='mr-2 h-5 w-5 self-center' />
                          <span className={selected ? 'highlight' : ''}>
                            Sync
                          </span>
                        </button>
                      )}
                    </Tab>
                    <Tab as={React.Fragment}>
                      {({ selected }) => (
                        <button className='flex focus:outline-none'>
                          <ChatIcon className='mr-2 h-5 w-5 self-center' />
                          <span className={selected ? 'highlight' : ''}>
                            Feedback
                          </span>
                        </button>
                      )}
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className='min-w-0 flex-grow'>
                    <Tab.Panel className='focus:outline-none'>
                      <GeneralSettings />
                    </Tab.Panel>
                    <Tab.Panel className='focus:outline-none'>
                      <Shares />
                    </Tab.Panel>
                    <Tab.Panel className='focus:outline-none'>
                      <Bin />
                    </Tab.Panel>
                    <Tab.Panel className='flex flex-row gap-1 focus:outline-none'>
                      <div className='flex w-full flex-col items-center'>
                        <div className='flex flex-col items-center'>
                          <HappyIcon className='h-16 w-16' />
                          <div>Coming soon</div>
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel className='flex flex-row gap-1 focus:outline-none'>
                      <div className='flex w-full flex-col items-center'>
                        <div className='flex flex-col items-center'>
                          <HappyIcon className='h-16 w-16' />
                          <div>Coming soon</div>
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel className='flex flex-row gap-1 focus:outline-none'>
                      <div className='flex w-full flex-col items-center'>
                        <div className='flex flex-col items-center'>
                          <HappyIcon className='h-16 w-16' />
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
