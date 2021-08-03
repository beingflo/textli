import React from 'react';
import { get_notes } from '../api';
import { useAppDispatch } from '../context';
import App from './App';

const Bootstrapper = (): React.ReactElement => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    get_notes(dispatch);
  }, []);

  return <App />;
};

export default Bootstrapper;
