import { useAtom } from 'jotai';
import React from 'react';
import { user_login } from '../api/user_api';
import { authState, userInfoState } from './state';
import { Spinner } from './Spinner';
import { AuthStatus } from '../types';

const Login = (): React.ReactElement => {
  const [, setUserInfo] = useAtom(userInfoState);
  const [, setAuthStatus] = useAtom(authState);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [waiting, setWaiting] = React.useState(false);

  const submit = React.useCallback(
    (event: any) => {
      setWaiting(true);
      user_login({ name: username, password }, () =>
        setAuthStatus(AuthStatus.REATTEMPT)
      );

      event.preventDefault();
    },
    [username, password, waiting, setWaiting, setAuthStatus, setUserInfo]
  );

  const submitDisabled = !username || !password;

  return (
    <div className="mt-12">
      <form className="grid grid-cols-1 gap-6" onSubmit={submit}>
        <label className="block">
          <span className="text-gray-700 text-sm">Username</span>
          <input
            type="text"
            className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event?.target?.value)}
          />
        </label>
        <label className="block">
          <span className="text-gray-700 text-sm">Password</span>
          <input
            type="password"
            className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event?.target?.value)}
          />
        </label>
        <button
          type="submit"
          disabled={submitDisabled}
          className="w-full py-3 mt-14 bg-gray-800 rounded-md disabled:bg-gray-400
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
        >
          <div className="relative">
            <span>Login</span>
            {waiting && (
              <span className="absolute pl-2">
                <Spinner />
              </span>
            )}
          </div>
        </button>
      </form>
    </div>
  );
};

export default Login;
