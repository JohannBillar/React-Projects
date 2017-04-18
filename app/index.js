import React from 'react';
import { render } from 'react-dom';
// import App from './components/App';
import MyModal from './components/Modal';

require('./sass/main.scss');

render(
  <MyModal />,
  document.getElementById('app')
);
