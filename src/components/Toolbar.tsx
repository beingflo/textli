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
  const [showToolbar, setShowToolbar] = React.useState(false);
  const [editor] = useAtom(getEditorState);
  const [isTable, setIsTable] = React.useState(false);

  const HeadingTooltip = () => (
    <div className='flex flex-row gap-2.5'>
      <button
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2Icon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
      </button>
      <button
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <Heading3Icon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
      </button>
      <button
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 4 }).run()
        }
      >
        <Heading4Icon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
      </button>
    </div>
  );

  const ListTooltip = () => (
    <div className='flex flex-row gap-2.5'>
      <button onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
        <OrderedListIcon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
      </button>
      <button onClick={() => editor?.chain().focus().toggleTaskList().run()}>
        <CheckListIcon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
      </button>
    </div>
  );

  const AlignmentTooltip = () => (
    <div className='flex flex-row gap-2.5'>
      <button
        onClick={() => editor?.chain().focus().setTextAlign('center').run()}
      >
        <AlignCenterIcon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
      </button>
      <button
        onClick={() => editor?.chain().focus().setTextAlign('right').run()}
      >
        <AlignRightIcon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
      </button>
      <button
        onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
      >
        <AlignJustifyIcon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
      </button>
    </div>
  );

  editor?.on('transaction', () => setIsTable(editor?.can().addRowAfter()));

  const TableTooltip = () => {
    return (
      <>
        {isTable ? (
          <div className='z-20 grid w-20 grid-cols-2 gap-x-2 gap-y-4 p-2'>
            <button
              onClick={() => editor?.chain().focus().addColumnBefore().run()}
            >
              <InsertColumnLeftIcon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
            </button>
            <button
              onClick={() => editor?.chain().focus().addColumnAfter().run()}
            >
              <InsertColumnRightIcon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
            </button>
            <button
              onClick={() => editor?.chain().focus().addRowBefore().run()}
            >
              <InsertRowTopIcon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
            </button>
            <button onClick={() => editor?.chain().focus().addRowAfter().run()}>
              <InsertRowBottomIcon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
            </button>
            <button
              onClick={() => editor?.chain().focus().deleteColumn().run()}
            >
              <DeleteColumnIcon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
            </button>
            <button onClick={() => editor?.chain().focus().deleteRow().run()}>
              <DeleteRowIcon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleHeaderRow().run()}
            >
              <HeaderRowIcon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleHeaderColumn().run()}
            >
              <HeaderColumnIcon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
            </button>
            <button onClick={() => editor?.chain().focus().mergeCells().run()}>
              <MergeCellIcon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
            </button>
            <button onClick={() => editor?.chain().focus().splitCell().run()}>
              <SplitCellIcon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
            </button>
          </div>
        ) : (
          <form
            className='flex flex-row rounded-sm border border-black'
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
              type='number'
              name='rows'
              className='w-28 border-none bg-white placeholder-gray-400 focus:ring-0'
              placeholder='rows'
              defaultValue={3}
            />
            <input
              type='number'
              name='columns'
              className='w-28 border-none bg-white placeholder-gray-400 focus:ring-0'
              placeholder='columns'
              defaultValue={3}
            />
            <button className='rounded-sm bg-gray-100 p-2 hover:bg-gray-200'>
              Add
            </button>
          </form>
        )}
      </>
    );
  };

  return (
    <div className='fixed top-0 z-10 sm:top-10 sm:left-0'>
      <button
        onClick={() => setShowToolbar((old) => !old)}
        className='fixed ml-5 mt-6 hidden text-gray-800 outline-none transition hover:translate-x-0.5 active:scale-90 sm:inline'
      >
        <FormattingIcon className='mt-0.5 ml-10 h-7 w-7 sm:ml-0.5 sm:h-6 sm:w-6' />
      </button>
      <Transition
        show={showToolbar}
        enter='transition-opacity ease-linear duration-75'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity ease-linear duration-75'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
        className='fixed z-10 mt-14 ml-6 flex h-9 gap-2 rounded border border-gray-600 bg-white p-1 text-gray-700 shadow-lg sm:mt-16 sm:ml-5 sm:flex-col sm:rounded-none sm:border-0 sm:border-t sm:p-0 sm:pt-4 sm:shadow-none md:h-auto'
      >
        <div className='inline'>
          <Tippy
            placement='right'
            content={<HeadingTooltip />}
            interactive
            hideOnClick={false}
            trigger='mouseenter'
            touch={false}
          >
            <button
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              <Heading1Icon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
            </button>
          </Tippy>
        </div>
        <div className='inline'>
          <Tippy
            placement='right'
            content={<ListTooltip />}
            interactive
            hideOnClick={false}
            trigger='mouseenter'
            touch={false}
          >
            <button
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
            >
              <UnorderedListIcon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
            </button>
          </Tippy>
        </div>
        <div>
          <button
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          >
            <CodeBlockIcon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
          </button>
        </div>
        <div>
          <button
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          >
            <QuoteIcon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
          </button>
        </div>
        <div className='inline pb-2'>
          <Tippy
            placement='right'
            content={<TableTooltip />}
            interactive
            hideOnClick={false}
            trigger='mouseenter'
            touch={false}
          >
            <div>
              <TableIcon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
            </div>
          </Tippy>
        </div>
        <div className='inline'>
          <Tippy
            placement='right'
            content={<AlignmentTooltip />}
            interactive
            hideOnClick={false}
            trigger='mouseenter'
            touch={false}
          >
            <button
              onClick={() => editor?.chain().focus().setTextAlign('left').run()}
            >
              <AlignLeftIcon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
            </button>
          </Tippy>
        </div>
        <div>
          <button
            onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          >
            <SeparatorIcon className='h-6 w-6 sm:ml-0.5 sm:h-6 sm:w-6' />
          </button>
        </div>
      </Transition>
    </div>
  );
};

export default Toolbar;
