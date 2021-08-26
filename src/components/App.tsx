import { Transition } from '@headlessui/react';
import React from 'react';
import Editor from './Editor';
import Sidebar from './Sidebar';
import ActionGroup from './ActionGroup';
import { NoteStatus } from './NoteStatus';

const App = (): React.ReactElement => {
  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <div className="h-auto flex justify-between w-full relative">
      <div className="w-12">
        <Transition show={showSidebar}>
          <Transition.Child
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            className="absolute bg-gray-100 z-20 shadow-2xl h-full w-80 sm:w-96"
          >
            <Sidebar setHide={() => setShowSidebar(false)} />
          </Transition.Child>
        </Transition>
        <Transition
          show={!showSidebar}
          enter="transition-opacity duration-150 delay-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="absolute"
        >
          <button
            className="pl-6 pt-6"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700 hover:translate-x-0.5 transform transition active:scale-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </Transition>
      </div>
      <div className="max-w-xxs sm:max-w-md md:min-w-sm lg:max-w-6xl">
        <Editor />
      </div>
      <div className="pr-6 pt-6 h-auto">
        <ActionGroup />
      </div>
      <NoteStatus />
    </div>
  );
};

export default App;
