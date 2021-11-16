import { useAtom } from 'jotai';
import React from 'react';
import { getUserInfoState } from '../../state';

export const Payment = (): React.ReactElement => {
  const [userInfo] = useAtom(getUserInfoState);

  const balance = parseFloat(userInfo?.balance ?? '0');
  const balanceFixed = balance.toFixed(2);
  const balance_days = parseFloat(userInfo?.remaining_days ?? '0');
  const remaining_weeks = (balance_days / 7).toFixed(2);

  return (
    <>
      <div className="flex justify-between lg:w-1/2">
        <span>Balance</span>
        <div>
          <span className="mr-1 text-xs text-gray-600">USD</span>
          <span className="font-bold">${balanceFixed}</span>
        </div>
      </div>
      <div className="mt-2 flex justify-between lg:w-1/2">
        <span>Remaining weeks</span>
        <span className="font-bold">{remaining_weeks}</span>
      </div>
      {balance < 0 && (
        <div className="mt-6 p-1 text-red-500">
          If you are more than one month overdraft, your account will become
          read only.
        </div>
      )}
      <button className="mt-auto w-max p-1.5 rounded-md bg-yellow-400 text-white font-semibold hover:scale-105 active:scale-100 transition">
        Top up balance
      </button>
    </>
  );
};

export default Payment;
