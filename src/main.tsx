import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Bootstrapper from './components/Bootstrapper';
import { ContextProvider } from './context';
import { Provider } from 'jotai';

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <ContextProvider>
        <Bootstrapper />
      </ContextProvider>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);
