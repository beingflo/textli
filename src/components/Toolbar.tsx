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
  DeleteColumnIcon,
  DeleteRowIcon,
  FormattingIcon,
  HeaderColumnIcon,
  HeaderRowIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  ImageIcon,
  InsertColumnLeftIcon,
  InsertColumnRightIcon,
  InsertRowBottomIcon,
  InsertRowTopIcon,
  MergeCellIcon,
  OrderedListIcon,
  QuoteIcon,
  SeparatorIcon,
  SplitCellIcon,
  TableIcon,
  UnorderedListIcon,
} from '../icons';
import { getEditorState } from './state';

export const Toolbar = (): React.ReactElement => {
  const [showToolbar, setShowToolbar] = React.useState(true);
  const [editor] = useAtom(getEditorState);
  const [isTable, setIsTable] = React.useState(false);

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

  editor?.on('transaction', () => setIsTable(editor?.can().addRowAfter()));

  const TableTooltip = () => {
    return (
      <>
        {isTable ? (
          <div className="grid grid-cols-2 p-2 w-20 gap-x-2 gap-y-4 z-20">
            <button
              onClick={() => editor?.chain().focus().addColumnBefore().run()}
            >
              <InsertColumnLeftIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={() => editor?.chain().focus().addColumnAfter().run()}
            >
              <InsertColumnRightIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={() => editor?.chain().focus().addRowBefore().run()}
            >
              <InsertRowTopIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
            </button>
            <button onClick={() => editor?.chain().focus().addRowAfter().run()}>
              <InsertRowBottomIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={() => editor?.chain().focus().deleteColumn().run()}
            >
              <DeleteColumnIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
            </button>
            <button onClick={() => editor?.chain().focus().deleteRow().run()}>
              <DeleteRowIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleHeaderRow().run()}
            >
              <HeaderRowIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleHeaderColumn().run()}
            >
              <HeaderColumnIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
            </button>
            <button onClick={() => editor?.chain().focus().mergeCells().run()}>
              <MergeCellIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
            </button>
            <button onClick={() => editor?.chain().focus().splitCell().run()}>
              <SplitCellIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
            </button>
          </div>
        ) : (
          <form
            className="flex flex-row border border-black rounded-sm"
            onSubmit={(event: any) => {
              event.preventDefault();
              const rows = event?.target?.rows?.value;
              const cols = event?.target?.columns?.value;

              editor
                ?.chain()
                .focus()
                .insertTable({ rows, cols, withHeaderRow: false })
                .run();
            }}
          >
            <input
              type="number"
              name="rows"
              className="border-none focus:ring-0 placeholder-gray-400 bg-white w-28"
              placeholder="rows"
              defaultValue={3}
            />
            <input
              type="number"
              name="columns"
              className="border-none focus:ring-0 placeholder-gray-400 bg-white w-28"
              placeholder="columns"
              defaultValue={3}
            />
            <button className="p-2 bg-gray-100 rounded-sm hover:bg-gray-200">
              Add
            </button>
          </form>
        )}
      </>
    );
  };

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
        <Tippy
          placement="right"
          content={<TableTooltip />}
          interactive
          hideOnClick={false}
          trigger="mouseenter"
          touch={false}
        >
          <div>
            <TableIcon className="h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6" />
          </div>
        </Tippy>
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
