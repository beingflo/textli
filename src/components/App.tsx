import React from 'react';
import { user_logout } from '../api/user_api';
import { useAppDispatch } from '../context';
import { useNoteList } from '../context/noteListReducer';
import { setStatus } from '../context/statusReducer';
import { NoteListEntry, Status } from '../types';

const App = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const notes = useNoteList();

  const logout = React.useCallback(() => {
    user_logout();
    setStatus(Status.REDIRECT, dispatch);
  }, [dispatch]);

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
