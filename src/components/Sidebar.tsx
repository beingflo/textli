import React from 'react';
import { useNoteList } from '../context/noteListReducer';
import { NoteListEntry, NoteStatus } from '../types';
import '../style.css';
import { useAppDispatch } from '../context';
import { get_note } from '../api/note_api';
import { useCurrentNote } from '../context/currentNoteReducer';
import { setNoteStatus } from '../context/noteStatusReducer';
import { ArrowLeftIcon, ClearIcon, SearchIcon } from '../icons';
import { useAppEditor } from '../context/editorReducer';
import { useFocus } from './util';

export type Props = {
  setHide: () => void;
  query: string;
  setQuery: (query: string) => void;
};

export const Sidebar = ({
  setHide,
  query,
  setQuery,
}: Props): React.ReactElement => {
  const notes = useNoteList();
  const currentNote = useCurrentNote();
  const dispatch = useAppDispatch();
  const editor = useAppEditor();

  const [inputRef, setInputFocus] = useFocus();

  const filteredNotes = notes.filter((note: NoteListEntry) => {
    const metainfo: { title: string; tags: string } = JSON.parse(
      note?.metainfo
    );

    // TODO more sophisticated searching (fuzzy, multiword, etc)
    return (
      metainfo?.title?.toLowerCase().includes(query.toLowerCase()) ||
      metainfo?.tags?.toLocaleLowerCase().includes(query.toLowerCase())
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
      setNoteStatus(NoteStatus.INPROGRESS, dispatch);
      get_note(id, dispatch, () => {
        setNoteStatus(NoteStatus.SYNCED, dispatch);
        editor?.commands.focus();
        setTimeout(setHide, 250);
      });
    },
    [dispatch, editor]
  );

  return (
    <div className="px-6 w-full pt-4 pb-6">
      <div className="flex flex-row align-middle">
        <button className="pr-2" onClick={() => setHide()}>
          <ArrowLeftIcon className="h-6 w-6 text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
        </button>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search"
            value={query}
            ref={inputRef}
            onChange={(event) => setQuery(event?.target?.value)}
            className="border-none focus:ring-1 focus:ring-gray-400 placeholder-gray-400 bg-white rounded-lg w-full"
          />
          {query ? (
            <button
              onClick={() => {
                setQuery('');
                setInputFocus();
              }}
            >
              <ClearIcon className="h-6 w-6 absolute top-2 right-2 text-gray-400" />
            </button>
          ) : (
            <button onClick={setInputFocus}>
              <SearchIcon className="h-6 w-6 absolute top-2 right-2 text-gray-400" />
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
            <span className={`${isSelected(note?.id) ? 'highlight' : ''}`}>
              {JSON.parse(note?.metainfo)?.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
