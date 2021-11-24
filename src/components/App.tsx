import React from 'react';
import Editor from './Editor';
import Sidebar from './Sidebar';
import ActionGroup from './ActionGroup/ActionGroup';

const App = (): React.ReactElement => {
  return (
    <div className="h-auto flex justify-between w-full relative">
      <div className="w-12">
        <Sidebar />
      </div>
      <div
        spellCheck="false"
        className="max-w-xxs sm:max-w-md md:min-w-sm lg:max-w-2xl"
      >
        <Editor />
      </div>
      <div className="pr-6 pt-6 h-auto">
        <ActionGroup />
      </div>
    </div>
  );
};

export default App;
