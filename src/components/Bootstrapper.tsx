import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import { getStatusState, sharesState, showKeypromptState, useAppDispatch, userInfoState } from '../context';
import 'react-toastify/dist/ReactToastify.css';
import { Status } from '../types';
import App from './App';
import { SpinnerPage } from './Spinner';
import Start from './Start';
import KeyPrompt from './KeyPrompt';
import { user_info } from '../api/user_api';
import { list_shares } from '../api/share_api';
import { get } from 'idb-keyval';
import { useGetNoteList } from '../api/hooks';
import { useAtom } from 'jotai';

const Bootstrapper = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const getNoteList = useGetNoteList();
  const [, setShares] = useAtom(sharesState);
  const [status] = useAtom(getStatusState);
  const [showKeyprompt, setShowKeyprompt] = useAtom(showKeypromptState);
  const [, setUserInfo] = useAtom(userInfoState);

  const [waiting, setWaiting] = React.useState(true);

  React.useEffect(() => {
    get('workspaces').then((workspaces) => {
      if (!workspaces || workspaces?.length === 0) {
        setShowKeyprompt(true);
      }
    });
  }, [dispatch]);

  React.useEffect(() => {
    getNoteList();
    user_info(setUserInfo, true);
    list_shares(setShares, true);
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
            <KeyPrompt setDone={() => setShowKeyprompt(false)} />
          ) : (
            <Start />
          )}
        </>
      )}
    </>
  );
};

export default Bootstrapper;
