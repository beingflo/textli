import { useAtom } from 'jotai';
import React from 'react';
import { handleException } from '../../../api';
import { invalidate_sessions } from '../../../api/user_api';
import { AuthStatus } from '../../../types';
import { authState } from '../../state';

export const UserSettings = (): React.ReactElement => {
  const [, setAuthStatus] = useAtom(authState);

  const invalidateAllSessions = React.useCallback(() => {
    invalidate_sessions()
      .then(() => {
        setAuthStatus(AuthStatus.SIGNED_OUT);
      })
      .catch(handleException);
  }, []);

  const changePassword = React.useCallback(() => {
    invalidate_sessions()
      .then(() => {
        setAuthStatus(AuthStatus.SIGNED_OUT);
      })
      .catch(handleException);
  }, []);

  const viewSalt = React.useCallback(() => {
    invalidate_sessions()
      .then(() => {
        setAuthStatus(AuthStatus.SIGNED_OUT);
      })
      .catch(handleException);
  }, []);

  const deleteAccount = React.useCallback(() => {
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
          Invalidate sessions
        </button>
      </div>
      <div className="flex flex-col">
        <span className="font-bold pb-1">Change password</span>
        <span className="pb-3">
          If you believe your account to be compromised, change your password
          and invalidate all session.
        </span>
        <button
          className="w-max mt-auto text-black p-1.5 bg-gray-200 rounded-md"
          onClick={changePassword}
        >
          Change password
        </button>
      </div>
      <div className="flex flex-col">
        <span className="font-bold pb-1">View encryption salt</span>
        <span className="pb-3">
          The salt together with your encryption password is used to derive the
          main key used in all encryption / decryption operations.
        </span>
        <button
          className="w-max mt-auto text-black p-1.5 bg-gray-200 rounded-md"
          onClick={viewSalt}
        >
          View salt
        </button>
      </div>
      <div className="flex flex-col">
        <span className="font-bold pb-1">Delete account</span>
        <span className="pb-3">
          This will delete your account and all associated data. Once confirmed,
          this is irreversible.
        </span>
        <button
          className="w-max mt-auto text-white p-1.5 bg-red-500 rounded-md"
          onClick={deleteAccount}
        >
          Delete account
        </button>
      </div>
    </div>
  );
};

export default UserSettings;
