import React from 'react';
import Editor from './Editor';
import Sidebar from './Sidebar';
import ActionGroup from './ActionGroup/ActionGroup';

const App = (): React.ReactElement => {
  return (
    <div className="h-screen flex flex-col sm:flex-row justify-between w-full relative">
      <div className="sm:hidden bg-white fixed z-10 w-full h-16" />
      <div className="">
        <Sidebar />
      </div>
      <div
        spellCheck="false"
        className="h-full max-w-full mt-12 ml-4 mr-4 sm:mt-0 sm:ml-0 sm:mr-0 sm:max-w-md md:min-w-sm lg:max-w-2xl 2xl:max-w-4xl"
      >
        <Editor />
      </div>
      <div className="pr-6 pt-6 h-auto z-10">
        <ActionGroup />
      </div>
    </div>
  );
};

export default App;
