import { mapError, handleException } from './index';
import { CreateShareRequest, Share } from '../types';

const SHARE_URL = `${import.meta.env.VITE_API_URL}/shares`;

export const list_shares = (
  setShares: (shares: Array<Share>) => void,
  silent = false
): void => {
  fetch(SHARE_URL, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(mapError)
    .then((response) => response.json())
    .then((data) => {
      setShares(data);
    })
    .catch((error) => handleException(error, silent));
};

export const create_share = (share: CreateShareRequest): Promise<Share> => {
  return fetch(SHARE_URL, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(share),
  })
    .then(mapError)
    .then((response) => response.json())
    .catch(handleException);
};

export const access_share = (id: string): void => {
  fetch(`${SHARE_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(mapError)
    .catch(handleException);
};

export const delete_share = (id: string): Promise<void> => {
  return fetch(`${SHARE_URL}/${id}`, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(mapError)
    .catch(handleException);
};
