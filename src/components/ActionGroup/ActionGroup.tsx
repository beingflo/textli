import { Popover, Transition } from '@headlessui/react';
import React from 'react';
import { user_logout } from '../../api/user_api';
import {
  EyeIcon,
  LinkIcon,
  LogoutIcon,
  MoreIcon,
  PieChartIcon,
  SettingsIcon,
} from '../../icons';
import { SaveAction } from './SaveAction';
import { DeleteAction } from './DeleteAction';
import { NewAction } from './NewAction';
import '../../style.css';
import Settings from './Settings/Settings';
import { Sharing } from './Sharing';
import { AuthStatus, Share } from '../../types';
import { useAtom } from 'jotai';
import { authState, getCurrentNoteState, getSharesState } from '../state';
import Trends from './Trends';

export const ActionGroup = (): React.ReactElement => {
  const [shares] = useAtom(getSharesState);
  const [currentNote] = useAtom(getCurrentNoteState);
  const [, setAuthStatus] = useAtom(authState);
  const [showSettings, setShowSettings] = React.useState(false);
  const [showSharing, setShowSharing] = React.useState(false);
  const [showTrends, setShowTrends] = React.useState(false);
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
    <div className="space-y-1.5 fixed top-6 right-6">
      <SaveAction />
      <NewAction />
      <DeleteAction />
      <div>
        <button
          onClick={() => setShowSharing(true)}
          disabled={!currentNote}
          className="disabled:opacity-60 relative hover:-translate-x-0.5 transform transition active:scale-90"
        >
          <LinkIcon
            className={isShared ? 'text-yellow-400' : 'text-gray-700'}
          />
          {isPublic && (
            <EyeIcon className="w-4 h-4 text-red-400 absolute top-3.5 left-3.5" />
          )}
        </button>
      </div>
      <Popover className="relative">
        <Popover.Button>
          <div>
            <MoreIcon className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
          </div>
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
            <div className="space-y-1.5">
              <div>
                <button onClick={() => setShowSettings(true)}>
                  <SettingsIcon className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
                </button>
              </div>
              <div>
                <button
                  onClick={() => setShowTrends(true)}
                  className="hover:-translate-x-0.5 transform transition active:scale-90"
                >
                  <PieChartIcon className="text-gray-700" />
                </button>
              </div>
              <div>
                <button onClick={handleLogout}>
                  <LogoutIcon className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
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
      {showTrends && (
        <Trends showTrends={showTrends} setShowTrends={setShowTrends} />
      )}
    </div>
  );
};

export default ActionGroup;
