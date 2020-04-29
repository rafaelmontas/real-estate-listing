import React from 'react';
import PropTypes from 'prop-types';

class MapToggleMobile extends React.Component {
  render() {
    return <span className="map button" onClick={this.props.onMapToggleClick}>{this.props.mapOpen ? "Lista" : "Mapa"}</span>
  }
}

MapToggleMobile.propTypes = {
  mapOpen: PropTypes.bool.isRequired,
  onMapToggleClick: PropTypes.func.isRequired
}

export default MapToggleMobile;