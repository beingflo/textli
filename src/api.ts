import config from './config.json';

const GET_NOTE_URL = `${config.api_url}/notes`;

export const get_notes = (): void => {
  fetch(GET_NOTE_URL, {
    credentials: 'include',
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
