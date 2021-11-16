import { Popover } from '@headlessui/react';
import { useAtom } from 'jotai';
import React from 'react';
import { handleException } from '../../../api';
import { invalidate_sessions } from '../../../api/user_api';
import { AuthStatus } from '../../../types';
import { authState, getUserInfoState } from '../../state';

const DeleteConfirm = (): React.ReactElement => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [, setAuthStatus] = useAtom(authState);

  const deleteAccount = React.useCallback(() => {
    invalidate_sessions()
      .then(() => {
        setAuthStatus(AuthStatus.SIGNED_OUT);
      })
      .catch(handleException);
  }, []);

  return (
    <div>
      <div className="font-bold pb-2">Confirm action</div>
      <label className="block">
        <span className="text-gray-700 text-sm">Username</span>
        <input
          type="text"
          className="border border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400 bg-white rounded-md w-full"
          placeholder="Enter your username"
          value={username}
          onChange={(event) => setUsername(event?.target?.value)}
        />
      </label>
      <label className="block">
        <span className="text-gray-700 text-sm">Password</span>
        <input
          type="password"
          className="border border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400 bg-white rounded-md w-full"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event?.target?.value)}
        />
      </label>
      <button className="mt-2 rounded-md p-2 bg-gray-200 text-black">
        Confirm
      </button>
    </div>
  );
};

const ChangeConfirm = (): React.ReactElement => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const changePassword = React.useCallback(() => {
    invalidate_sessions().catch(handleException);
  }, []);

  return (
    <div>
      <div className="font-bold pb-2">Confirm action</div>
      <label className="block">
        <span className="text-gray-700 text-sm">Username</span>
        <input
          type="text"
          className="border border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400 bg-white rounded-md w-full"
          placeholder="Enter your username"
          value={username}
          onChange={(event) => setUsername(event?.target?.value)}
        />
      </label>
      <label className="block">
        <span className="text-gray-700 text-sm">Password</span>
        <input
          type="password"
          className="border border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400 bg-white rounded-md w-full"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event?.target?.value)}
        />
      </label>
      <button className="mt-2 rounded-md p-2 bg-gray-200 text-black">
        Confirm
      </button>
    </div>
  );
};

export const UserSettings = (): React.ReactElement => {
  const [, setAuthStatus] = useAtom(authState);
  const [userInfo] = useAtom(getUserInfoState);

  const invalidateAllSessions = React.useCallback(() => {
    invalidate_sessions()
      .then(() => {
        setAuthStatus(AuthStatus.SIGNED_OUT);
      })
      .catch(handleException);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col">
        <span className="font-bold pb-1">Invalidate all sessions</span>
        <span className="pb-3">
          Invalidating all sessions will log you out of all your devices. If you
          belive your account to be compromised, also change your password.
        </span>
        <button
          className="w-max mt-auto text-black p-1.5 bg-gray-200 rounded-md"
          onClick={invalidateAllSessions}
        >
          Invalidate all sessions
        </button>
      </div>
      <div className="flex flex-col">
        <span className="font-bold pb-1">Change password</span>
        <span className="pb-3">
          If you believe your account to be compromised, also invalidate all
          sessions.
        </span>
        <Popover className="relative mt-auto">
          <Popover.Button className="w-max text-black p-1.5 bg-gray-200 rounded-md">
            Change password
          </Popover.Button>
          <Popover.Panel className="absolute z-10 top-10 bg-white p-2 border border-black rounded-md">
            <ChangeConfirm />
          </Popover.Panel>
        </Popover>
      </div>
      <div className="flex flex-col">
        <span className="font-bold pb-1">Encryption salt</span>
        <span className="pb-3">
          The salt together with your encryption password is used to derive the
          main key used in all encryption / decryption operations.
        </span>
        <span className="text-yellow-400 font-bold">{userInfo?.salt}</span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold pb-1">Delete account</span>
        <span className="pb-3">
          This will delete your account and all associated data. Once confirmed,
          this is irreversible.
        </span>
        <Popover className="relative mt-auto">
          <Popover.Button className="w-max text-white p-1.5 bg-red-500 rounded-md">
            Delete account
          </Popover.Button>
          <Popover.Panel className="absolute z-10 top-10 bg-white p-2 border border-black rounded-md">
            <DeleteConfirm />
          </Popover.Panel>
        </Popover>
      </div>
    </div>
  );
};

export default UserSettings;
