import config from '../config.json';
import {
  NoteDto,
  NoteListItemDto,
  NoteSaveRequest,
  NoteSaveResponse,
  NoteUpdateResponse,
} from '../types';
import { mapError, handleException } from './index';

const NOTE_URL = `${config.api_url}/notes`;

export const get_notes = (): Promise<Array<NoteListItemDto>> => {
  return fetch(NOTE_URL, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(mapError)
    .then((response) => response.json());
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

export const get_note = (id: string): Promise<NoteDto> => {
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

export const save_note = (note: NoteSaveRequest): Promise<NoteSaveResponse> => {
  return fetch(NOTE_URL, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
    .then(mapError)
    .then((response) => response.json());
};

export const update_note = (
  id: string,
  note: NoteSaveRequest
): Promise<NoteUpdateResponse> => {
  return fetch(`${NOTE_URL}/${id}`, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
    .then(mapError)
    .then((response) => response.json());
};

export const delete_note = (id: string): Promise<Response> => {
  return fetch(`${NOTE_URL}/${id}`, {
    credentials: 'include',
    method: 'DELETE',
  }).then(mapError);
};

export const undelete_note = (id: string): Promise<NoteDto> => {
  return fetch(`${NOTE_URL}/undelete/${id}`, {
    credentials: 'include',
    method: 'GET',
  }).then(mapError);
};
