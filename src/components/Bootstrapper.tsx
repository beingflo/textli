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
import KeyPrompt from './KeyPrompt';
import { user_info } from '../api/user_api';
import { list_shares } from '../api/share_api';

const Bootstrapper = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const status = useStatus();

  const [waiting, setWaiting] = React.useState(true);

  const [showKeyPrompt, setShowKeyPrompt] = React.useState(
    !localStorage.getItem('key')
  );

  React.useEffect(() => {
    get_notes(dispatch);
    user_info(dispatch);
    list_shares(dispatch);
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
        <>
          {status === Status.OK && !showKeyPrompt ? (
            <App />
          ) : status === Status.OK ? (
            <KeyPrompt setDone={() => setShowKeyPrompt(false)} />
          ) : (
            <Start />
          )}
        </>
      )}
    </>
  );
};

export default Bootstrapper;
