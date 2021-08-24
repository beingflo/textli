import React from 'react';
import { useNoteList } from '../context/noteListReducer';
import { NoteListEntry } from '../types';

export type Props = {
  setHide: () => void;
};

export const Sidebar = ({ setHide }: Props): React.ReactElement => {
  const notes = useNoteList();

  return (
    <div className="absolute max-w-md p-4">
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
          <li onClick={setHide} key={note.id}>
            {note.metainfo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
