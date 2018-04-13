import React from 'react';
import ReactDOM from 'react-dom';
import './app.scss';
import sum from './sum';
ReactDOM.render(
  <h1>Hello {sum(1, 2)}, world!</h1>,
  document.getElementById('root'),
);