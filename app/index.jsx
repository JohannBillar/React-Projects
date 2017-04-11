import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

require('./sass/main.scss');

render(
  <App message="Hello, world!" />,
  document.getElementById('app')
);
