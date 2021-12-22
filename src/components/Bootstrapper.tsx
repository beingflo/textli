import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import {
  authState,
  keyState,
  sharesState,
  showKeypromptState,
  userInfoState,
} from './state';
import 'react-toastify/dist/ReactToastify.css';
import { AuthStatus, KeyStatus, UserInfo } from '../types';
import App from './App';
import { SpinnerPage } from './Spinner';
import Start from './Start';
import KeyPrompt from './KeyPrompt';
import { user_info } from '../api/user_api';
import { list_shares } from '../api/share_api';
import {
  useGetDeletedNoteList,
  useGetNote,
  useGetNoteList,
} from '../api/hooks';
import { useAtom } from 'jotai';
import { retrieveMainKey } from './crypto';
import { useRoute } from 'wouter';

const Bootstrapper = (): React.ReactElement => {
  const getNoteList = useGetNoteList();
  const getNote = useGetNote();
  const getDeletedNoteList = useGetDeletedNoteList();
  const [, setShares] = useAtom(sharesState);
  const [authStatus, setAuthStatus] = useAtom(authState);
  const [keyStatus, setKeyStatus] = useAtom(keyState);
  const [showKeyprompt, setShowKeyprompt] = useAtom(showKeypromptState);
  const [userInfo, setUserInfo] = useAtom(userInfoState);
  const [isNote, params] = useRoute('/note/:id');

  const [waiting, setWaiting] = React.useState(true);

  React.useEffect(() => {
    if (userInfo) {
      retrieveMainKey(userInfo?.username)
        .then((key: CryptoKey | undefined) => {
          if (!key) {
            setShowKeyprompt(true);
          } else {
            setKeyStatus(KeyStatus.PRESENT);
          }
        })
        .catch(() => setShowKeyprompt(true));
    }
  }, [userInfo, keyStatus]);

  React.useEffect(() => {
    if (authStatus === AuthStatus.REATTEMPT) {
      setKeyStatus(KeyStatus.MISSING);

      user_info()
        .then((data: UserInfo) => {
          setUserInfo(data);
          if (isNote) {
            getNote(params?.id);
          }
          setAuthStatus(AuthStatus.SIGNED_IN);
        })
        .catch(() => {
          setAuthStatus(AuthStatus.SIGNED_OUT);
          setWaiting(false);
        });
    }
  }, [authStatus, isNote, getNote, params?.id]);

  const refetchAllData = () => {
    getNoteList();
    getDeletedNoteList();
    list_shares(setShares, true);
  };

  React.useEffect(() => {
    if (authStatus === AuthStatus.SIGNED_IN) {
      refetchAllData();
      setWaiting(false);
    }
  }, [authStatus]);

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
          {authStatus === AuthStatus.SIGNED_IN && !showKeyprompt ? (
            <App />
          ) : authStatus === AuthStatus.SIGNED_IN ? (
            <KeyPrompt
              setDone={() => {
                refetchAllData();
                setKeyStatus(KeyStatus.PRESENT);
                setShowKeyprompt(false);
              }}
            />
          ) : (
            <Start />
          )}
        </>
      )}
    </>
  );
};

export default Bootstrapper;
