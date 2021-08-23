import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import { get_notes } from '../api/note_api';
import { useAppDispatch } from '../context';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import { useStatus } from '../context/statusReducer';
import { Status } from '../types';
import App from './App';
import { useSpinner } from '../context/spinnerReducer';
import Spinner from './Spinner';

const Bootstrapper = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const waiting = useSpinner();
  const status = useStatus();

  React.useEffect(() => get_notes(dispatch), [dispatch]);

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
      {waiting ? (
        <Spinner />
      ) : (
        <>{status === Status.OK ? <App /> : <Login />}</>
      )}
    </>
  );
};

export default Bootstrapper;
