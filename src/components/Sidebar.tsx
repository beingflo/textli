import React from 'react';
import '../style.css';
import {
  deleteFromNoteListState,
  getCurrentNoteState,
  getEditorState,
  getNoteListState,
  getSharesState,
  getUserInfoState,
  keyState,
} from './state';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BinIcon,
  ClearIcon,
  EyeIcon,
  LinkIcon,
  SadIcon,
  SearchIcon,
} from '../icons';
import { useFocus } from './util';
import { Popover, Transition } from '@headlessui/react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useGetNote } from '../api/hooks';
import { KeyStatus, NoteListItem, Share } from '../types';
import { useAtom } from 'jotai';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { delete_note } from '../api/note_api';
import { handleException } from '../api';
import { toast } from 'react-toastify';
import { removeMainKey } from './crypto';
import fuzzysort from 'fuzzysort';

export const Sidebar = (): React.ReactElement => {
  const [notes] = useAtom(getNoteListState);
  const [userInfo] = useAtom(getUserInfoState);
  const [shares] = useAtom(getSharesState);
  const [keyStatus, setKeyStatus] = useAtom(keyState);
  const [currentNote] = useAtom(getCurrentNoteState);
  const [editor] = useAtom(getEditorState);
  const getNote = useGetNote();
  const [, deleteFromNoteList] = useAtom(deleteFromNoteListState);
  const [query, setQuery] = React.useState('');
  const [filteredNotes, setFilteredNotes] = React.useState(notes);

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

  const hasDecryptionFailure = React.useMemo(
    () => notes.find((note: NoteListItem) => !note?.metadata?.title),
    [notes]
  );

  React.useEffect(() => {
    if (!userInfo) {
      return;
    }

    const retryKeyEntry = () => {
      removeMainKey(userInfo?.username);
      setKeyStatus(KeyStatus.MISSING);
    };

    if (hasDecryptionFailure && keyStatus === KeyStatus.PRESENT) {
      toast.error(
        <div className="flex flex-row">
          <div>Some notes failed to decrypt with the provided password</div>
          <div className="self-center">
            <div className="whitespace-nowrap bg-white text-red-500 rounded-md p-2">
              Try again
            </div>
          </div>
        </div>,
        { autoClose: false, onClick: retryKeyEntry }
      );
    }
  }, [hasDecryptionFailure, userInfo]);

  React.useEffect(() => {
    fuzzysort
      .goAsync(query, notes, {
        keys: ['metadata.title', 'metadata.tags'],
      })
      .then((results) => {
        const mappedResults = results.map((result) => result.obj);

        if (query === '') {
          setFilteredNotes(notes);
        } else {
          setFilteredNotes(mappedResults);
        }
      });
  }, [notes, query]);

  const isSelected = React.useCallback(
    (id: string) => currentNote?.id === id,
    [currentNote]
  );

  const isShared = React.useCallback(
    (id: string): { shared: boolean; public: boolean } => {
      const share = shares.find((share: Share) => share?.note === id);
      return { shared: !!share, public: !!share?.public };
    },
    [shares]
  );

  const handleSelection = React.useCallback(
    (id: string) => {
      // Scroll to top incase we are further down the sidebar
      window.scrollTo({ top: 0, behavior: 'smooth' });

      getNote(id).then(() => setTimeout(() => setQuery(''), 300));
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

  const SharedIndicator = (id: string) => {
    const shared = isShared(id);

    return (
      <div className="relative pr-1">
        {shared.shared && <LinkIcon className="h-5 w-5 text-yellow-400" />}
        {shared.public && (
          <EyeIcon className="w-3 h-3 absolute text-red-400 top-3 left-3" />
        )}
      </div>
    );
  };

  return (
    <div className="fixed top-0 z-20">
      <Popover className="relative">
        <Popover.Button
          ref={openButtonRef}
          className="ml-5 mt-6 outline-none text-gray-700 hover:translate-x-0.5 transform transition active:scale-90"
        >
          <ArrowRightIcon className="h-7 w-7 sm:h-6 sm:w-6" />
        </Popover.Button>
        <Transition
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          onTransitionEnd={setInputFocus}
          className="absolute top-0 border-r border-dashed border-gray-300 w-screen z-20 sm:w-96"
        >
          <Popover.Panel>
            <div className="bg-white flex flex-col h-screen w-full pt-4 pb-6">
              <div className="flex flex-row align-middle mx-5 sm:mx-6">
                <Popover.Button className="pr-2">
                  <ArrowLeftIcon className="h-7 w-7 sm:h-6 sm:w-6 text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
                </Popover.Button>
                <div className="relative w-full">
                  <input
                    type="search"
                    placeholder="Search"
                    value={query}
                    ref={inputRef}
                    onChange={(event) => setQuery(event?.target?.value)}
                    className="border border-gray-200 p-2 focus:ring-0 focus:border-gray-400 placeholder-gray-400 bg-white rounded-md w-full"
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
              <ul className="space-y-2 sm:space-y-1 overflow-y-auto overscroll-contain fix-z-index pl-16 pr-4 mt-4">
                {filteredNotes?.length === 0 ? (
                  <div className="flex flex-col items-center text-gray-600 pt-4">
                    <SadIcon className="w-16 h-16" />
                    <div>Nothing here</div>
                  </div>
                ) : (
                  filteredNotes.map((note: NoteListItem) => (
                    <React.Fragment key={note?.id}>
                      {note?.metadata?.title ? (
                        <li
                          onClick={() => handleSelection(note?.id)}
                          key={note?.id}
                          id={note?.id}
                          className="cursor-pointer truncate"
                        >
                          <span className="flex flex-row gap-2 items-center">
                            <span
                              className={`truncate ${
                                isSelected(note?.id) ? 'highlight' : ''
                              }`}
                            >
                              {note?.metadata?.title}
                            </span>
                            {SharedIndicator(note.id)}
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
                  ))
                )}
              </ul>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};

export default Sidebar;
