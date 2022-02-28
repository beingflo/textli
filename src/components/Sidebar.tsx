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
  BinIcon,
  ClearIcon,
  CloseIcon,
  EyeIcon,
  LinkIcon,
  SadIcon,
  SearchIcon,
  ViewListIcon,
} from '../icons';
import { sortNotes, useFocus } from './util';
import { Dialog, Transition } from '@headlessui/react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useGetNote } from '../api/hooks';
import { KeyStatus, NoteListItem, Share } from '../types';
import { useAtom } from 'jotai';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { delete_note } from '../api/note_api';
import { handleException } from '../api';
import { toast } from 'react-toastify';
import { removeMainKey } from './crypto';
import { useLocation } from 'wouter';
import { SpinnerPage } from './Spinner';

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
  const [focused, setFocused] = React.useState(0);
  const [showFinder, setShowFinder] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [, setLocation] = useLocation();

  const [inputRef, setInputFocus] = useFocus();

  const handleCloseFinder = React.useCallback(() => {
    setTimeout(() => {
      setFocused(0);
      setQuery('');
    }, 200);

    setShowFinder(false);
  }, [setShowFinder, setQuery, setFocused]);

  useHotkeys(
    'command+/,ctrl+/,command+k,ctrl+k',
    (event: KeyboardEvent) => {
      setShowFinder((old) => !old);
      event.preventDefault();
    },
    { enableOnContentEditable: true, enableOnTags: ['INPUT'] },
    [setShowFinder]
  );

  useHotkeys(
    'down',
    (event: KeyboardEvent) => {
      setFocused((focused) => Math.min(focused + 1, filteredNotes.length - 1));
      event.preventDefault();
    },
    { enableOnTags: ['INPUT'] },
    [filteredNotes, setFocused]
  );

  useHotkeys(
    'up',
    (event: KeyboardEvent) => {
      setFocused((focused) => Math.max(focused - 1, 0));
      event.preventDefault();
    },
    { enableOnTags: ['INPUT'] },
    [setFocused]
  );

  useHotkeys(
    'enter',
    (event: KeyboardEvent) => {
      if (showFinder) {
        handleSelection(filteredNotes[focused]?.id);
        event.preventDefault();
      }
    },
    { enableOnTags: ['INPUT'] },
    [filteredNotes, focused]
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
    const searchTerms = query.split(' ');
    const filteredNotes = notes.filter((note: NoteListItem) =>
      searchTerms.every(
        (term) =>
          note.metadata?.title?.toLowerCase().includes(term.toLowerCase()) ||
          note.metadata?.title?.toLowerCase().includes(term.toLowerCase())
      )
    );
    const sortedNotes = sortNotes(filteredNotes);

    if (query === '') {
      setFilteredNotes(notes);
    } else {
      setFilteredNotes(sortedNotes);
    }
  }, [notes, query]);

  React.useEffect(() => {
    setTimeout(() => setFocused(0), 100);
  }, [setFocused, showFinder]);

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
      setLoading(true);

      getNote(id)
        .then(() => {
          setTimeout(
            () => editor?.commands.focus('end', { scrollIntoView: false }),
            300
          );
          handleCloseFinder();
          setLoading(false);

          setLocation(`/note/${id}`);
        })
        .finally(() => setLoading(false));
    },
    [editor, handleCloseFinder, setLoading]
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
        <LinkIcon
          className={`${
            shared.shared || 'invisible'
          } h-5 w-5 text-black icon-highlight`}
        />
        <EyeIcon
          className={`${
            shared.public || 'invisible'
          } w-3 h-3 absolute text-green-600 top-3 left-3`}
        />
      </div>
    );
  };

  return (
    <>
      {loading && <SpinnerPage />}
      <div className="fixed top-0 z-20">
        <button
          onClick={() => setShowFinder(true)}
          className="fixed ml-5 mt-6 outline-none text-black hover:translate-x-0.5 transition active:scale-90"
        >
          <ViewListIcon className="h-7 w-7 sm:h-6 sm:w-6" />
        </button>
      </div>
      <Transition show={showFinder} onTransitionEnd={setInputFocus} appear>
        <Dialog
          onClose={handleCloseFinder}
          className="fixed z-20 inset-0 overflow-y-auto scroollbar-gutter"
        >
          <div className="flex justify-center">
            <Transition.Child
              enter="transition-opacity ease-linear duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-white bg-opacity-100" />
            </Transition.Child>
            <Transition.Child
              enter="transition-opacity ease-out duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-75"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="relative py-6 px-4 bg-white mx-auto max-w-sm min-w-sm sm:min-w-lg sm:max-w-lg lg:min-w-2xl lg:max-w-2xl my-4">
                <div className="flex flex-row align-middle">
                  <div className="relative w-full pl-6">
                    <input
                      type="search"
                      placeholder="Search"
                      value={query}
                      ref={inputRef}
                      onChange={(event) => {
                        setQuery(event?.target?.value);
                        setFocused(0);
                      }}
                      className="p-2 focus:ring-0 border-none focus:border-none placeholder-gray-400 bg-white rounded-md w-full"
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
                  <button onClick={handleCloseFinder} className="pl-4">
                    <CloseIcon className="h-7 w-7 sm:h-6 sm:w-6 text-black" />
                  </button>
                </div>
                <ul className="space-y-2 sm:space-y-1 sm:overflow-y-auto sm:overscroll-contain fix-ios-scroll mt-4">
                  {filteredNotes?.length === 0 ? (
                    <div className="flex flex-col items-center text-gray-600 pt-4">
                      <SadIcon className="w-16 h-16" />
                      <div>Nothing here</div>
                    </div>
                  ) : (
                    filteredNotes.map((note: NoteListItem, index: number) => (
                      <React.Fragment key={note?.id}>
                        {note?.metadata?.title ? (
                          <li
                            onClick={() => handleSelection(note?.id)}
                            key={note?.id}
                            id={note?.id}
                            className="cursor-pointer truncate"
                          >
                            <span className="flex flex-row gap-2 items-center">
                              {SharedIndicator(note.id)}
                              <span
                                className={`truncate ${
                                  index === focused &&
                                  'md:bg-yellow-300 md:rounded-sm md:px-1 md:-translate-x-1'
                                } ${
                                  isSelected(note?.id) && index !== focused
                                    ? 'highlight'
                                    : ''
                                }`}
                              >
                                {note?.metadata?.title}
                              </span>
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
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Sidebar;
