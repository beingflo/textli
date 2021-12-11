import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Bootstrapper from './components/Bootstrapper';
import { Provider } from 'jotai';

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <Bootstrapper />
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../serviceWorker.js');
}
