import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import { getAuthState, sharesState, showKeypromptState, userInfoState } from './state';
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
import { handleException } from '../api';

const Bootstrapper = (): React.ReactElement => {
  const getNoteList = useGetNoteList();
  const [, setShares] = useAtom(sharesState);
  const [authStatus] = useAtom(getAuthState);
  const [showKeyprompt, setShowKeyprompt] = useAtom(showKeypromptState);
  const [userInfo, setUserInfo] = useAtom(userInfoState);

  const [waiting, setWaiting] = React.useState(true);
  console.log(document.cookie.indexOf('token'));

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
    user_info().then((data: UserInfo) => {
      setUserInfo(data);
      getNoteList();
      list_shares(setShares, true);
      setWaiting(false);
    }).catch(handleException);
  }, [status]);

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
          ) : authStatus === AuthStatus.SIGNED_OUT ? (
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
