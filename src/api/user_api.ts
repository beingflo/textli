import config from '../config.json';
import { UserCredentials, UserCredentialsPasswordChange } from '../types';
import { mapError, handleException } from './index';

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
    .then(mapError)
    .catch(handleException);
};

export const user_logout = (): void => {
  fetch(SESSION_URL, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(mapError)
    .catch(handleException);
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
    .then(mapError)
    .catch(handleException);
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
    .then(mapError)
    .catch(handleException);
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
    .then(mapError)
    .catch(handleException);
};

export const user_info = (): void => {
  fetch(`${USER_URL}/info`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(mapError)
    .catch(handleException);
};
