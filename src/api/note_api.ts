import config from '../config.json';
import { AppDispatch } from '../context';
import { setCurrentNote } from '../context/currentNoteReducer';
import { setNoteList } from '../context/noteListReducer';
import { setSpinner } from '../context/spinnerReducer';
import { setStatus } from '../context/statusReducer';
import { NoteSaveRequest, Status } from '../types';
import { mapError, handleException } from './index';

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
    .then(mapError)
    .then((response) => response.json())
    .then((data) => {
      setNoteList(data, dispatch);
    })
    .catch(() => {
      setStatus(Status.REDIRECT, dispatch);
    })
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
    .then(mapError)
    .then((response) => response.json())
    .then((data) => {
      setCurrentNote(data, dispatch);
    })
    .catch(handleException);
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
    .then(mapError)
    .catch(handleException);
};

export const update_note = (id: string, note: NoteSaveRequest): void => {
  fetch(`${NOTE_URL}/${id}`, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
    .then(mapError)
    .catch(handleException);
};

export const delete_note = (id: string): void => {
  fetch(`${NOTE_URL}/${id}`, {
    credentials: 'include',
    method: 'DELETE',
  })
    .then(mapError)
    .catch(handleException);
};

export const undelete_note = (id: string): void => {
  fetch(`${NOTE_URL}/undelete/${id}`, {
    credentials: 'include',
    method: 'POST',
  })
    .then(mapError)
    .catch(handleException);
};
