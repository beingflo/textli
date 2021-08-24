import React from 'react';
import { user_logout } from '../api/user_api';
import { useAppDispatch } from '../context';
import { useNoteList } from '../context/noteListReducer';
import { setStatus } from '../context/statusReducer';
import { NoteListEntry, Status } from '../types';
import Editor from './Editor';

const App = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const notes = useNoteList();

  const logout = React.useCallback(() => {
    user_logout();
    setStatus(Status.REDIRECT, dispatch);
  }, [dispatch]);

  return (
    <div className="h-screen flex">
      <div>
        Sidebar
        <ul>
          {notes.map((note: NoteListEntry) => (
            <li>{note.metainfo}</li>
          ))}
        </ul>
      </div>
      <div className="w-1/2">
        <Editor />
      </div>
    </div>
  );
};

export default App;
