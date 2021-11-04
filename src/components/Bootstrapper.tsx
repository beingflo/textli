import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import { authState, sharesState, showKeypromptState, userInfoState } from './state';
import 'react-toastify/dist/ReactToastify.css';
import { AuthStatus, UserInfo } from '../types';
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
  const [showKeyprompt, setShowKeyprompt] = useAtom(showKeypromptState);
  const [userInfo, setUserInfo] = useAtom(userInfoState);

  const [waiting, setWaiting] = React.useState(true);

  React.useEffect(() => {
    if(userInfo) {
      retrieveMainKey(userInfo?.username).then((key: CryptoKey | undefined) => {
        if(!key) {
          setShowKeyprompt(true);
        }
      })
    }
  }, [userInfo]);

  React.useEffect(() => {
    if (authStatus === AuthStatus.REATTEMPT) {
      user_info().then((data: UserInfo) => {
        setUserInfo(data);
        setAuthStatus(AuthStatus.SIGNED_IN);
      }).catch(() => {
        setAuthStatus(AuthStatus.SIGNED_OUT);
        setWaiting(false);
      });
    }
  }, [authStatus]);

  const refetchAllData = () => {
    getNoteList();
    list_shares(setShares, true);
  }

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
            <KeyPrompt setDone={() => { 
                refetchAllData()
                setShowKeyprompt(false);
              }
            } />
          ) : (
            <Start />
          )}
        </>
      )}
    </>
  );
};

export default Bootstrapper;
