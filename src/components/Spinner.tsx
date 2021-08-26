import React from 'react';
import './spinner.css';

export const Spinner = (): React.ReactElement => {
  return (
    <div className="spinner w-6 h-6">
      <div className="double-bounce1 bg-white"></div>
      <div className="double-bounce2 bg-white"></div>
    </div>
  );
};

export const NoteStatusSpinner = (): React.ReactElement => {
  return (
    <div className="spinner w-4 h-4">
      <div className="double-bounce1 bg-yellow-300"></div>
      <div className="double-bounce2 bg-yellow-300"></div>
    </div>
  );
};

export const SpinnerPage = (): React.ReactElement => {
  return (
    <div className="flex h-48 md:h-screen">
      <div className="spinner m-auto w-12 h-12">
        <div className="double-bounce1 bg-yellow-300"></div>
        <div className="double-bounce2 bg-green-500"></div>
      </div>
    </div>
  );
};
