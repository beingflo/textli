import { useAtom } from 'jotai';
import React from 'react';
import { user_login } from '../api/user_api';
import { authState, userInfoState } from './state';
import { SpinnerPage } from './Spinner';
import { AuthStatus } from '../types';
import { handleException } from '../api';

const Login = (): React.ReactElement => {
  const [, setUserInfo] = useAtom(userInfoState);
  const [, setAuthStatus] = useAtom(authState);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [waiting, setWaiting] = React.useState(false);

  const submit = React.useCallback(
    (event: any) => {
      setWaiting(true);
      user_login({ name: username, password })
        .then(() => setAuthStatus(AuthStatus.REATTEMPT))
        .catch(handleException)
        .finally(() => setWaiting(false));

      event.preventDefault();
    },
    [username, password, waiting, setWaiting, setAuthStatus, setUserInfo]
  );

  const submitDisabled = !username || !password;

  return (
    <>
      <SpinnerPage show={waiting} />
      <div className='mt-12'>
        <form className='grid grid-cols-1 gap-6' onSubmit={submit}>
          <label className='block'>
            <span className='text-sm text-gray-700'>Username</span>
            <input
              type='text'
              className='mt-0 block w-full border-0 border-b-2 border-gray-200 px-0.5 placeholder-gray-400 focus:border-gray-400 focus:ring-0'
              placeholder='Enter your username'
              value={username}
              onChange={(event) => setUsername(event?.target?.value)}
            />
          </label>
          <label className='block'>
            <span className='text-sm text-gray-700'>Password</span>
            <input
              type='password'
              className='mt-0 block w-full border-0 border-b-2 border-gray-200 px-0.5 placeholder-gray-400 focus:border-gray-400 focus:ring-0'
              placeholder='Enter your password'
              value={password}
              onChange={(event) => setPassword(event?.target?.value)}
            />
          </label>
          <button
            type='submit'
            disabled={submitDisabled}
            className='mt-14 w-full rounded-md bg-gray-800 py-3 font-medium
                    uppercase text-white hover:bg-gray-700
                    hover:shadow-none focus:outline-none disabled:bg-gray-400'
          >
            <div className='relative'>
              <span>Login</span>
            </div>
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
