import React from 'react';
import PropTypes from 'prop-types';
import Table from './Table';

function App({ message }) {
  return <Table />;
}

App.propTypes = {
  message: PropTypes.string.isRequired,
};

export default App;
