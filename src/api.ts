import config from './config.json';
import { AppDispatch } from './context';
import { setNoteList } from './context/noteListReducer';
import { setSpinner } from './context/spinnerReducer';

const GET_NOTE_URL = `${config.api_url}/notes`;

export const get_notes = (dispatch: AppDispatch): void => {
  setSpinner(true, dispatch);

  fetch(GET_NOTE_URL, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setNoteList(data, dispatch);
      setSpinner(false, dispatch);
    })
    .catch((error) => console.log(error))
    .finally(() => setSpinner(false, dispatch));
};
