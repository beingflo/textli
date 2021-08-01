import React from 'react';
import { useNoteList } from '../context/noteListReducer';
import { useSpinner } from '../context/spinnerReducer';

const App = (): React.ReactElement => {
  const spinner = useSpinner();
  const noteList = useNoteList();
  console.log('---');
  console.log(spinner);
  console.log(noteList);
  console.log('---');
  return <div>Textli</div>;
};

export default App;
