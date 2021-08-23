import React from 'react';
import { useNoteList } from '../context/noteListReducer';
import { NoteListEntry } from '../types';

const App = (): React.ReactElement => {
  const notes = useNoteList();

  return (
    <>
      <span>app</span>
      <ul>
        {notes.map((note: NoteListEntry) => (
          <li>{note.metainfo}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
