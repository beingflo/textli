import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import {
  authState,
  getCurrentNoteState,
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
  useSaveNote,
} from '../api/hooks';
import { useAtom } from 'jotai';
import { retrieveMainKey } from './crypto';
import { useRoute } from 'wouter';

const Bootstrapper = (): React.ReactElement => {
  const getNoteList = useGetNoteList();
  const getNote = useGetNote();
  const saveNote = useSaveNote();
  const getDeletedNoteList = useGetDeletedNoteList();
  const [, setShares] = useAtom(sharesState);
  const [authStatus, setAuthStatus] = useAtom(authState);
  const [keyStatus, setKeyStatus] = useAtom(keyState);
  const [showKeyprompt, setShowKeyprompt] = useAtom(showKeypromptState);
  const [userInfo, setUserInfo] = useAtom(userInfoState);
  const [isNote, params] = useRoute('/note/:id');
  const [currentNote] = useAtom(getCurrentNoteState);

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
          setAuthStatus(AuthStatus.SIGNED_IN);
        })
        .catch(() => {
          setAuthStatus(AuthStatus.SIGNED_OUT);
          setWaiting(false);
        });
    }
  }, [authStatus, setUserInfo, setAuthStatus, setWaiting, setKeyStatus]);

  // Run once to reload note in url
  React.useEffect(() => {
    if (authStatus === AuthStatus.SIGNED_IN && isNote && params?.id) {
      getNote(params.id);
    }
  }, [authStatus]);

  const refetchAllData = React.useCallback(() => {
    getNoteList();
    getDeletedNoteList();
    list_shares(setShares, true);
  }, [getNoteList, getDeletedNoteList, setShares]);

  const fetchDataOnVisible = React.useCallback(() => {
    if (
      document.visibilityState === 'visible' &&
      authStatus === AuthStatus.SIGNED_IN &&
      keyStatus === KeyStatus.PRESENT
    ) {
      refetchAllData();
    }
  }, [refetchAllData, authStatus, keyStatus]);

  React.useEffect(() => {
    document.addEventListener('visibilitychange', fetchDataOnVisible);

    return () => {
      document.removeEventListener('visibilitychange', fetchDataOnVisible);
    };
  }, [fetchDataOnVisible]);

  const saveDataOnHidden = React.useCallback(() => {
    if (document.visibilityState === 'hidden') {
      saveNote();
    }
  }, [saveNote]);

  React.useEffect(() => {
    document.addEventListener('visibilitychange', saveDataOnHidden);

    return () => {
      document.removeEventListener('visibilitychange', saveDataOnHidden);
    };
  }, [saveDataOnHidden]);

  React.useEffect(() => {
    if (
      authStatus === AuthStatus.SIGNED_IN &&
      keyStatus === KeyStatus.PRESENT
    ) {
      refetchAllData();
    }

    if (authStatus === AuthStatus.SIGNED_IN) {
      setWaiting(false);
    }
  }, [authStatus, keyStatus]);

  React.useEffect(() => {
    if (isNote && currentNote?.metadata?.title) {
      document.title = `${currentNote?.metadata?.title} - fieldnotes`;
    } else {
      document.title = 'fieldnotes';
    }
  }, [isNote, currentNote?.metadata?.title]);

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
