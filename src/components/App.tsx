import React from 'react';
import { useAppDispatch } from '../context';
import { Note, useNoteList } from '../context/noteListReducer';
import { setSpinner, useSpinner } from '../context/spinnerReducer';

const App = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const waiting = useSpinner();
  const noteList = useNoteList();

  return (
    <>
      <div>waiting: {waiting ? 'true' : 'false'}</div>
      <ul>
        {noteList.map((note: Note) => (
          <li key={note.id}>{note.metainfo}</li>
        ))}
      </ul>
      <button
        className="p-1 px-2 bg-green-400 rounded-lg"
        onClick={() => setSpinner(!waiting, dispatch)}
      >
        Click me
      </button>
    </>
  );
};

export default App;
