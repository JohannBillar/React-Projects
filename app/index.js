import React from 'react';
import { render } from 'react-dom';
// import App from './components/App';
import RecipeModal from './components/RecipeModal';

// TODO are webpack loader to import bootstrap
// TODO remove css from js bundle into style link
// import 'bootstrap/dist/css/bootstrap.css';
import './sass/main.scss';

render(
  <RecipeModal />,
  document.getElementById('app')
);
