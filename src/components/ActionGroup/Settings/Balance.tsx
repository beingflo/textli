import { useAtom } from 'jotai';
import React from 'react';
import { getUserInfoState } from '../../context';

export const Balance = (): React.ReactElement => {
  const [userInfo] = useAtom(getUserInfoState);

  const balance = parseFloat(userInfo?.balance ?? '0').toFixed(2);
  const balance_days = parseFloat(userInfo?.remaining_days ?? '0');
  const remaining_weeks = (balance_days / 7).toFixed(2);

  return (
    <>
      <div className="flex justify-between">
        <span className="">Balance</span>
        <div>
          <span className="mr-1 text-xs text-gray-600">USD</span>
          <span className="font-bold">${balance}</span>
        </div>
      </div>
      <div className="mt-2 flex justify-between">
        <span>Remaining weeks</span>
        <span className="font-bold">{remaining_weeks}</span>
      </div>
      <div className="mt-6 p-1 text-yellow-500">
        If your account is two weeks overdraft it will enter read-only mode!
      </div>
      <button className="mt-auto ml-auto p-2 rounded-md bg-green-600 text-white font-semibold hover:scale-105 active:scale-100 transition">
        Top up balance
      </button>
    </>
  );
};

export default Balance;
