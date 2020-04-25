import React from 'react';
import PropTypes from 'prop-types';

class Favorites extends React.Component {
  render() {
    return (
      <div>
        <h1>Favorites</h1>
        <button onClick={() => this.props.history.goBack()}>Go Back!</button>
      </div>
    )
  }
}

Favorites.propTypes = {
  history: PropTypes.object.isRequired
}

export default Favorites;