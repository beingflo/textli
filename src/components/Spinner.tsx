import React from 'react';
import './spinner.css';

export const Spinner = (): React.ReactElement => {
  return (
    <div className={`h-5 w-5`}>
      <div className='spinner' />
    </div>
  );
};

export const SpinnerPage = ({
  show = true,
}: {
  show?: boolean;
}): React.ReactElement => {
  return (
    <>
      {show && (
        <div className='absolute top-0 left-0 z-30 grid h-screen w-full place-items-center bg-gray-100 bg-opacity-40'>
          <div className='spinning h-60 w-60 rounded-full border border-dashed border-black bg-white p-20'>
            <div className='spinner' />
          </div>
        </div>
      )}
    </>
  );
};
