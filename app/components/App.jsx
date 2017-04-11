import React, { PropTypes } from 'react';

function App({ message }) {
  return <div className="container">{message}</div>;
}

App.propTypes = {
  message: PropTypes.string.isRequired,
};

export default App;
