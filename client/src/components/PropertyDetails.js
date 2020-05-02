import React from 'react';
import PropTypes from 'prop-types';
import './PropertyDetails.css';

class PropertyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: {}
    }
  }

  componentDidMount() {
    fetch(`/properties/${this.props.match.params.id}`)
          .then(res => res.json())
          .then(property => {
            console.log(property)
            this.setState({ property });
          });
  }



  render() {
    return (
      <div>
        <div>
          <h1>hi {this.props.match.params.id}</h1>
          <button onClick={() => this.props.history.goBack()}>Go Back!</button>
          <h3>{this.state.property.price}</h3>
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