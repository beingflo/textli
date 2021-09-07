import config from '../config.json';
import { AppDispatch } from '../context';
import {
  setCurrentNote,
  updateCurrentNote,
} from '../context/currentNoteReducer';
import { setNoteList } from '../context/noteListReducer';
import { setStatus } from '../context/statusReducer';
import { Note, NoteSaveRequest, Status } from '../types';
import { mapError, handleException } from './index';

const NOTE_URL = `${config.api_url}/notes`;

export const get_notes = (dispatch: AppDispatch): void => {
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
      setStatus(Status.OK, dispatch);
    })
    .catch(() => {
      setStatus(Status.REDIRECT, dispatch);
    });
};

export const get_deleted_notes = (
  onSuccess: (data: any) => void = () => {},
  onFailure: any = handleException
): void => {
  fetch(`${NOTE_URL}?deleted`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(mapError)
    .then((response) => response.json())
    .then(onSuccess)
    .catch(onFailure);
};

export const get_note = (id: string): Promise<Note> => {
  return fetch(`${NOTE_URL}/${id}`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(mapError)
    .then((response) => response.json());
};

export const save_note = (
  note: NoteSaveRequest,
  dispatch: AppDispatch,
  onSuccess: () => void = () => {},
  onFailure: any = handleException
): void => {
  fetch(NOTE_URL, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
    .then(mapError)
    .then((response) => response.json())
    .then((data) => {
      const currentNote = {
        id: data?.id,
        created_at: data?.created_at,
        modified_at: data?.modified_at,
        metadata: note?.metadata,
        content: note?.content,
        key: note?.key,
        public: note?.public,
      };
      setCurrentNote(currentNote, dispatch);
    })
    .then(onSuccess)
    .catch(onFailure);
};

export const update_note = (
  id: string,
  note: NoteSaveRequest,
  dispatch: AppDispatch,
  onSuccess: () => void = () => {},
  onFailure: any = handleException
): void => {
  fetch(`${NOTE_URL}/${id}`, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
    .then(mapError)
    .then((response) => response.json())
    .then((data) => {
      const currentNote = {
        modified_at: data?.modified_at,
        metadata: note?.metadata,
        content: note?.content,
        key: note?.key,
        public: note?.public,
      };
      updateCurrentNote(currentNote, dispatch);
    })
    .then(onSuccess)
    .catch(onFailure);
};

export const delete_note = (
  id: string,
  onSuccess: () => void = () => {},
  onFailure: any = handleException
): void => {
  fetch(`${NOTE_URL}/${id}`, {
    credentials: 'include',
    method: 'DELETE',
  })
    .then(mapError)
    .then(onSuccess)
    .catch(onFailure);
};

export const undelete_note = (
  id: string,
  onSuccess: () => void = () => {},
  onFailure: any = handleException
): void => {
  fetch(`${NOTE_URL}/undelete/${id}`, {
    credentials: 'include',
    method: 'POST',
  })
    .then(mapError)
    .then(onSuccess)
    .catch(onFailure);
};
