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
        <div className='flex flex-row'>
          <div>Some notes failed to decrypt with the provided password</div>
          <div className='self-center'>
            <div className='whitespace-nowrap rounded-md bg-white p-2 text-red-500'>
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
          note?.metadata?.title?.toLowerCase()?.includes(term?.toLowerCase()) ||
          note?.metadata?.title?.toLowerCase()?.includes(term?.toLowerCase())
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
    (id: string): { shared: boolean } => {
      const share = shares.find((share: Share) => share?.note === id);
      return { shared: !!share };
    },
    [shares]
  );

  const handleSelection = React.useCallback(
    (id: string) => {
      if (!id) {
        return;
      }

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
      <div className='relative pr-1'>
        <LinkIcon
          className={`${
            shared.shared || 'invisible'
          } icon-highlight h-5 w-5 text-black`}
        />
      </div>
    );
  };

  return (
    <>
      {loading && <SpinnerPage />}
      <div className='fixed top-0 z-20'>
        <button
          onClick={() => setShowFinder(true)}
          className='fixed ml-5 mt-6 text-black outline-none transition hover:translate-x-0.5 active:scale-90'
        >
          <ViewListIcon className='h-7 w-7 sm:h-6 sm:w-6' />
        </button>
      </div>
      <Transition show={showFinder} onTransitionEnd={setInputFocus} appear>
        <Dialog
          onClose={handleCloseFinder}
          className='scroollbar-gutter fixed inset-0 z-20 overflow-y-auto'
        >
          <div className='flex justify-center'>
            <Transition.Child
              enter='transition-opacity ease-linear duration-75'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-white bg-opacity-100' />
            </Transition.Child>
            <Transition.Child
              enter='transition-opacity ease-out duration-75'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-75'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='relative mx-auto my-4 min-w-sm max-w-sm bg-white py-6 px-4 sm:min-w-lg sm:max-w-lg lg:min-w-2xl lg:max-w-2xl'>
                <div className='flex flex-row align-middle'>
                  <div className='relative w-full pl-6'>
                    <input
                      type='search'
                      placeholder='Search'
                      value={query}
                      ref={inputRef}
                      onChange={(event) => {
                        setQuery(event?.target?.value);
                        setFocused(0);
                      }}
                      className='w-full rounded-md border-none bg-white p-2 placeholder-gray-400 focus:border-none focus:ring-0'
                    />
                    {query ? (
                      <button
                        onClick={() => {
                          setQuery('');
                          setInputFocus();
                        }}
                      >
                        <ClearIcon className='absolute top-2.5 right-2.5 h-5 w-5 text-gray-400' />
                      </button>
                    ) : (
                      <button onClick={setInputFocus}>
                        <SearchIcon className='absolute top-2.5 right-2.5 h-5 w-5 text-gray-400' />
                      </button>
                    )}
                  </div>
                  <button onClick={handleCloseFinder} className='pl-4'>
                    <CloseIcon className='h-7 w-7 text-black sm:h-6 sm:w-6' />
                  </button>
                </div>
                <ul className='fix-ios-scroll mt-4 space-y-2 sm:space-y-1 sm:overflow-y-auto sm:overscroll-contain'>
                  {filteredNotes?.length === 0 ? (
                    <div className='flex flex-col items-center pt-4 text-gray-600'>
                      <SadIcon className='h-16 w-16' />
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
                            className='cursor-pointer truncate'
                          >
                            <span className='flex flex-row items-center gap-2'>
                              {SharedIndicator(note.id)}
                              <span
                                className={`truncate ${
                                  index === focused &&
                                  'md:-translate-x-1 md:rounded-sm md:bg-yellow-300 md:px-1'
                                } ${isSelected(note?.id) && 'highlight'} ${
                                  isSelected(note?.id) &&
                                  index === focused &&
                                  'md:!bg-yellow-300'
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
                            className='flex cursor-default flex-row truncate rounded-md bg-red-500 p-1'
                            aria-disabled
                          >
                            <ExclamationCircleIcon className='h-4 w-4 self-center' />
                            <span className='pl-1'>Decryption failure</span>
                            <button
                              onClick={() => handleDelete(note?.id)}
                              className='ml-auto'
                            >
                              <BinIcon className='h-4 w-4 self-center' />
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
