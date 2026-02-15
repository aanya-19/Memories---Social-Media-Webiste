import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// makes the redux store available for all the react components
import {Provider} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import { GoogleOAuthProvider } from '@react-oauth/google';

import reducers from './reducers';

const store=configureStore({ reducer: reducers });

  
ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="726887046807-p72q04ectg2mridbdbnsdpql29pt7deq.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);