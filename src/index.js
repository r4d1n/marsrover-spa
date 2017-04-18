import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './reset.css';
import './index.css';

const ROVER_NAMES = ['curiosity', 'spirit', 'opportunity'];

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('worker.js', {scope: '/mars/'})
  .then(function(reg) {
    // registration worked
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

ReactDOM.render(
  <App roverNames={ROVER_NAMES} />,
  document.getElementById('root')
);
