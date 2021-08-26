import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import { get_notes } from '../api/note_api';
import { useAppDispatch } from '../context';
import 'react-toastify/dist/ReactToastify.css';
import { useStatus } from '../context/statusReducer';
import { Status } from '../types';
import App from './App';
import { SpinnerPage } from './Spinner';
import Start from './Start';

const Bootstrapper = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const status = useStatus();

  const [waiting, setWaiting] = React.useState(true);

  React.useEffect(() => {
    get_notes(dispatch);
    setWaiting(false);
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        transition={Zoom}
        hideProgressBar={true}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      {waiting ? (
        <SpinnerPage />
      ) : (
        <>{status === Status.OK ? <App /> : <Start />}</>
      )}
    </>
  );
};

export default Bootstrapper;
