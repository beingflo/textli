import React from 'react';
import { Transition } from '@headlessui/react';
import Tippy from '@tippyjs/react';
import { useAtom } from 'jotai';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  CheckListIcon,
  CodeBlockIcon,
  FormattingIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  ImageIcon,
  OrderedListIcon,
  QuoteIcon,
  SeparatorIcon,
  TableIcon,
  UnorderedListIcon,
} from '../icons';
import { getEditorState } from './state';

export const Toolbar = (): React.ReactElement => {
  const [showToolbar, setShowToolbar] = React.useState(true);
  const [editor] = useAtom(getEditorState);

  const HeadingTooltip = () => (
    <div className="flex flex-row gap-2.5">
      <button
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2Icon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
      </button>
      <button
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <Heading3Icon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
      </button>
      <button
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 4 }).run()
        }
      >
        <Heading4Icon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
      </button>
    </div>
  );

  const ListTooltip = () => (
    <div className="flex flex-row gap-2.5">
      <button onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
        <OrderedListIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
      </button>
      <button onClick={() => editor?.chain().focus().toggleTaskList().run()}>
        <CheckListIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
      </button>
    </div>
  );

  const AlignmentTooltip = () => (
    <div className="flex flex-row gap-2.5">
      <button
        onClick={() => editor?.chain().focus().setTextAlign('center').run()}
      >
        <AlignCenterIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
      </button>
      <button
        onClick={() => editor?.chain().focus().setTextAlign('right').run()}
      >
        <AlignRightIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
      </button>
      <button
        onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
      >
        <AlignJustifyIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
      </button>
    </div>
  );

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
        <Tippy
          placement="right"
          content={<HeadingTooltip />}
          interactive
          hideOnClick={false}
          trigger="mouseenter"
          touch={false}
        >
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1Icon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
          </button>
        </Tippy>
        <Tippy
          placement="right"
          content={<ListTooltip />}
          interactive
          hideOnClick={false}
          trigger="mouseenter"
          touch={false}
        >
          <button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <UnorderedListIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
          </button>
        </Tippy>
        <button onClick={() => editor?.chain().focus().toggleCodeBlock().run()}>
          <CodeBlockIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        >
          <QuoteIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
        </button>
        <ImageIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
        <TableIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
        <Tippy
          placement="right"
          content={<AlignmentTooltip />}
          interactive
          hideOnClick={false}
          trigger="mouseenter"
          touch={false}
        >
          <button
            onClick={() => editor?.chain().focus().setTextAlign('left').run()}
          >
            <AlignLeftIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
          </button>
        </Tippy>
        <button
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
        >
          <SeparatorIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
        </button>
      </Transition>
    </div>
  );
};

export default Toolbar;
