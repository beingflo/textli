import React from 'react';
import '../style.css';
import {
  deleteFromNoteListState,
  getCurrentNoteState,
  getEditorState,
  getNoteListState,
} from './state';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BinIcon,
  ClearIcon,
  SearchIcon,
} from '../icons';
import { useFocus } from './util';
import { Popover, Transition } from '@headlessui/react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useGetNote } from '../api/hooks';
import { NoteListItem } from '../types';
import { useAtom } from 'jotai';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { delete_note } from '../api/note_api';
import { handleException } from '../api';

export type Props = {
  query: string;
  setQuery: (query: string) => void;
};

export const Sidebar = ({ query, setQuery }: Props): React.ReactElement => {
  const [notes] = useAtom(getNoteListState);
  const [currentNote] = useAtom(getCurrentNoteState);
  const [editor] = useAtom(getEditorState);
  const getNote = useGetNote();
  const [, deleteFromNoteList] = useAtom(deleteFromNoteListState);

  const [inputRef, setInputFocus] = useFocus();

  const openButtonRef = React.useRef<HTMLButtonElement>(null);

  useHotkeys(
    'command+/,ctrl+/',
    (event: KeyboardEvent) => {
      openButtonRef?.current?.click();
      event.preventDefault();
    },
    { enableOnContentEditable: true },
    [openButtonRef]
  );

  const filteredNotes = notes.filter((note: NoteListItem) => {
    if (!note?.metadata) {
      return query === '';
    }

    // TODO more sophisticated searching (fuzzy, multiword, etc)
    return (
      note?.metadata?.title?.toLowerCase().includes(query.toLowerCase()) ||
      note?.metadata?.tags?.toLocaleLowerCase().includes(query.toLowerCase())
    );
  });

  const isSelected = React.useCallback(
    (id: string) => currentNote?.id === id,
    [currentNote]
  );

  const handleSelection = React.useCallback(
    (id: string) => {
      // Scroll to top incase we are further down the sidebar
      window.scrollTo({ top: 0, behavior: 'smooth' });

      getNote(id);
    },
    [editor]
  );

  const handleDelete = React.useCallback(
    (id: string) => {
      delete_note(id)
        .then(() => {
          deleteFromNoteList(id);
        })
        .catch((error) => {
          handleException(error);
        });
    },
    [deleteFromNoteList]
  );

  return (
    <>
      <Popover>
        <Popover.Button ref={openButtonRef} className="pl-6 pt-6 outline-none">
          <ArrowRightIcon className="h-6 w-6 text-gray-700 hover:translate-x-0.5 transform transition active:scale-90" />
        </Popover.Button>

        <Transition
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          onTransitionEnd={setInputFocus}
          className="absolute top-0 bg-white border-r border-dashed border-gray-300 z-20 w-80 sm:w-96 min-h-full"
        >
          <Popover.Panel>
            <div className="px-6 w-full pt-4 pb-6">
              <div className="flex flex-row align-middle">
                <Popover.Button className="pr-2">
                  <ArrowLeftIcon className="h-6 w-6 text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
                </Popover.Button>
                <div className="relative w-full">
                  <input
                    type="search"
                    placeholder="Search"
                    value={query}
                    ref={inputRef}
                    onChange={(event) => setQuery(event?.target?.value)}
                    className="border border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400 bg-white rounded-md w-full"
                  />
                  {query ? (
                    <button
                      onClick={() => {
                        setQuery('');
                        setInputFocus();
                      }}
                    >
                      <ClearIcon className="h-5 w-5 absolute top-2.5 right-2.5 text-gray-400" />
                    </button>
                  ) : (
                    <button onClick={setInputFocus}>
                      <SearchIcon className="h-5 w-5 absolute top-2.5 right-2.5 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>
              <ul className="space-y-1 pl-9 pt-4">
                {filteredNotes.map((note: NoteListItem) => (
                  <React.Fragment key={note?.id}>
                    {note?.metadata?.title ? (
                      <li
                        onClick={() => handleSelection(note?.id)}
                        key={note?.id}
                        id={note?.id}
                        className="cursor-pointer truncate"
                      >
                        <span
                          className={`${
                            isSelected(note?.id) ? 'highlight' : ''
                          }`}
                        >
                          {note?.metadata?.title}
                        </span>
                      </li>
                    ) : (
                      <li
                        key={note?.id}
                        id={note?.id}
                        className="cursor-default truncate flex flex-row bg-red-500 p-1 rounded-md"
                        aria-disabled
                      >
                        <ExclamationCircleIcon className="h-4 w-4 self-center" />
                        <span className="pl-1">Decryption failure</span>
                        <button
                          onClick={() => handleDelete(note?.id)}
                          className="ml-auto"
                        >
                          <BinIcon className="h-4 w-4 self-center" />
                        </button>
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default Sidebar;
