import { Transition } from '@headlessui/react';
import React from 'react';
import Editor from './Editor';
import Sidebar from './Sidebar';
import ActionGroup from './ActionGroup/ActionGroup';
import { NoteStatus } from './NoteStatus';
import { ArrowRightIcon } from '../icons';

const App = (): React.ReactElement => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const [query, setQuery] = React.useState('');

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
            className="absolute bg-white border-r border-dashed border-gray-400 z-20 w-80 sm:w-96 min-h-full"
          >
            <Sidebar
              setHide={() => setShowSidebar(false)}
              query={query}
              setQuery={setQuery}
            />
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
            <ArrowRightIcon className="h-6 w-6 text-gray-700 hover:translate-x-0.5 transform transition active:scale-90" />
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
