import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import './PropertyDetails.css';
import ContactFormModal from './PropertyDetails/ContactFormModal';
import CollageGrid from './PropertyDetails/CollageGrid';
import BrokerSection from './PropertyDetails/BrokerSection';
import MapSection from './PropertyDetails/MapSection';
import AgentSection from './PropertyDetails/AgentSection';
import ContactForm from './PropertyDetails/ContactForm';
import SimilarProperties from './PropertyDetails/SimilarProperties';
import Footer from './Footer';

class PropertyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: {},
      similarProperties: [],
      isLoading: false,
      isContactFormLoading: false,
      ContactFormOpen: false
    }
    this.handleContactFormClick = this.handleContactFormClick.bind(this);
  }

  componentDidMount() {
    this.setState({ isContactFormLoading: true })
    this.timer = setTimeout(() => {
      this.setState( {isContactFormLoading: false} )
    }, 2000)
    fetch(`/properties/${this.props.match.params.id}`)
          .then(res => res.json())
          .then(property => {
            console.log(property)
            this.setState({ property });
          });
    fetch("/properties")
          .then(res => res.json())
          .then(similarProperties => {
            console.log(similarProperties)
            this.setState({ similarProperties });
          });
  }
  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(([key, val]) =>
      prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
    if (this.state) {
      Object.entries(this.state).forEach(([key, val]) =>
        prevState[key] !== val && console.log(`State '${key}' changed`)
      );
    }

    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({
        isLoading: true,
        isContactFormLoading: true
      })
      this.timer = setTimeout(() => {
        fetch(`/properties/${this.props.match.params.id}`)
          .then(res => res.json())
          .then(property => {
            console.log(property)
            this.setState({ 
              property: property,
              isLoading: false,
              isContactFormLoading: false
            });
          });
      }, 500)
      window.scrollTo(0, 0);
    }
  }

  handleContactFormClick() {
    this.setState((prevState) => {
      return { ContactFormOpen: !prevState.ContactFormOpen }
    })
  }


  render() {
    let inputSize;
    if (this.state.ContactFormOpen) {
      inputSize = "medium"
    } else {
      inputSize = "small"
    }

    return (
      <div>
        {this.state.ContactFormOpen && <ContactFormModal onCloseClick={this.handleContactFormClick} size={inputSize}/>}
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
                <CollageGrid property={this.state.property} loadingStatus={this.state.isLoading}/>
                {/* Details Section */}
                <div className="details-section">
                  {/* Info Header */}
                  <div className="info-header">
                    <div className="price-info">
                      <div className="price-status-wraper">
                        <span className="price-tag">
                          <NumberFormat value={this.state.property.listing_price} displayType={'text'} thousandSeparator={true} prefix={'US$'} />
                        </span>
                        <div className="status">
                          <i className={this.state.property.listing_type === "For Sale" ? "fas fa-circle sell" : "fas fa-circle rent"}></i>
                          <span>{this.state.property.listing_type === "For Sale" ? "En venta" : "En Alquiler"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="stats-info">
                      <div className="stats">
                        <div className="icon">
                          <i className="fas fa-bed"></i>
                        </div>
                        <div className="text-section">
                          <span>{this.state.property.bedrooms}</span>
                          <span className="text">Hab.</span>
                        </div>
                      </div>
                      <div className="stats">
                        <div className="icon">
                          <i className="fas fa-bath"></i>
                        </div>
                        <div className="text-section">
                          <span>{this.state.property.bathrooms}</span>
                          <span className="text">Baños</span>
                        </div>
                      </div>
                      <div className="stats">
                        <div className="icon">
                          <i className="fas fa-car-side"></i>
                        </div>
                        <div className="text-section">
                          <span>{this.state.property.parking_spaces}</span>
                          <span className="text">Parqueos</span>
                        </div>
                      </div>
                      <div className="stats">
                        <div className="icon">
                          <i className="fas fa-ruler-vertical"></i>
                        </div>
                        <div className="text-section">
                          <span>{this.state.property.square_meters} Mts2</span>
                        </div>
                      </div>
                    </div>
                    <div className="address-info">
                      <span>{this.state.property.sector}, {`C/ ${this.state.property.street_name} #${this.state.property.street_number}`}</span>
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
                  <BrokerSection/>
                  <MapSection property={this.state.property}/>
                  <div className="description">
                    <h3>Descripción</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu purus ex. Suspendisse sed aliquet orci. Donec sodales blandit odio sed mollis. Praesent molestie volutpat venenatis. Cras aliquet, tellus non malesuada tristique, felis leo vestibulum nunc, vel lacinia metus sapien sit amet leo. Quisque in pulvinar felis, sit amet egestas massa. Donec nisl ipsum, mattis quis arcu id, dapibus semper augue. Curabitur placerat quam a nisi tincidunt, eget mattis odio placerat.</p>
                  </div>
                  <AgentSection onContactClick={this.handleContactFormClick} tel={"8296483530"}/>
                </div>
                <div className="ad-section">
                  <span>Publicidad</span>
                  <div className="advertisement"></div>
                </div>
                {/* Details Section End */}
              </div>
              <div className="info-section">
                <div className="info-wraper">
                  <ContactForm loadingStatus={this.state.isContactFormLoading} size={inputSize}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SimilarProperties properties={this.state.similarProperties}/>
        <div className="property-footer">
          <Footer/>
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