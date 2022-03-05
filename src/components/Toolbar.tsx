import { Transition } from '@headlessui/react';
import React from 'react';
import {
  AlignLeftIcon,
  CodeBlockIcon,
  FormattingIcon,
  Heading1Icon,
  ImageIcon,
  QuoteIcon,
  SeparatorIcon,
  TableIcon,
  UnorderedListIcon,
} from '../icons';

export const Toolbar = (): React.ReactElement => {
  const [showToolbar, setShowToolbar] = React.useState(true);

  return (
    <div className="fixed top-0 z-10 sm:top-10 sm:left-0">
      <button
        onClick={() => setShowToolbar((old) => !old)}
        className="fixed ml-5 mt-6 outline-none text-gray-800 hover:translate-x-0.5 transition active:scale-90"
      >
        <FormattingIcon className="h-7 w-7 mt-0.5 ml-10 sm:ml-0.5 sm:h-6 sm:w-6" />
      </button>
      <Transition
        show={showToolbar}
        enter="transition-opacity ease-linear duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-75"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed mt-14 ml-6 sm:mt-16 sm:ml-5 z-10 bg-white border p-1 sm:p-0 sm:border-0 shadow-lg sm:shadow-none rounded sm:rounded-none flex sm:flex-col gap-4 text-gray-700 sm:border-t border-gray-600 sm:pt-4"
      >
        <Heading1Icon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
        <UnorderedListIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
        <CodeBlockIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
        <QuoteIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
        <ImageIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
        <TableIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
        <AlignLeftIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
        <SeparatorIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
      </Transition>
    </div>
  );
};

export default Toolbar;
