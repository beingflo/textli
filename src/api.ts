import config from './config.json';
import { AppDispatch } from './context';
import { setCurrentNote } from './context/currentNoteReducer';
import { setNoteList } from './context/noteListReducer';
import { setSpinner } from './context/spinnerReducer';
import { NoteSaveRequest } from './types';

const NOTE_URL = `${config.api_url}/notes`;

export const get_notes = (dispatch: AppDispatch): void => {
  setSpinner(true, dispatch);

  fetch(NOTE_URL, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setNoteList(data, dispatch);
    })
    .catch((error) => console.log(error))
    .finally(() => setSpinner(false, dispatch));
};

export const get_note = (id: string, dispatch: AppDispatch): void => {
  fetch(`${NOTE_URL}/${id}`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setCurrentNote(data, dispatch);
    })
    .catch((error) => console.log(error));
};

export const save_note = (note: NoteSaveRequest): void => {
  fetch(NOTE_URL, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
    .then((response) => {
      if (response.status < 200 && response.status >= 300) {
        console.log(response);
      }
    })
    .catch((error) => console.log(error));
};

export const delete_note = (id: string): void => {
  fetch(`${NOTE_URL}/${id}`, {
    credentials: 'include',
    method: 'DELETE',
  })
    .then((response) => {
      if (response.status < 200 && response.status >= 300) {
        console.log(response);
      }
    })
    .catch((error) => console.log(error));
};
