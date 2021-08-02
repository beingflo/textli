import React from 'react';
import { get_notes } from '../api';
import { useSetNoteList } from '../context/noteListReducer';
import App from './App';

const Bootstrapper = (): React.ReactElement => {
  const setNoteList = useSetNoteList();

  React.useEffect(() => {
    get_notes(setNoteList);
  }, [setNoteList]);

  return <App />;
};

export default Bootstrapper;
