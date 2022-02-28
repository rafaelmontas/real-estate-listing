import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import './PropertyDetails.css';
import ContactFormModal from './PropertyDetails/ContactFormModal';
import Backdrop from "./Backdrop";
import PhotosCarousel from './PropertyDetails/PhotosCarousel';
import CollageGrid from './PropertyDetails/CollageGrid';
import BrokerSection from './PropertyDetails/BrokerSection';
import MapSection from './PropertyDetails/MapSection';
import AgentSection from './PropertyDetails/AgentSection';
import ContactForm from './PropertyDetails/ContactForm';
import SimilarProperties from './PropertyDetails/SimilarProperties';
import axios from 'axios';
import {userContext} from './userContext';
import { withCookies, Cookies } from 'react-cookie';
import gtag, { gaInit } from '../utils/GaUtils';
import ReactPixel from 'react-facebook-pixel';
import Footer from './Footer';
import {Helmet} from "react-helmet";

const amenities = {
  half_bathrooms: '1/2 Baño',
  air_conditioner: 'Aire Acondicionado',
  game_zone: 'Área de Juegos',
  laundry_room: 'Área de Lavado',
  social_area: 'Área Social',
  elevator: 'Ascensor',
  balcony: 'Balcón',
  family_room: 'Family Room',
  shared_gas: 'Gas Común',
  gym: 'Gimnasio',
  service_room: 'Habitación de Servicio',
  jacuzzy: 'Jacuzzi',
  lobby: 'Lobby',
  swimming_pool: 'Piscina',
  marble_floor: 'Piso de Marmol',
  power_plant: 'Planta Eléctrica',
  security: 'Seguridad 24/7',
  walk_in_closet: 'Walk In Closet',
  furnished: 'Amueblado',
  security_system: 'Cámaras de Seguridad',
  hardwood_floor: 'Piso de Madera'
}

class PropertyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: {},
      agentInfo: {},
      liked: false,
      similarProperties: [],
      isLoading: true,
      isContactFormLoading: true,
      ContactFormOpen: false,
      carouselOpen: false
    }
    this.handleContactFormClick = this.handleContactFormClick.bind(this);
    this.handleCollageClick = this.handleCollageClick.bind(this);
    this.handleCollageCloseClick = this.handleCollageCloseClick.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
  }

  componentDidMount() {
    // this.setState({ isContactFormLoading: true })
    // this.timer = setTimeout(() => {
    //   this.setState( {isContactFormLoading: false} )
    // }, 4000)
    axios.get(`/api/properties/${this.props.match.params.id}`)
      .then(property => {
        console.log(property.data)
        this.setState({ property: property.data});
      })
      .then(() => {
        return axios.get(`/api/agents/${this.state.property.agent_id}`)
      })
      .then(res => {
        console.log(res.data)
        this.setState({agentInfo: res.data})
      })
      .then(() => {
        return axios.get("/api/properties")
      })
      .then(res => {
        console.log(res.data)
        this.setState({ similarProperties: res.data.properties, isLoading: false });
        this.timer = setTimeout(() => {this.setState({isContactFormLoading: false})}, 2000)
      })
      .then(() => {
        const body = {
          listing_id: this.state.property.id,
          agent_id: this.state.property.agent_id,
          ha_id: this.props.cookies.get('_haid') || null,
          user_id: this.context.isLoggedIn ? this.context.user.id : null
        }
        return axios.post(`/api/properties/${this.state.property.id}/views`, body)
      })
      .catch(err => {
        console.log(err.response.data, err.response.status)
        if(err.response.status === 500) {
          this.props.history.replace('/error/500')
        }
      })
    window.scrollTo(0, 0);
    // Like
    if(this.props.userLikes.findIndex(x => x.listing_id === this.props.match.params.id) !== -1) {
      this.setState({liked: true})
    }
    // Google Analytics
    let initBody;
    if(this.context.isLoggedIn) {
      initBody = {send_page_view: true, page_title: 'Listing Details Page', user_id: this.context.user.id}
    } else {
      initBody = {send_page_view: true, page_title: 'Listing Details Page'}
    }
    let configBody;
    if(this.context.isLoggedIn) {
      configBody = {page_title: 'Listing Details Page', page_path: '/properties/:id', send_page_view: false, user_id: this.context.user.id}
    } else {
      configBody = {page_title: 'Listing Details Page', page_path: '/properties/:id', send_page_view: false}
    }
    if(process.env.NODE_ENV === 'production') {
      gaInit('G-7TW72RB4M9', initBody)
      gtag('config', 'G-7TW72RB4M9', configBody)
    } else {
      gaInit('G-D570FDN0FX', initBody)
      gtag('config', 'G-D570FDN0FX', configBody)
    }
    // Send Page View FB
    if(process.env.NODE_ENV === 'production') {
      ReactPixel.init('824704561474532')
    } else {
      ReactPixel.init('248636197019006')
    }
    ReactPixel.pageView(); // For tracking page view
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
        axios.get(`/api/properties/${this.props.match.params.id}`)
        .then(property => {
          console.log(property.data)
          this.setState({
            property: property.data,
            isLoading: false
          })
        })
        .then(() => {
          return axios.get(`/api/agents/${this.state.property.agent_id}`)
        })
        .then(res => {
          console.log(res.data)
          this.setState({
            agentInfo: res.data,            
            isContactFormLoading: false
          })
        })
      }, 500)
      window.scrollTo(0, 0);
    }
    if(this.props.userLikes !== prevProps.userLikes) {
      if(this.props.userLikes.findIndex(x => x.listing_id === this.props.match.params.id) !== -1) {
        this.setState({liked: true})
      } else if(this.props.userLikes.findIndex(x => x.listing_id === this.props.match.params.id) === -1) {
        this.setState({liked: false})
      }
    }
  }

  handleContactFormClick() {
    this.setState((prevState) => {
      return { ContactFormOpen: !prevState.ContactFormOpen }
    })
  }

  handleCollageClick() {
    this.setState({carouselOpen: true})
  }
  handleCollageCloseClick() {
    this.setState({carouselOpen: false});
  }

  handleBackdropClick() {
    this.setState({carouselOpen: false});
  }

  renderLikeButton() {
    if(this.state.liked) {
      return (
        <span className="buttons liked" onClick={() => this.props.onLikeDelete(this.props.userLikes.find(x => x.listing_id === this.props.match.params.id).id)}>
          <i className="fas fa-heart"></i>
          <span className="button-text">Favorito</span>
        </span>
      )
    } else {
      return (
        <span className="buttons" onClick={() => this.props.onLike(this.props.match.params.id)}>
          <i className="far fa-heart"></i>
          <span className="button-text">Favorito</span>
        </span>
      )
    }
  }

  renderHelmet() {
    if(!this.state.isLoading) {
      return (
        <Helmet>
          <title>{`${this.state.property.sector} | Hauzzy`}</title>
          <meta name="description" content={`${this.state.property.bedrooms} hab, ${this.state.property.bathrooms} baños, ${this.state.property.parking_spaces} parq`}/>
          <meta property="og:title" content={`${this.state.property.sector} | Hauzzy`}/>
          <meta property="og:image" content="https://hauzzy-media-assets.s3.us-east-2.amazonaws.com/og-image.png"/>
          <meta property="og:description" content={`${this.state.property.bedrooms} hab, ${this.state.property.bathrooms} baños, ${this.state.property.parking_spaces} parq`}/>
          <meta property="og:url" content={`https://www.hauzzy.com/properties/${this.state.property.id}`}/>
          <meta property="og:type" content="website"/>
        </Helmet>
      )
    }
  }
  renderAmenities() {
    if (this.state.property['PropertyAmenity']) {
      return (
        <div className="amenities">
          <div className="amenities-header">
            <h3>Amenidades</h3>
          </div>
          <div className="amenities-details">
            {!this.state.isLoading &&
            Object.keys(this.state.property['PropertyAmenity'])
            .filter(amenity => this.state.property['PropertyAmenity'][amenity] === true).map(amenity => {
              return (
                <div className="amenity">
                  <i className="far fa-check-circle"></i>
                  <span>{amenities[amenity]}</span>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
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
        {this.renderHelmet()}
        {this.state.carouselOpen ? <Backdrop onBackdropClick={this.handleBackdropClick} backgroundColor={"rgba(0, 0, 0, 0.8)"}/> : null}
        {this.state.carouselOpen ? <PhotosCarousel onCloseClick={this.handleCollageCloseClick} pictures={this.state.property['PropertyPictures']}/> : null}
        {this.state.ContactFormOpen && <ContactFormModal onCloseClick={this.handleContactFormClick}
                                                         size={inputSize}
                                                         agentInfo={this.state.agentInfo}
                                                         userInfo={this.context}
                                                         onLead={this.props.onLead}
                                                         listing_id={this.state.property.id}/>}
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
              {/* <div className="like-share-buttons">
                <span className="buttons">
                  <i className="far fa-heart"></i>
                  <span className="button-text">Favorito</span>
                </span>
                <span className="buttons">
                  <i className="fas fa-share-alt"></i>
                  <span className="button-text">Compartir</span>
                </span>
              </div> */}
            </div>
            {/* Header End */}
            <div className="main-content">
              <div className="main-section">
                <CollageGrid pictures={this.state.property['PropertyPictures']}
                             loadingStatus={this.state.isLoading}
                             onCollageClick={this.handleCollageClick}/>
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
                          <i className={this.state.property.listing_type === "sale" ? "fas fa-circle sell" : "fas fa-circle rent"}></i>
                          <span>{this.state.property.listing_type === "sale" ? "En venta" : "En Alquiler"}</span>
                        </div>
                      </div>
                      {this.renderLikeButton()}
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
                      <div className="inner-address">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>{this.state.property.sector}</span>
                      </div>
                    </div>
                    {/* <div className="extra-info">
                      <div className="video-badge">
                        <i className="fas fa-video"></i>
                        <span>Tour en video</span>
                      </div>
                      <span className="map-link"><i className="fas fa-map-marker-alt"></i> Ver en mapa</span>
                    </div> */}
                  </div>
                  {/* Info Header end */}
                  {this.renderAmenities()}
                  {/* <BrokerSection/> */}
                  {/* <MapSection property={this.state.property}/> */}
                  <div className="description">
                    <h3>Descripción</h3>
                    <p>{this.state.property.description}</p>
                  </div>
                  {!this.state.isLoading && <AgentSection onContactClick={this.handleContactFormClick}
                                                          agentInfo={this.state.agentInfo}/>}
                </div>
                {/* <div className="ad-section">
                  <span>Publicidad</span>
                  <div className="advertisement"></div>
                </div> */}
                {/* Details Section End */}
              </div>
              <div className="info-section">
                <div className="info-wraper">
                  <ContactForm loadingStatus={this.state.isContactFormLoading}
                                size={inputSize}
                                agentInfo={this.state.agentInfo}
                                userInfo={this.context}
                                onLead={this.props.onLead}
                                listing_id={this.state.property.id}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SimilarProperties 
          properties={this.state.similarProperties}
          onLike={this.props.onLike}
          onLikeDelete={this.props.onLikeDelete}
          userLikes={this.props.userLikes}/>
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

PropertyDetails.contextType = userContext;
export default withCookies(PropertyDetails);