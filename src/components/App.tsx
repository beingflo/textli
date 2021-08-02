import React from 'react';
import { Note, useNoteList } from '../context/noteListReducer';
import { useSpinner, useSetSpinner } from '../context/spinnerReducer';

const App = (): React.ReactElement => {
  const waiting = useSpinner();
  const noteList = useNoteList();
  const dispatch = useSetSpinner();

  return (
    <>
      <div>waiting: {waiting ? 'true' : 'false'}</div>
      <ul>
        {noteList.map((note: Note) => (
          <li key={note.id}>{note.metainfo}</li>
        ))}
      </ul>
      <button onClick={() => dispatch(!waiting)}>Click me</button>
    </>
  );
};

export default App;
