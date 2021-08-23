import React from 'react';
import { user_logout } from '../api/user_api';
import { useNoteList } from '../context/noteListReducer';
import { NoteListEntry } from '../types';

const App = (): React.ReactElement => {
  const notes = useNoteList();

  const logout = () => {
    user_logout();
  };

  return (
    <>
      <span>app</span>
      <ul>
        {notes.map((note: NoteListEntry) => (
          <li>{note.metainfo}</li>
        ))}
      </ul>
      <button
        onClick={() => logout()}
        className="rounded-sm bg-gray-200 p-2 m-2 hover:bg-gray-400"
      >
        Logout
      </button>
    </>
  );
};

export default App;
