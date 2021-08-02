import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Bootstrapper from './components/Bootstrapper';
import { ContextProvider } from './context';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <Bootstrapper />
    </ContextProvider>
  </React.StrictMode>,

  document.getElementById('root')
);
