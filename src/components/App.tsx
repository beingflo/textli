import { Transition } from '@headlessui/react';
import React from 'react';
import Editor from './Editor';
import Sidebar from './Sidebar';
import ActionGroup from './ActionGroup';

const App = (): React.ReactElement => {
  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <div className="h-auto flex justify-between w-full relative">
      <div className="w-12">
        <Transition
          show={showSidebar}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          className="absolute bg-gray-50 z-10 shadow-2xl h-full w-80 sm:w-96"
        >
          <Sidebar setHide={() => setShowSidebar(false)} />
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
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </button>
        </Transition>
      </div>
      <div className="max-w-xxs sm:max-w-md md:min-w-sm lg:max-w-6xl">
        <Editor />
      </div>
      <div className="pr-6 h-auto">
        <ActionGroup />
      </div>
    </div>
  );
};

export default App;
