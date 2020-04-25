import React from 'react';
import PropTypes from 'prop-types';
import './PropertyDetails.css';

class PropertyDetails extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h1>hi {this.props.match.params.id}</h1>
          <button onClick={() => this.props.history.goBack()}>Go Back!</button>
        </div>
      </div>
    )
  }
}

PropertyDetails.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default PropertyDetails;