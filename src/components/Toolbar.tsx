import React from 'react';
import { FormattingIcon } from '../icons';

export const Toolbar = (): React.ReactElement => {
  const [showToolbar, setShowToolbar] = React.useState(false);

  return (
    <div className="fixed top-0 left-10 z-10 sm:top-10 sm:left-0">
      <button
        onClick={() => setShowToolbar(true)}
        className="fixed ml-5 mt-6 outline-none text-gray-800 hover:translate-x-0.5 transition active:scale-90"
      >
        <FormattingIcon className="h-7 w-7 sm:h-6 sm:w-6 ml-0.5" />
      </button>
    </div>
  );
};

export default Toolbar;
