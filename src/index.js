import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const ROVER_NAMES = ['curiosity', 'spirit', 'opportunity']

ReactDOM.render(
  <App rovers={ROVER_NAMES} />,
  document.getElementById('root')
);
