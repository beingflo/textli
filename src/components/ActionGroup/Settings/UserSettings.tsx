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

  return (
    <button
      className="text-yellow-500 p-1 border border-yellow-500 rounded-md"
      onClick={invalidateAllSessions}
    >
      Invalidate all sessions
    </button>
  );
};

export default UserSettings;
