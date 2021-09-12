import config from '../config.json';
import { mapError, handleException } from './index';
import { CreateShareRequest, Share } from '../types';
import { setShares } from '../context/sharesReducer';
import { AppDispatch } from '../context';

const SHARE_URL = `${config.api_url}/shares`;

export const list_shares = (dispatch: AppDispatch, silent = false): void => {
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
      setShares(data, dispatch);
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
