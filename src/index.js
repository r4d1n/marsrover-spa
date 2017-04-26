import './reset.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './lib/reducers';
import { fetchManifest, fetchSol } from './lib/actions';

const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

store.dispatch(fetchManifest('curiosity'))
  .then(() => store.dispatch(fetchSol('curiosity', store.getState().solsByRover.selected)))
  .then(() => console.log('####### test state', store.getState()))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
