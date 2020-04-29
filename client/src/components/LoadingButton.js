import React from 'react';
import PropTypes from 'prop-types';

class LoadingButton extends React.Component {
  render() {
    return (
      <span id="search" onClick={this.props.onCloseClick}>
        {this.props.status ? "Buscando..." : "Ver Resultados"}
      </span>
    )
  }
}

LoadingButton.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
  status: PropTypes.bool.isRequired
}

export default LoadingButton;