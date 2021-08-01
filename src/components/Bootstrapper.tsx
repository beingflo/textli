import React from 'react';
import App from './App';
import { get_notes } from '../api';
import { AppStateProvider } from '../context';

const Bootstrapper = (): React.ReactElement => {
  React.useEffect(() => {
    get_notes();
  }, []);
  return (
    <AppStateProvider>
      <App />
    </AppStateProvider>
  );
};

export default Bootstrapper;
