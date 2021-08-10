import React from 'react';
import { ToastContainer } from 'react-toastify';
import { get_notes } from '../api';
import { useAppDispatch } from '../context';
import App from './App';

const Bootstrapper = (): React.ReactElement => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    get_notes(dispatch);
  }, []);

  return (
    <>
      <ToastContainer />
      <App />
    </>
  );
};

export default Bootstrapper;
