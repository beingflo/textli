import React from 'react';
import Editor from './Editor';
import Sidebar from './Sidebar';
import ActionGroup from './ActionGroup/ActionGroup';
import { useRegisterSW } from 'virtual:pwa-register/react';
import Toolbar from './Toolbar';

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
    <div className='scrollbar-gutter relative flex h-screen w-full flex-col justify-between overflow-auto sm:flex-row'>
      <div className='fixed z-10 h-16 w-full bg-white sm:hidden' />
      <div className='flex flex-row sm:flex-col'>
        <Sidebar />
        <Toolbar />
      </div>
      <div
        spellCheck='false'
        className='mx-4 mt-16 h-full max-w-full sm:mx-12 sm:mt-0 sm:min-w-sm lg:max-w-2xl 2xl:max-w-7xl'
      >
        <Editor />
      </div>
      <div className='z-10 h-auto pr-6 pt-6'>
        <ActionGroup />
      </div>
    </div>
  );
};

export default App;
