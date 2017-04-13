import React from 'react';
import PropTypes from 'prop-types';
import Leaderboard from './Leaderboard';

function App({ message }) {
  return <Leaderboard />;
}

App.propTypes = {
  message: PropTypes.string.isRequired,
};

export default App;
