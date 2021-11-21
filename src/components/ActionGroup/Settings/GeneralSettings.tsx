import { useAtom } from 'jotai';
import React from 'react';
import { toast } from 'react-toastify';
import { handleException } from '../../../api';
import {
  invalidate_sessions,
  user_delete,
  user_password_change,
} from '../../../api/user_api';
import { ArrowLeftIcon } from '../../../icons';
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
        <SessionConfirm setSessionConfirm={setSessionConfirm} />
      ) : passwordConfirm ? (
        <PasswordConfirm setPasswordConfirm={setPasswordConfirm} />
      ) : deleteConfirm ? (
        <DeleteConfirm setDeleteConfirm={setDeleteConfirm} />
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
              {balance < 0 && balance > -1 && (
                <div className="mt-6 p-1 text-red-500">
                  If you are more than one month overdraft, your account will
                  become read only.
                </div>
              )}
              {balance < -1 && (
                <div className="mt-6 p-1 text-red-600 font-bold">
                  You are more than one month overdraft, this account is read
                  only until you add funds.
                </div>
              )}
            </div>
            <button className="ml-auto w-max mt-4 lg:mt-0 h-10 p-1.5 rounded-md bg-green-600 text-white font-semibold hover:bg-green-500 active:bg-green-600 transition">
              Add funds
            </button>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-8 pt-4">
            <div className="flex flex-col">
              <span className="font-bold pb-1">Sessions</span>
              <button
                className="w-max p-1.5 border border-gray-500 rounded-md hover:bg-gray-100"
                onClick={() => setSessionConfirm(true)}
              >
                Invalidate all sessions
              </button>
            </div>
            <div className="flex flex-col">
              <span className="font-bold pb-1">Password</span>
              <button
                className="w-max p-1.5 border border-gray-500 rounded-md hover:bg-gray-100"
                onClick={() => setPasswordConfirm(true)}
              >
                Change password
              </button>
            </div>
            <div className="flex flex-col">
              <span className="font-bold pb-1">Delete account</span>
              <button
                className="w-max p-1.5 text-red-500 border border-red-500 rounded-md hover:bg-red-100"
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

const SessionConfirm = ({ setSessionConfirm }: any): React.ReactElement => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [, setAuthStatus] = useAtom(authState);

  const invalidateAllSessions = React.useCallback((event) => {
    invalidate_sessions()
      .then(() => {
        setAuthStatus(AuthStatus.SIGNED_OUT);
      })
      .catch(handleException);

    event.preventDefault();
  }, []);

  return (
    <>
      <button
        onClick={() => setSessionConfirm(false)}
        className="mb-4 text-gray-600 hover:-translate-x-0.5 transform transition active:translate-x-0"
      >
        <div className="flex flex-row gap-1">
          <ArrowLeftIcon className="w-6 h-6" />
          Back to general settings
        </div>
      </button>
      <div className="font-bold pb-2">Delete all sessions</div>
      <div className="pb-4">
        This will log you out of any device and sessions you may have.
      </div>
      <form className="grid grid-cols-1 gap-2" onSubmit={invalidateAllSessions}>
        <label className="block lg:w-1/2">
          <span className="text-gray-700 text-sm">Username</span>
          <input
            type="text"
            className="border border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400 bg-white rounded-md w-full"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event?.target?.value)}
          />
        </label>
        <label className="block lg:w-1/2">
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
          type="submit"
          className="w-max mt-2 p-1.5 border border-gray-500 rounded-md hover:bg-gray-100"
        >
          Confirm
        </button>
      </form>
    </>
  );
};

const PasswordConfirm = ({ setPasswordConfirm }: any): React.ReactElement => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [repeatNewPassword, setRepeatNewPassword] = React.useState('');

  const changePassword = React.useCallback(
    (event) => {
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

      event.preventDefault();
    },
    [password, newPassword, repeatNewPassword]
  );

  return (
    <div>
      <button
        onClick={() => setPasswordConfirm(false)}
        className="mb-4 text-gray-600 hover:-translate-x-0.5 transform transition active:translate-x-0"
      >
        <div className="flex flex-row gap-1">
          <ArrowLeftIcon className="w-6 h-6" />
          Back to general settings
        </div>
      </button>
      <div className="font-bold pb-2">Change password</div>
      <form className="grid grid-cols-1 gap-2" onSubmit={changePassword}>
        <label className="block lg:w-1/2">
          <span className="text-gray-700 text-sm">Username</span>
          <input
            type="text"
            className="border border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400 bg-white rounded-md w-full"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event?.target?.value)}
          />
        </label>
        <label className="block lg:w-1/2">
          <span className="text-gray-700 text-sm">Old password</span>
          <input
            type="password"
            className="border border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400 bg-white rounded-md w-full"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event?.target?.value)}
          />
        </label>
        <label className="block lg:w-1/2">
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
          type="submit"
          className="w-max mt-6 p-1.5 border border-gray-500 rounded-md hover:bg-gray-100"
          disabled={newPassword !== repeatNewPassword}
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

const DeleteConfirm = ({ setDeleteConfirm }: any): React.ReactElement => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [, setAuthStatus] = useAtom(authState);

  const deleteAccount = React.useCallback(
    (event) => {
      user_delete({ name: username, password })
        .then(() => {
          toast.success('User successfully deleted');
          setAuthStatus(AuthStatus.SIGNED_OUT);
        })
        .catch(handleException);

      event.preventDefault();
    },
    [password, username]
  );

  return (
    <>
      <button
        onClick={() => setDeleteConfirm(false)}
        className="mb-4 text-gray-600 hover:-translate-x-0.5 transform transition active:translate-x-0"
      >
        <div className="flex flex-row gap-1">
          <ArrowLeftIcon className="w-6 h-6" />
          Back to general settings
        </div>
      </button>
      <div className="font-bold pb-1">Delete account</div>
      <div className="font-bold text-red-500 pb-2">
        This action is irreversible!
      </div>
      <form className="grid grid-cols-1 gap-2" onSubmit={deleteAccount}>
        <label className="block lg:w-1/2">
          <span className="text-gray-700 text-sm">Username</span>
          <input
            type="text"
            className="border border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400 bg-white rounded-md w-full"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event?.target?.value)}
          />
        </label>
        <label className="block lg:w-1/2">
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
          type="submit"
          className="w-max p-1.5 mt-6 text-red-500 border border-red-500 rounded-md hover:bg-red-100"
        >
          Confirm
        </button>
      </form>
    </>
  );
};

export default GeneralSettings;
