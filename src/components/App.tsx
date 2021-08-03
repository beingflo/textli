import React from 'react';
import { Note, useNoteList } from '../context/noteListReducer';

const App = (): React.ReactElement => {
  const noteList = useNoteList();

  return (
    <>
      <div>Textli</div>
      <ul>
        {noteList.map((note: Note) => (
          <li key={note.id}>{note.metainfo}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
