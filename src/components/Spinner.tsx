import React from 'react';
import './spinner.css';

export const Spinner = (): React.ReactElement => {
  return (
    <div className={`h-8 w-8`}>
      <div className="spinner" />
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
        <div className="absolute z-30 h-screen w-full top-0 left-0 grid place-items-center bg-opacity-40 bg-gray-100">
          <div className="spinning h-60 w-60 p-20 border border-dashed rounded-full border-black bg-white">
            <div className="spinner" />
          </div>
        </div>
      )}
    </>
  );
};
