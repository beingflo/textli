import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import { get_notes } from '../api/note_api';
import { useAppDispatch } from '../context';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

const Bootstrapper = (): React.ReactElement => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    get_notes(dispatch);
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        transition={Zoom}
        hideProgressBar={true}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      <App />
    </>
  );
};

export default Bootstrapper;
