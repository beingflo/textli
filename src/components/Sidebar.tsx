import React from 'react';
import { useNoteList } from '../context/noteListReducer';
import { NoteListEntry, NoteStatus } from '../types';
import '../style.css';
import { useAppDispatch } from '../context';
import { get_note } from '../api/note_api';
import { useCurrentNote } from '../context/currentNoteReducer';
import { setNoteStatus } from '../context/noteStatusReducer';
import { ArrowLeftIcon, ArrowRightIcon, ClearIcon, SearchIcon } from '../icons';
import { useAppEditor } from '../context/editorReducer';
import { useFocus } from './util';
import { Popover, Transition } from '@headlessui/react';
import { useHotkeys } from 'react-hotkeys-hook';
import { decrypt_note } from './crypto';

export type Props = {
  query: string;
  setQuery: (query: string) => void;
};

export const Sidebar = ({ query, setQuery }: Props): React.ReactElement => {
  const encrypted_notes = useNoteList();
  const currentNote = useCurrentNote();
  const dispatch = useAppDispatch();
  const editor = useAppEditor();

  const [notes, setNotes] = React.useState<Array<NoteListEntry>>([]);

  React.useEffect(() => {
    const decrypt_notes = async () => {
      Promise.all(
        encrypted_notes.map(
          async (note: NoteListEntry): Promise<NoteListEntry> => {
            const decrypted_note = await decrypt_note(
              note?.key,
              note?.metadata
            );

            return {
              key: note?.key,
              id: note?.id,
              created_at: note?.created_at,
              modified_at: note?.modified_at,
              public: note?.public,
              metadata: decrypted_note?.metadata ?? '',
            };
          }
        )
      ).then((notes: Array<NoteListEntry>) => {
        setNotes(notes);
      });
    };

    decrypt_notes();
  }, [encrypted_notes, setNotes]);

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

  const filteredNotes = notes.filter((note: NoteListEntry) => {
    if (!note?.metadata) {
      return false;
    }

    const metadata: { title: string; tags: string } = JSON.parse(
      note?.metadata
    );

    // TODO more sophisticated searching (fuzzy, multiword, etc)
    return (
      metadata?.title?.toLowerCase().includes(query.toLowerCase()) ||
      metadata?.tags?.toLocaleLowerCase().includes(query.toLowerCase())
    );
  });

  const sortedNotes = filteredNotes.sort((a, b) => {
    const dateA = new Date(a.modified_at);
    const dateB = new Date(b.modified_at);

    if (dateA < dateB) {
      return 1;
    } else if (dateA > dateB) {
      return -1;
    }
    return 0;
  });

  const isSelected = React.useCallback(
    (id: string) => currentNote?.id === id,
    [currentNote]
  );

  const handleSelection = React.useCallback(
    (id: string) => {
      // Scroll to top incase we are further down the sidebar
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setNoteStatus(NoteStatus.INPROGRESS, dispatch);
      get_note(id, dispatch, () => {
        setNoteStatus(NoteStatus.SYNCED, dispatch);
        editor?.commands.focus();
      });
    },
    [dispatch, editor]
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
              <ul className="space-y-0.5 pl-9 pt-4">
                {sortedNotes.map((note: NoteListEntry) => (
                  <li
                    onClick={() => handleSelection(note?.id)}
                    key={note?.id}
                    id={note?.id}
                    className="cursor-pointer truncate"
                  >
                    <span
                      className={`${isSelected(note?.id) ? 'highlight' : ''}`}
                    >
                      {JSON.parse(note?.metadata)?.title}
                    </span>
                  </li>
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
