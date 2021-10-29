import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import { useAppDispatch, userInfoAtom } from '../context';
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
import {
  setShowKeyprompt,
  useShowKeypromt,
} from '../context/showKeypromtReducer';
import { useAtom } from 'jotai';

const Bootstrapper = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const getNoteList = useGetNoteList();
  const status = useStatus();
  const showKeyprompt = useShowKeypromt();
  const [, setUserInfo] = useAtom(userInfoAtom);

  const [waiting, setWaiting] = React.useState(true);

  React.useEffect(() => {
    get('workspaces').then((workspaces) => {
      if (!workspaces || workspaces?.length === 0) {
        setShowKeyprompt(true, dispatch);
      }
    });
  }, [dispatch]);

  React.useEffect(() => {
    getNoteList();
    user_info(setUserInfo, true);
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
          {status === Status.OK && !showKeyprompt ? (
            <App />
          ) : status === Status.OK ? (
            <KeyPrompt setDone={() => setShowKeyprompt(false, dispatch)} />
          ) : (
            <Start />
          )}
        </>
      )}
    </>
  );
};

export default Bootstrapper;
