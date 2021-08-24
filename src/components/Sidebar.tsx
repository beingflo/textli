import React from 'react';
import { useNoteList } from '../context/noteListReducer';
import { NoteListEntry } from '../types';
import '../style.css';

export type Props = {
  setHide: () => void;
};

export const Sidebar = ({ setHide }: Props): React.ReactElement => {
  const notes = useNoteList();
  const [selectedNote, setSelectedNote] = React.useState('');

  const isSelected = React.useCallback(
    (id: string) => selectedNote === id,
    [selectedNote]
  );

  const handleSelection = React.useCallback(
    (id: string) => {
      setSelectedNote(id);
    },
    [setSelectedNote]
  );

  return (
    <div className="absolute p-4 w-full">
      <button className="mb-2" onClick={() => setHide()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 17l-5-5m0 0l5-5m-5 5h12"
          />
        </svg>
      </button>

      <ul>
        {notes.map((note: NoteListEntry) => (
          <li
            onClick={() => handleSelection(note?.id)}
            key={note?.id}
            id={note?.id}
          >
            <div className={`truncate ${isSelected(note?.id) && 'highlight'}`}>
              {JSON.parse(note?.metainfo)?.title}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
