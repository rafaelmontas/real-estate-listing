import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import './PropertyDetails.css';
import MapSection from './PropertyDetails/MapSection';
import ContactForm from './PropertyDetails/ContactForm';

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
                  <img src={this.state.property.imgSrc} alt="property"></img>
                  <div className="photos-badge">
                    <i className="far fa-image"></i>
                    <span>6</span>
                    <span className="photos-text">fotos</span>
                  </div>
                </div>
                <div className="second-media">
                  <div className="photo-top">
                    <img src={this.state.property.imgSrc} alt="property"></img>
                  </div>
                  <div className="photo-bottom">
                    <img src={this.state.property.imgSrc} alt="property"></img>
                  </div>
                </div>
              </div>
              {/* Details Section */}
              <div className="details-section">
                {/* Info Header */}
                <div className="info-header">
                  <div className="price-info">
                    <div className="price-status-wraper">
                      <span className="price-tag">
                        <NumberFormat value={this.state.property.price} displayType={'text'} thousandSeparator={true} prefix={'US$'} />
                      </span>
                      <div className="status">
                        <i className={this.state.property.listing_type === "sell" ? "fas fa-circle sell" : "fas fa-circle rent"}></i>
                        <span>{this.state.property.listing_type === "sell" ? "En venta" : "En Alquiler"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="stats-info">
                    <div className="stats">
                      <i className="fas fa-bed"></i>
                      <span>{this.state.property.beds}</span>
                      <span className="text">Hab.</span>
                    </div>
                    <div className="stats">
                      <i className="fas fa-bath"></i>
                      <span>{this.state.property.baths}</span>
                      <span className="text">Baños</span>
                    </div>
                    <div className="stats">
                      <i className="fas fa-car-side"></i>
                      <span>{this.state.property.parkings}</span>
                      <span className="text">Parqueos</span>
                    </div>
                    <div className="stats">
                      <i className="fas fa-ruler-vertical"></i>
                      <span>{this.state.property.mts} Mts2</span>
                    </div>
                  </div>
                  <div className="address-info">
                    <span>{this.state.property.sector}, {this.state.property.address}</span>
                  </div>
                  <div className="extra-info">
                    <div className="video-badge">
                      <i className="fas fa-video"></i>
                      <span>Tour en video</span>
                    </div>
                    <span className="map-link"><i className="fas fa-map-marker-alt"></i> Ver en mapa</span>
                  </div>
                </div>
                {/* Info Header end */}
                <div className="amenities">
                  <div className="amenities-header">
                    <h3>Amenidades</h3>
                  </div>
                  <div className="amenities-details">
                    <div className="amenity">
                      <i className="fas fa-dumbbell"></i>
                      <span>Gimnasio</span>
                    </div>
                    <div className="amenity">
                      <i className="fas fa-user-tie"></i>
                      <span>Portero</span>
                    </div>
                    <div className="amenity">
                      <i className="fas fa-charging-station"></i>
                      <span>Planta Eléctrica</span>
                    </div>
                    <div className="amenity">
                      <i className="fas fa-wind"></i>
                      <span>Aire Acondicionado</span>
                    </div>
                    <div className="amenity">
                      <i className="fas fa-swimming-pool"></i>
                      <span>Piscina</span>
                    </div>
                    <div className="amenity">
                      <i className="fas fa-lock"></i>
                      <span>Seguridad</span>
                    </div>
                    <div className="amenity">
                      <i className="far fa-caret-square-up"></i>
                      <span>Ascensor</span>
                    </div>
                  </div>
                </div>
                <MapSection property={this.state.property}/>
                <div className="description">
                  <h3>Descripción</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu purus ex. Suspendisse sed aliquet orci. Donec sodales blandit odio sed mollis. Praesent molestie volutpat venenatis. Cras aliquet, tellus non malesuada tristique, felis leo vestibulum nunc, vel lacinia metus sapien sit amet leo. Quisque in pulvinar felis, sit amet egestas massa. Donec nisl ipsum, mattis quis arcu id, dapibus semper augue. Curabitur placerat quam a nisi tincidunt, eget mattis odio placerat.</p>
                </div>
              </div>
              <div className="ad-section">
                <span>Publicidad</span>
                <div className="advertisement"></div>
              </div>
              {/* Details Section End */}
            </div>
            <div className="info-section">
              <div className="info-wraper">
                <ContactForm/>
              </div>
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