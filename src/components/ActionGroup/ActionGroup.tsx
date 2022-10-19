import { Popover, Transition } from '@headlessui/react';
import React from 'react';
import { user_logout } from '../../api/user_api';
import {
  EyeIcon,
  LinkIcon,
  LogoutIcon,
  MoreIcon,
  SettingsIcon,
} from '../../icons';
import { SaveAction } from './SaveAction';
import { DeleteAction } from './DeleteAction';
import { NewAction } from './NewAction';
import '../../style.css';
import Settings from './Settings/Settings';
import { Sharing } from './Sharing';
import { AuthStatus, KeyStatus, Share } from '../../types';
import { useAtom } from 'jotai';
import {
  authState,
  getCurrentNoteState,
  getSharesState,
  getUserInfoState,
  keyState,
} from '../state';
import { removeMainKey } from '../crypto';

export const ActionGroup = (): React.ReactElement => {
  const [shares] = useAtom(getSharesState);
  const [userInfo] = useAtom(getUserInfoState);
  const [currentNote] = useAtom(getCurrentNoteState);
  const [, setAuthStatus] = useAtom(authState);
  const [, setKeyStatus] = useAtom(keyState);
  const [showSettings, setShowSettings] = React.useState(false);
  const [showSharing, setShowSharing] = React.useState(false);
  const [isShared, setIsShared] = React.useState(false);
  const [isPublic, setIsPublic] = React.useState(false);

  const handleLogout = React.useCallback(() => {
    user_logout(() => setAuthStatus(AuthStatus.SIGNED_OUT));
    if (userInfo?.username) {
      removeMainKey(userInfo?.username);
      setKeyStatus(KeyStatus.MISSING);
    }
  }, [userInfo, setKeyStatus]);

  React.useEffect(() => {
    const share = shares.find(
      (share: Share) => share?.note === currentNote?.id
    );
    setIsShared(!!share);
  }, [shares, currentNote]);

  React.useEffect(() => {
    const share = shares.find(
      (share: Share) => share?.note === currentNote?.id && share?.public
    );
    setIsPublic(!!share);
  }, [currentNote, shares]);

  return (
    <div className='fixed top-6 right-6 flex flex-row space-x-6 sm:flex-col sm:space-x-0 sm:space-y-1.5'>
      <SaveAction />
      <NewAction />
      <DeleteAction />
      <div>
        <button
          onClick={() => setShowSharing(true)}
          disabled={!currentNote}
          className='relative transition hover:-translate-x-0.5 active:scale-90 disabled:opacity-60'
        >
          <LinkIcon
            className={`${
              isShared && 'icon-highlight'
            } h-7 w-7 text-black sm:h-6 sm:w-6`}
          />
          {isPublic && (
            <EyeIcon className='absolute top-4 left-4 h-4 w-4 text-green-600 sm:top-3.5 sm:left-3.5' />
          )}
        </button>
      </div>
      <Popover className='relative'>
        <Popover.Button className='focus:outline-none'>
          <div>
            <MoreIcon className='h-7 w-7 text-black transition hover:-translate-x-0.5 active:scale-90 sm:h-6 sm:w-6' />
          </div>
        </Popover.Button>
        <Transition
          enter='transition-opacity ease-linear duration-75'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity ease-linear duration-75'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Popover.Panel className='absolute top-8 -left-2 rounded border border-gray-800 bg-white p-2 shadow-lg sm:left-0 sm:border-none sm:p-0 sm:shadow-none'>
            <div className='space-y-4 sm:space-y-1.5'>
              <div>
                <button onClick={() => setShowSettings(true)}>
                  <SettingsIcon className='h-7 w-7 text-black transition hover:-translate-x-0.5 active:scale-90 sm:h-6 sm:w-6' />
                </button>
              </div>
              <div>
                <button onClick={handleLogout}>
                  <LogoutIcon className='h-7 w-7 text-black transition hover:-translate-x-0.5 active:scale-90 sm:h-6 sm:w-6' />
                </button>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      {showSettings && (
        <Settings
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />
      )}
      {showSharing && (
        <Sharing showSharing={showSharing} setShowSharing={setShowSharing} />
      )}
    </div>
  );
};

export default ActionGroup;
