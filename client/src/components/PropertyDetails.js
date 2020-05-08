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
      <div className="details-container">
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
          <div className="main-content">
            <div className="main-section">
              <div className="collage-grid">
                <div className="media-main">
                  <img src={this.state.property.imgSrc}></img>
                  <div className="photos-badge">
                    <i className="far fa-image"></i>
                    <span>6</span>
                    <span className="photos-text">fotos</span>
                  </div>
                </div>
                <div className="second-media">
                  <div className="photo-top">
                    <img src={this.state.property.imgSrc}></img>
                  </div>
                  <div className="photo-bottom">
                    <img src={this.state.property.imgSrc}></img>
                  </div>
                </div>
              </div>
              <div className="details-section">
                <h1>hi {this.props.match.params.id}</h1>
                <h3>{this.state.property.price}</h3>
              </div>
            </div>
            <div className="info-section">
              <h1>broker info</h1>
            </div>
          </div>
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