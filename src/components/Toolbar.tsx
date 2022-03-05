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
    <div className="fixed top-0 left-10 z-10 sm:top-10 sm:left-0">
      <button
        onClick={() => setShowToolbar((old) => !old)}
        className="fixed ml-5 mt-6 outline-none text-gray-800 hover:translate-x-0.5 transition active:scale-90"
      >
        <FormattingIcon className="h-6 w-6 sm:ml-0.5 sm:h-5 sm:w-5" />
      </button>
      <Transition
        show={showToolbar}
        enter="transition-opacity ease-linear duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-75"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed mt-16 ml-5 z-10 flex flex-col gap-3"
      >
        <Heading1Icon className="h-6 w-6 sm:ml-0.5 sm:h-5 sm:w-5" />
        <UnorderedListIcon className="h-6 w-6 sm:ml-0.5 sm:h-5 sm:w-5" />
        <CodeBlockIcon className="h-6 w-6 sm:ml-0.5 sm:h-5 sm:w-5" />
        <QuoteIcon className="h-6 w-6 sm:ml-0.5 sm:h-5 sm:w-5" />
        <ImageIcon className="h-6 w-6 sm:ml-0.5 sm:h-5 sm:w-5" />
        <TableIcon className="h-6 w-6 sm:ml-0.5 sm:h-5 sm:w-5" />
        <AlignLeftIcon className="h-6 w-6 sm:ml-0.5 sm:h-5 sm:w-5" />
        <SeparatorIcon className="h-6 w-6 sm:ml-0.5 sm:h-5 sm:w-5" />
      </Transition>
    </div>
  );
};

export default Toolbar;
