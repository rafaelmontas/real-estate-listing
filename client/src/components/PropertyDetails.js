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
      <div className="full-details-view">
        {/* Header Component */}
        <div className="details-header">
          <div className="back-to-search">
            <span onClick={() => this.props.history.goBack()}>
              <i className="fas fa-long-arrow-alt-left"></i>
              Volver atrás
            </span>
          </div>
          <div className="like-share-buttons">
            <span className="buttons">
              <i className="far fa-heart"></i>
              <span className="button-text">Favorito</span>
            </span>
            <span className="buttons">
              <i className="fas fa-share-alt"></i>
              <span className="button-text">Compartir</span>
            </span>
          </div>
        </div>
        {/* Header End */}
        <h1>hi {this.props.match.params.id}</h1>
        <h3>{this.state.property.price}</h3>
      </div>
    )
  }
}

PropertyDetails.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default PropertyDetails;