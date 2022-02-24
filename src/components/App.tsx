import React from 'react';
import Editor from './Editor';
import Sidebar from './Sidebar';
import ActionGroup from './ActionGroup/ActionGroup';
import { useRegisterSW } from 'virtual:pwa-register/react';

// Attempt to refetch PWA every 2 hours
const intervalMS = 2 * 3600 * 60 * 1000;

const App = (): React.ReactElement => {
  const {
    updateServiceWorker,
    needRefresh: [needRefresh, setNeedRefresh],
  } = useRegisterSW({
    onRegistered(r) {
      r &&
        setInterval(() => {
          r.update();
        }, intervalMS);
    },
  });

  if (needRefresh) {
    console.log('PWA refreshing');
    setNeedRefresh(false);
    updateServiceWorker();
  }

  return (
    <div className="h-screen flex flex-col sm:flex-row justify-between w-full relative">
      <div className="sm:hidden bg-white fixed z-10 w-full h-16" />
      <div>
        <Sidebar />
      </div>
      <div
        spellCheck="false"
        className="h-full max-w-full mt-16 mx-4 sm:mt-0 sm:mx-12 sm:min-w-sm lg:max-w-2xl 2xl:max-w-7xl"
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
