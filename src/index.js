import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './reset.css';
import './index.css';

const ROVER_NAMES = ['curiosity', 'spirit', 'opportunity']

ReactDOM.render(
  <App roverNames={ROVER_NAMES} />,
  document.getElementById('root')
);
