import config from './config.json';
import { AppDispatch } from './context';
import { setCurrentNote } from './context/currentNoteReducer';
import { setNoteList } from './context/noteListReducer';
import { setSpinner } from './context/spinnerReducer';
import {
  NoteSaveRequest,
  UserCredentials,
  UserCredentialsPasswordChange,
} from './types';

const NOTE_URL = `${config.api_url}/notes`;
const USER_URL = `${config.api_url}/user`;
const SESSION_URL = `${config.api_url}/session`;

export const user_login = (credentials: UserCredentials): void => {
  fetch(SESSION_URL, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => {
      if (response.status < 200 && response.status >= 300) {
        console.log(response);
      }
    })
    .catch((error) => console.log(error));
};

export const user_logout = (): void => {
  fetch(SESSION_URL, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.status < 200 && response.status >= 300) {
        console.log(response);
      }
    })
    .catch((error) => console.log(error));
};

export const user_signup = (credentials: UserCredentials): void => {
  fetch(USER_URL, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => {
      if (response.status < 200 && response.status >= 300) {
        console.log(response);
      }
    })
    .catch((error) => console.log(error));
};

export const user_delete = (credentials: UserCredentials): void => {
  fetch(USER_URL, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => {
      if (response.status < 200 && response.status >= 300) {
        console.log(response);
      }
    })
    .catch((error) => console.log(error));
};

export const user_password_change = (
  credentials: UserCredentialsPasswordChange
): void => {
  fetch(USER_URL, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => {
      if (response.status < 200 && response.status >= 300) {
        console.log(response);
      }
    })
    .catch((error) => console.log(error));
};

export const user_info = (): void => {
  fetch(`${USER_URL}/info`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
};

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

export const update_note = (id: string, note: NoteSaveRequest): void => {
  fetch(`${NOTE_URL}/${id}`, {
    credentials: 'include',
    method: 'PUT',
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

export const undelete_note = (id: string): void => {
  fetch(`${NOTE_URL}/undelete/${id}`, {
    credentials: 'include',
    method: 'POST',
  })
    .then((response) => {
      if (response.status < 200 && response.status >= 300) {
        console.log(response);
      }
    })
    .catch((error) => console.log(error));
};
