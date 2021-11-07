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
import { AuthStatus, Share } from '../../types';
import Publishing from './Publishing';
import { useAtom } from 'jotai';
import { authState, getCurrentNoteState, getSharesState } from '../state';

export const ActionGroup = (): React.ReactElement => {
  const [shares] = useAtom(getSharesState);
  const [currentNote] = useAtom(getCurrentNoteState);
  const [, setAuthStatus] = useAtom(authState);
  const [showSettings, setShowSettings] = React.useState(false);
  const [showSharing, setShowSharing] = React.useState(false);
  const [showPublishing, setShowPublishing] = React.useState(false);
  const [isShared, setIsShared] = React.useState(false);
  const [isPublic, setIsPublic] = React.useState(false);

  const handleLogout = React.useCallback(() => {
    user_logout(() => setAuthStatus(AuthStatus.SIGNED_OUT));
  }, []);

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
    <div className="space-y-2">
      <SaveAction />
      <NewAction />
      <DeleteAction />
      <Popover className="relative">
        <Popover.Button>
          <MoreIcon
            className={`${
              isShared || isPublic ? 'text-yellow-400' : 'text-gray-700'
            } hover:-translate-x-0.5 transform transition active:scale-90`}
          />
        </Popover.Button>
        <Transition
          enter="transition-opacity ease-linear duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Panel className="absolute top-8 left-0">
            <div className="space-y-2">
              <button
                onClick={() => setShowSharing(true)}
                disabled={!currentNote}
                className="pt-1 disabled:opacity-60"
              >
                <LinkIcon
                  className={`${
                    isShared ? 'text-yellow-400' : 'text-gray-700'
                  } hover:-translate-x-0.5 transform transition active:scale-90`}
                />
              </button>
              <button
                onClick={() => setShowPublishing(true)}
                disabled={!currentNote}
                className="disabled:opacity-60"
              >
                <EyeIcon
                  className={`${
                    isPublic ? 'text-yellow-400' : 'text-gray-700'
                  } hover:-translate-x-0.5 transform transition active:scale-90`}
                />
              </button>
              <button onClick={() => setShowSettings(true)}>
                <SettingsIcon className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
              </button>
              <button onClick={handleLogout}>
                <LogoutIcon className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
              </button>
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
      {showPublishing && (
        <Publishing
          showPublishing={showPublishing}
          setShowPublishing={setShowPublishing}
        />
      )}
    </div>
  );
};

export default ActionGroup;
