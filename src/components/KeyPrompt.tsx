import { useAtom } from 'jotai';
import React from 'react';
import { user_salt } from '../api/user_api';
import { getUserInfoState } from './state';
import '../style.css';
import {
  arrayBuffer2string,
  generate_main_key,
  persistMainKey,
  string2arrayBuffer,
} from './crypto';

export type Props = {
  setDone: () => void;
};

const KeyPrompt = ({ setDone }: Props): React.ReactElement => {
  const [userInfo] = useAtom(getUserInfoState);

  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const submit = React.useCallback(async () => {
    let salt;
    if (userInfo?.salt) {
      salt = string2arrayBuffer(userInfo?.salt);
    } else {
      salt = window.crypto.getRandomValues(new Uint8Array(16));
    }

    const key = await generate_main_key(password, salt);

    if (!userInfo?.salt) {
      await user_salt(arrayBuffer2string(salt));
    }

    if (!userInfo) {
      return;
    }

    try {
      await persistMainKey(key, userInfo?.username);
    } catch (e) {
      console.error('IndexedDB not supported: ', e);
    }

    setDone();
  }, [password, setDone, userInfo]);

  const passwordMatch: boolean =
    password === confirmPassword && password !== '';
  const passwordNoMatch: boolean =
    password !== confirmPassword && (password !== '' || confirmPassword !== '');

  return (
    <div className='flex h-auto'>
      <div className='mx-2 my-8 w-full rounded-md border border-dashed border-gray-300 p-8 shadow-lg sm:mx-auto sm:max-w-md'>
        <span className='highlight mx-auto text-2xl font-bold'>
          Encryption Password
        </span>
        <div className='mt-6'>
          <p>
            This password is used to derive your encryption key. Keep it save!
          </p>
          <div className='mt-1'>
            <span className='bg-red-400 p-1 text-white'>
              If you lose this, your data will be unrecoverable.
            </span>
          </div>
        </div>
        <div className='mt-8'>
          <form
            className='grid grid-cols-1 gap-6'
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
          >
            <label className='block'>
              <span className='text-sm text-gray-700'>Password</span>
              <input
                type='password'
                className='mt-0 block w-full border-0 border-b-2 border-gray-200 px-0.5 placeholder-gray-400 focus:border-gray-400 focus:ring-0'
                placeholder='Enter an encryption password'
                value={password}
                onChange={(event) => setPassword(event?.target?.value)}
              />
            </label>
            <label className='block'>
              <span className='text-sm text-gray-700'>Confirm Password</span>
              <div className='relative'>
                <input
                  type='password'
                  className='mt-0 block w-full border-0 border-b-2 border-gray-200 px-0.5 placeholder-gray-400 focus:border-gray-400 focus:ring-0'
                  placeholder='Confirm your encryption password'
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event?.target?.value)}
                />
                {passwordMatch && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    strokeWidth='2'
                    className='absolute top-3 right-3 fill-current text-green-500'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm4.768 9.14a1 1 0 1 0-1.536-1.28l-4.3 5.159-2.225-2.226a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.475-.067l5-6z'
                    />
                  </svg>
                )}
                {passwordNoMatch && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    strokeWidth='2'
                    className='absolute top-3 right-3 fill-current text-red-500'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm3.707 8.707a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293a1 1 0 1 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293z'
                    />
                  </svg>
                )}
              </div>
            </label>
            <button
              type='submit'
              disabled={passwordNoMatch}
              className='mt-14 w-full rounded-md bg-gray-800 py-3 font-medium
                    uppercase text-white hover:bg-gray-700
                    hover:shadow-none focus:outline-none disabled:bg-gray-400'
            >
              <div className='relative'>
                <span>Store</span>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KeyPrompt;
