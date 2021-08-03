import React from 'react';
import { get_note } from '../api';
import { useAppDispatch } from '../context';
import { NoteListEntry, useNoteList } from '../context/noteListReducer';

const App = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const noteList = useNoteList();

  return (
    <>
      <div>Textli</div>
      <ul>
        {noteList.map((note: NoteListEntry) => (
          <li
            className="hover:cursor-pointer"
            onClick={() => get_note(note.id, dispatch)}
            key={note.id}
          >
            {note.metainfo}
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
