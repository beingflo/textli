import React from 'react';
import './spinner.css';

export const Spinner = (): React.ReactElement => {
  return (
    <div className="flex h-48 md:h-screen">
      <div className="spinner m-auto">
        <div className="double-bounce1 bg-yellow-600"></div>
        <div className="double-bounce2 bg-yellow-600"></div>
      </div>
    </div>
  );
};

export default Spinner;
