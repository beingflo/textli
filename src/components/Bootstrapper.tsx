import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import {
  authState,
  currentNoteState,
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
import { useGetNoteList } from '../api/hooks';
import { useAtom } from 'jotai';
import { retrieveMainKey } from './crypto';

const Bootstrapper = (): React.ReactElement => {
  const getNoteList = useGetNoteList();
  const [, setShares] = useAtom(sharesState);
  const [authStatus, setAuthStatus] = useAtom(authState);
  const [keyStatus, setKeyStatus] = useAtom(keyState);
  const [showKeyprompt, setShowKeyprompt] = useAtom(showKeypromptState);
  const [userInfo, setUserInfo] = useAtom(userInfoState);
  const [, setCurrentNote] = useAtom(currentNoteState);

  const [waiting, setWaiting] = React.useState(true);

  React.useEffect(() => {
    if (userInfo && keyStatus === KeyStatus.MISSING) {
      retrieveMainKey(userInfo?.username).then((key: CryptoKey | undefined) => {
        if (!key) {
          setShowKeyprompt(true);
        } else {
          setKeyStatus(KeyStatus.PRESENT);
        }
      });
    }
  }, [userInfo, keyStatus]);

  React.useEffect(() => {
    if (authStatus === AuthStatus.REATTEMPT) {
      setCurrentNote(undefined);

      user_info()
        .then((data: UserInfo) => {
          setUserInfo(data);
          setAuthStatus(AuthStatus.SIGNED_IN);
        })
        .catch(() => {
          setAuthStatus(AuthStatus.SIGNED_OUT);
          setWaiting(false);
        });
    }
  }, [authStatus]);

  const refetchAllData = () => {
    getNoteList();
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
