import config from './config.json';
import { Note } from './context/noteListReducer';

const GET_NOTE_URL = `${config.api_url}/notes`;

export const get_notes = (
  setNotesList: (noteList: Array<Note>) => void
): void => {
  fetch(GET_NOTE_URL, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setNotesList(data);
    })
    .catch((error) => console.log(error));
};
