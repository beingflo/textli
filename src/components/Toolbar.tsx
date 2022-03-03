import { Transition } from '@headlessui/react';
import React from 'react';
import {
  AlignLeftIcon,
  CheckListIcon,
  CodeBlockIcon,
  FormattingIcon,
  Heading1Icon,
  ImageIcon,
  OrderedListIcon,
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
        <FormattingIcon className="h-7 w-7 sm:h-6 sm:w-6 ml-0.5" />
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
        <Heading1Icon className="h-6 w-6" />
        <UnorderedListIcon className="h-6 w-6" />
        <CodeBlockIcon className="h-6 w-6" />
        <QuoteIcon className="h-6 w-6" />
        <ImageIcon className="h-6 w-6" />
        <TableIcon className="h-6 w-6" />
        <AlignLeftIcon className="h-6 w-6" />
        <SeparatorIcon className="h-6 w-6" />
      </Transition>
    </div>
  );
};

export default Toolbar;
