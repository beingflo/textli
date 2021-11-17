import { useAtom } from 'jotai';
import React from 'react';
import { toast } from 'react-toastify';
import { handleException } from '../../../api';
import {
  invalidate_sessions,
  user_delete,
  user_password_change,
} from '../../../api/user_api';
import { AuthStatus } from '../../../types';
import { authState, getUserInfoState } from '../../state';

export const GeneralSettings = (): React.ReactElement => {
  const [deleteConfirm, setDeleteConfirm] = React.useState(false);
  const [passwordConfirm, setPasswordConfirm] = React.useState(false);
  const [sessionConfirm, setSessionConfirm] = React.useState(false);

  const [userInfo] = useAtom(getUserInfoState);

  const balance = parseFloat(userInfo?.balance ?? '0');
  const balanceFixed = balance.toFixed(2);
  const balance_days = parseFloat(userInfo?.remaining_days ?? '0');
  const remaining_weeks = (balance_days / 7).toFixed(1);

  return (
    <>
      {sessionConfirm ? (
        <SessionConfirm />
      ) : passwordConfirm ? (
        <PasswordConfirm />
      ) : deleteConfirm ? (
        <DeleteConfirm />
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 pb-8">
            <div>
              <div className="flex justify-between">
                <span>Balance</span>
                <div>
                  <span className="mr-1 text-xs text-gray-600">USD</span>
                  <span className="font-bold">${balanceFixed}</span>
                </div>
              </div>
              <div className="mt-2 flex justify-between">
                <span>Remaining weeks</span>
                <span className="font-bold">{remaining_weeks}</span>
              </div>
              {balance < 0 && (
                <div className="mt-6 p-1 text-red-500">
                  If you are more than one month overdraft, your account will
                  become read only.
                </div>
              )}
            </div>
            <button className="ml-auto w-max mt-4 lg:mt-0 h-10 p-1.5 rounded-md bg-green-600 text-white font-semibold hover:bg-green-500 active:bg-green-600 transition">
              Add funds
            </button>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-8 border-t border-gray-600 border-dashed pt-8">
            <div className="flex flex-col">
              <span className="font-bold pb-1">Sessions</span>
              <button
                className="w-max mt-auto text-black p-1.5 border border-gray-500 rounded-md"
                onClick={() => setSessionConfirm(true)}
              >
                Invalidate all sessions
              </button>
            </div>
            <div className="flex flex-col">
              <span className="font-bold pb-1">Password</span>
              <button
                className="w-max text-black p-1.5 border border-gray-500 rounded-md"
                onClick={() => setPasswordConfirm(true)}
              >
                Change password
              </button>
            </div>
            <div className="flex flex-col">
              <span className="font-bold pb-1">Delete account</span>
              <button
                className="w-max text-white p-1.5 bg-red-500 rounded-md"
                onClick={() => setDeleteConfirm(true)}
              >
                Delete account
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const SessionConfirm = (): React.ReactElement => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [, setAuthStatus] = useAtom(authState);

  const invalidateAllSessions = React.useCallback(() => {
    invalidate_sessions()
      .then(() => {
        setAuthStatus(AuthStatus.SIGNED_OUT);
      })
      .catch(handleException);
  }, []);

  return (
    <>
      <div className="font-bold pb-2">Confirm deletion of sessions</div>
      <div className="pb-4">
        This will log you out of any device and sesion you may have.
      </div>
      <label className="block pb-2 lg:w-1/2">
        <span className="text-gray-700 text-sm">Username</span>
        <input
          type="text"
          className="border border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400 bg-white rounded-md w-full"
          placeholder="Enter your username"
          value={username}
          onChange={(event) => setUsername(event?.target?.value)}
        />
      </label>
      <label className="block pb-4 lg:w-1/2">
        <span className="text-gray-700 text-sm">Password</span>
        <input
          type="password"
          className="border border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400 bg-white rounded-md w-full"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event?.target?.value)}
        />
      </label>
      <button
        className="mt-2 rounded-md p-2 bg-gray-200 text-black"
        onClick={invalidateAllSessions}
      >
        Confirm
      </button>
    </>
  );
};

const PasswordConfirm = (): React.ReactElement => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [repeatNewPassword, setRepeatNewPassword] = React.useState('');

  const changePassword = React.useCallback(() => {
    if (newPassword !== repeatNewPassword) {
      return;
    }

    user_password_change({
      name: username,
      password,
      password_new: newPassword,
    })
      .then(() => toast.success('Password changed successfully'))
      .catch(handleException);
  }, [password, newPassword, repeatNewPassword]);

  return (
    <div>
      <div className="font-bold pb-2">Confirm action</div>
      <label className="block pb-2 lg:w-1/2">
        <span className="text-gray-700 text-sm">Username</span>
        <input
          type="text"
          className="border border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400 bg-white rounded-md w-full"
          placeholder="Enter your username"
          value={username}
          onChange={(event) => setUsername(event?.target?.value)}
        />
      </label>
      <label className="block pb-2 lg:w-1/2">
        <span className="text-gray-700 text-sm">Old password</span>
        <input
          type="password"
          className="border border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400 bg-white rounded-md w-full"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event?.target?.value)}
        />
      </label>
      <label className="block pb-2 lg:w-1/2">
        <span className="text-gray-700 text-sm">New password</span>
        <input
          type="password"
          className="border border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400 bg-white rounded-md w-full"
          placeholder="Enter your password"
          value={newPassword}
          onChange={(event) => setNewPassword(event?.target?.value)}
        />
      </label>
      <label className="block lg:w-1/2">
        <span className="text-gray-700 text-sm">Repeat new password</span>
        <input
          type="password"
          className="border border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400 bg-white rounded-md w-full"
          placeholder="Enter your password"
          value={repeatNewPassword}
          onChange={(event) => setRepeatNewPassword(event?.target?.value)}
        />
      </label>
      {newPassword !== repeatNewPassword && (
        <div className="text-red-600">Password mismatch!</div>
      )}
      <button
        className="mt-6 rounded-md p-2 bg-gray-200 text-black disabled:bg-gray-100"
        onClick={changePassword}
        disabled={newPassword !== repeatNewPassword}
      >
        Confirm
      </button>
    </div>
  );
};

const DeleteConfirm = (): React.ReactElement => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [, setAuthStatus] = useAtom(authState);

  const deleteAccount = React.useCallback(() => {
    user_delete({ name: username, password })
      .then(() => {
        setAuthStatus(AuthStatus.SIGNED_OUT);
      })
      .catch(handleException);
  }, []);

  return (
    <>
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
      <button
        className="mt-2 rounded-md p-2 bg-gray-200 text-black"
        onClick={deleteAccount}
      >
        Confirm
      </button>
    </>
  );
};

export default GeneralSettings;
