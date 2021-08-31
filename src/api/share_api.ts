import config from '../config.json';
import { mapError, handleException } from './index';
import { CreateShareRequest } from '../types';
import { setShares } from '../context/sharesReducer';
import { AppDispatch } from '../context';

const SHARE_URL = `${config.api_url}/share`;

export const list_shares = (dispatch: AppDispatch): void => {
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
    .catch(handleException);
};

export const create_share = (share: CreateShareRequest): void => {
  fetch(SHARE_URL, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(share),
  })
    .then(mapError)
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

export const delete_share = (id: string): void => {
  fetch(`${SHARE_URL}/${id}`, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(mapError)
    .catch(handleException);
};
