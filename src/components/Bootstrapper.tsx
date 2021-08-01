import React from 'react';
import App from './App';
import { get_notes } from '../api';

const Bootstrapper = (): React.ReactElement => {
  React.useEffect(() => {
    get_notes();
  }, []);
  return <App />;
};

export default Bootstrapper;
