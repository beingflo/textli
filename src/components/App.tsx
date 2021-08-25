import { Transition } from '@headlessui/react';
import React from 'react';
import Editor from './Editor';
import Sidebar from './Sidebar';
import ActionGroup from './ActionGroup';

const App = (): React.ReactElement => {
  const [showSidebar, setShowSidebar] = React.useState(true);

  return (
    <div className="h-auto flex justify-between w-full">
      <div className="w-1/3 relative">
        <Transition
          show={showSidebar}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <Sidebar setHide={() => setShowSidebar(false)} />
        </Transition>
        <Transition
          show={!showSidebar}
          enter="transition-opacity duration-150 delay-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <button className="p-6" onClick={() => setShowSidebar(!showSidebar)}>
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
      <div className="flex-grow">
        <Editor />
      </div>
      <div className="pr-4 h-auto">
        <ActionGroup />
      </div>
    </div>
  );
};

export default App;
