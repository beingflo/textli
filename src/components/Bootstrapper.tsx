import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
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
import { get } from 'idb-keyval';
import { useGetNoteList } from '../api/hooks';

const Bootstrapper = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const getNoteList = useGetNoteList();
  const status = useStatus();

  const [waiting, setWaiting] = React.useState(true);

  const [showKeyPrompt, setShowKeyPrompt] = React.useState(true);

  React.useEffect(() => {
    get('workspaces').then((workspaces) => {
      if (workspaces.length > 0) {
        setShowKeyPrompt(false);
      }
    });
  }, [setShowKeyPrompt]);

  React.useEffect(() => {
    getNoteList();
    user_info(dispatch, true);
    list_shares(dispatch, true);
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
