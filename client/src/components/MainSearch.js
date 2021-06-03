import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string'
import './App.css';
import NavBar from "./NavBar";
import FixedFilters from "./FixedFilters";
import PropertyList from "./PropertyList";
import Pagination from "./Pagination";
import Footer from "./Footer";
import { LoadScript } from '@react-google-maps/api';
import MainMap from './Map/MainMap';
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";
import RegisterLoginModal from './Auth/RegisterLoginModal';
import AutoCompleteMobile from './SearchBar/AutoCompleteMobile';
import MapPropertyCard from './MapPropertyCard/MapPropertyCard';
import {Route, Switch} from 'react-router-dom';
// import { AnimatedRoute } from 'react-router-transition';
import PropertyDetails from './PropertyDetails';
import DefaultLoad from './DefaultLoad';
import axios from 'axios';
import smoothscroll from 'smoothscroll-polyfill';
import {userContext} from './userContext';
import gtag, { gaInit } from '../utils/GaUtils';
import ReactPixel from 'react-facebook-pixel';
smoothscroll.polyfill();

class MainSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      userLikes: [],
      isLoading: false,
      sideDrawerOpen: false,
      mapToggleOpen: false,
      moreFiltersOpen: false,
      registerLoginOpen: false,
      modalTypeOpen: null,
      mobileSearchOpen: false,
      cardSelected: 0,
      cardHovered: 0,
      listingCount: null
    }
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleCardHover = this.handleCardHover.bind(this);
    this.handleCardHoverOut = this.handleCardHoverOut.bind(this);
    this.handleSideDrawerToggleClick = this.handleSideDrawerToggleClick.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.handleMapToggleClick = this.handleMapToggleClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleRegisterClose = this.handleRegisterClose.bind(this);
    this.handleLoginSwitch = this.handleLoginSwitch.bind(this);
    this.handleRegisterSwitch = this.handleRegisterSwitch.bind(this);
    this.searchProperties = this.searchProperties.bind(this);
    this.backForwardSearch = this.backForwardSearch.bind(this);
    this.handleMobileSearchClick = this.handleMobileSearchClick.bind(this);
    this.handleCloseMobileSearchClick = this.handleCloseMobileSearchClick.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleLikeDelete = this.handleLikeDelete.bind(this);
  }

  handleMarkerClick(id) {
    if(window.innerWidth <= 770) {
      this.setState({
        cardSelected: id,
        cardHovered: id
      })
    } else {
      window.scroll({
        top: document.getElementById(`homecard_${id}`).offsetTop -124,
        behavior: "smooth"
      })
      this.setState({
        cardSelected: id,
        cardHovered: id
      });
    }
  }
  
  handleCardHover(identifier) {
    this.setState({cardHovered: identifier});
    console.log(identifier)
  }
  handleCardHoverOut() {
    if(this.state.cardSelected) {
      this.setState({cardHovered: this.state.cardSelected})
    } else {
      this.setState({cardHovered: 0});
    }
  }

  handleMapClick() {
    this.setState({cardSelected: 0, cardHovered: 0}, () => console.log("Map clicked", this.state.cardSelected))
  }
  
  componentDidMount() {
    this.setState({ isLoading: true })
    this.timer = setTimeout(() => {
      axios.get(`/api/properties${this.props.location.search}`)
            .then(properties => {
              console.log(properties.data)
              this.setState({
                properties: properties.data.properties,
                listingCount: properties.data.count
              });
            })
            .then(() => {
              if(this.context.isLoggedIn) return axios.get(`/users/${this.context.user.id}/likes`)
            })
            .then(res => {
              if(this.context.isLoggedIn) {
                this.setState({
                  userLikes: res.data.likes,
                  isLoading: false
                })
              } else {
                this.setState({isLoading: false})
              }
            })
            .catch(err => {
              console.log(err)
              // if(err.response.status === 500) {
              //   this.props.history.replace('/error/500')
              // }
            })
    }, 2000)
    console.log(queryString.parse(this.props.location.search).sector, queryString.parse(this.props.location.search));
    // Google Analytics
    let initBody;
    if(this.context.isLoggedIn) {
      initBody = {send_page_view: true, page_title: 'Search Page', user_id: this.context.user.id}
    } else {
      initBody = {send_page_view: true, page_title: 'Search Page'}
    }
    let configBody;
    if(this.context.isLoggedIn) {
      configBody = {page_title: 'Search Page', page_path: '/properties', send_page_view: false, user_id: this.context.user.id}
    } else {
      configBody = {page_title: 'Search Page', page_path: '/properties', send_page_view: false}
    }
    console.log(this.context.isLoggedIn, 'login status')
    if(process.env.NODE_ENV === 'production') {
      gaInit('G-7TW72RB4M9', initBody)
      gtag('config', 'G-7TW72RB4M9', configBody)
      gtag('config', 'AW-458168758');
      gtag('event', 'conversion', {'send_to': 'AW-458168758/gblpCNSM_KUCELazvNoB'});
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
  componentWillUnmount() {
    clearTimeout(this.timer);
    console.log("Main search will unmount!")
  }
  componentDidUpdate(prevProps) {
    // Handle Register or login update
    if(this.props.loginStatus === true && prevProps.loginStatus === false && this.state.registerLoginOpen === true) {
      this.handleRegisterClose()
    }
    if(this.props.loginStatus === true && prevProps.loginStatus === false) {
      axios.get(`/users/${this.context.user.id}/likes`)
      .then(res => {
        this.setState({userLikes: res.data.likes})
      })
      .catch(err => {
        console.log(err)
      })
    }
    if(this.props.loginStatus === false && prevProps.loginStatus === true) this.setState({userLikes: []})
    // Handle Logout mobil
    if(this.props.loginStatus === false && prevProps.loginStatus === true && this.state.sideDrawerOpen === true) {
      this.setState({sideDrawerOpen: false})
    }
    // Back button pressed
    console.log(`Main search updated`)
    window.onpopstate = e => {
      // console.log(e)
      console.log(`Main search updated`, e)
      // window.history.pushState({}, '')
      // if back button hit between searches
      if(this.props.location.search !== prevProps.location.search && this.props.location.pathname === prevProps.location.pathname && this.props.location.search !== "") {
        console.log(queryString.parse(this.props.location.search))
        const {bathrooms, bedrooms, listing_type, maxPrice, minPrice, property_type, sector} = queryString.parse(this.props.location.search)
        console.log(property_type)
        this.backForwardSearch(sector, listing_type, parseInt(minPrice), parseInt(maxPrice), parseInt(bedrooms), parseInt(bathrooms), property_type.split(","))
        // if back button hit to /properties
      } else if(this.props.location.search !== prevProps.location.search && this.props.location.pathname === prevProps.location.pathname && this.props.location.search === "") {
        this.setState({ isLoading: true })
        this.timer = setTimeout(() => {
          axios.get("/api/properties")
              .then(properties => {
                this.setState({
                  properties: properties.data.properties,
                  listingCount: properties.data.count,
                  isLoading: false
                });
              })
              .catch(err => {
                console.log(err.response.data, err.response.status)
                if(err.response.status === 500) {
                  this.props.history.replace('/error/500')
                }
              })
        }, 1000)
      }
    }
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if(prevState.properties.length === 0) {
  //     console.log(prevState.properties.length)
  //     console.log(this.state.properties.length)
  //     return false
  //   } else {
  //     alert('updated');
  //   }
  // }

  // Hanlde clicks related to side drawer
  handleSideDrawerToggleClick() {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  }
  handleBackdropClick() {
    this.setState({
      sideDrawerOpen: false,
      loginOpen: false,
      registerLoginOpen: false,
      modalTypeOpen: null
    });
  }
  handleMapToggleClick() {
    this.setState((prevState) => {
      return { mapToggleOpen: !prevState.mapToggleOpen };
    })
    // Add redirect to /properties url to show map - will unmount property details component
  }

  handleLoginClick() {
    this.setState((prevState) => {
      return {registerLoginOpen: !prevState.registerLoginOpen, sideDrawerOpen: false, modalTypeOpen: 'login'}
    });
  }
  handleRegisterClick() {
    this.setState((prevState) => {
      return {registerLoginOpen: !prevState.registerLoginOpen, sideDrawerOpen: false, modalTypeOpen: 'register'}
    });
  }
  handleRegisterClose() {
    this.setState((prevState) => {
      return {registerLoginOpen: !prevState.registerLoginOpen, sideDrawerOpen: false, modalTypeOpen: null}
    });
  }
  handleLoginSwitch() {
    this.setState({modalTypeOpen: 'login'})
  }
  handleRegisterSwitch() {
    this.setState({modalTypeOpen: 'register'})
  }

  handleMobileSearchClick() {
    if(this.state.mobileSearchOpen !== true && window.innerWidth <= 770) {
      this.setState({mobileSearchOpen: true, sideDrawerOpen: false});
    }
  }
  handleCloseMobileSearchClick() {
    this.setState({mobileSearchOpen: false})
  }
  
  searchProperties(province, sector, listingType, minPrice, maxPrice, bedrooms, bathrooms, propertyType) {
    this.setState({ isLoading: true })
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      axios.get(`/api/properties?province=${province}&sector=${sector}&listing_type=${listingType}&minPrice=${minPrice}&maxPrice=${maxPrice}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&property_type=${propertyType}`)
          .then(properties => {
            console.log(properties);
            this.setState({ 
              properties: properties.data.properties,
              listingCount: properties.data.count,
              isLoading: false,
              cardSelected: 0,
              cardHovered: 0
            })  
          })
          .then(() => {
            this.props.saveSearch(province, sector, listingType, minPrice, maxPrice, bedrooms, bathrooms, propertyType)
          })
          .catch(err => {
            console.log(err.response.data, err.response.status)
            if(err.response.status === 500) {
              this.props.history.replace('/error/500')
            }
          })
    }, 2000)
    this.props.history.push({
      pathname: "/properties",
      search: `?province=${province}&sector=${sector}&listing_type=${listingType}&minPrice=${minPrice}&maxPrice=${maxPrice}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&property_type=${propertyType}`
    })
    window.scrollTo(0, 0);
  }
  backForwardSearch(province, sector, listingType, minPrice, maxPrice, bedrooms, bathrooms, propertyType) {
    this.setState({ isLoading: true })
    this.timer = setTimeout(() => {
      axios.get(`/api/properties?province=${province}&sector=${sector}&listing_type=${listingType}&minPrice=${minPrice}&maxPrice=${maxPrice}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&property_type=${propertyType}`)
          .then(properties => {
            console.log(properties);
            this.setState({ 
              properties: properties.data.properties,
              listingCount: properties.data.count,
              isLoading: false,
              cardSelected: 0,
              cardHovered: 0
            })
          })
          .catch(err => {
            console.log(err.response.data, err.response.status)
            if(err.response.status === 500) {
              this.props.history.replace('/error/500')
            }
          })
    }, 1000)
  }

  handleLike(listingId) {
    if(this.context.isLoggedIn) {
      const body = {
        listing_id: listingId,
        user_id: this.context.user.id
      }
      axios.post(`/users/${this.context.user.id}/likes`, body)
      .then(res => {
        console.log('liked', res.data.msg)
        return axios.get(`/users/${this.context.user.id}/likes`)
        // this.setState({liked: true})
      })
      .then(res => {
        this.setState({userLikes: res.data.likes})
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      this.handleLoginClick()
    }
  }
  handleLikeDelete(likeId) {
    axios.delete(`/users/${this.context.user.id}/likes/${likeId}`)
    .then(res => {
      console.log(res.data.msg)
      return axios.get(`/users/${this.context.user.id}/likes`)
      // this.setState({liked: false})
    })
    .then(res => {
      this.setState({userLikes: res.data.likes})
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    let mapOpenCss;
    if(this.state.mapToggleOpen) {
      mapOpenCss = "search-results-columns none"
    } else {
      mapOpenCss = "search-results-columns"
    }
    
    let backdrop;
    if(this.state.sideDrawerOpen || this.state.loginOpen || this.state.registerLoginOpen) {
      backdrop = <Backdrop onBackdropClick={this.handleBackdropClick} backgroundColor={"rgba(0, 0, 0, 0.5)"}/>
    }
    
    let mapPropertyCard;
    if(window.innerWidth <= 770 && this.state.cardSelected) {
      mapPropertyCard = <MapPropertyCard properties={this.state.properties} identifier={this.state.cardSelected}/>
    }

    let mapsApiKey;
    if(process.env.NODE_ENV === 'production') {
      mapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY_PROD
    } else {
      mapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY
    }
    return (
      <div className="main-app-container">
        {backdrop}
        {this.state.mobileSearchOpen && <AutoCompleteMobile onCloseMobileSearchClick={this.handleCloseMobileSearchClick} initialStateSearch={queryString.parse(this.props.location.search)} search={this.searchProperties}/>}
        <SideDrawer show={this.state.sideDrawerOpen}
                    onMobileSearchClick={this.handleMobileSearchClick}
                    onLoginClick={this.handleLoginClick}
                    onRegisterClick={this.handleRegisterClick} />
        <NavBar onSideDrawerToggleClick={this.handleSideDrawerToggleClick}
                mapOpen={this.state.mapToggleOpen}
                onMapToggleClick={this.handleMapToggleClick}
                onLoginClick={this.handleLoginClick}
                onRegisterClick={this.handleRegisterClick}
                search={this.searchProperties}
                initialStateSearch={queryString.parse(this.props.location.search)}
                loadingStatus={this.state.isLoading}
                onMobileSearchClick={this.handleMobileSearchClick}
                path={this.props.location.pathname}/>
        {this.state.registerLoginOpen && <RegisterLoginModal modalType={this.state.modalTypeOpen} onCloseClick={this.handleRegisterClose} onLoginSwitch={this.handleLoginSwitch} onRegisterSwitch={this.handleRegisterSwitch}/>}
        <Switch>
          <LoadScript googleMapsApiKey={`${mapsApiKey}`} loadingElement={<DefaultLoad/>}>
            <Route path={this.props.match.url} exact>
              <section id="main-app-content" className="search-results-container">
                <div id="results-column-left" className={mapOpenCss}>
                  <FixedFilters status={this.state.isLoading}
                                searchProperties={this.searchProperties}
                                initialState={queryString.parse(this.props.location.search)}
                                initialPath={this.props.location.path}
                                onFiltersClick={this.handleMoreFiltersClick}/>
                  <PropertyList properties={this.state.properties}
                                province={queryString.parse(this.props.location.search).province}
                                sector={queryString.parse(this.props.location.search).sector}
                                status={this.state.isLoading}
                                cardSelected={this.state.cardSelected}
                                onCardHovered={this.handleCardHover}
                                onCardHoverOut={this.handleCardHoverOut}
                                listingCount={this.state.listingCount}
                                onLike={this.handleLike}
                                onLikeDelete={this.handleLikeDelete}
                                userLikes={this.state.userLikes}/>
                  {/* {this.state.listingCount !== 0 ? <Pagination /> : null} */}
                  <Footer />
                </div>
                <div id="map-column-right" className={this.state.mapToggleOpen ? "search-results-columns show" : "search-results-columns"}>
                  <div className="save-search" style={{display: 'none'}}><i className="fas fa-bell"></i>Guardar Busqueda</div>
                  <div className="filter-button">
                    {/* <FilterToggle /> */}
                  </div>
                  <div id="map-div">
                    <MainMap properties={this.state.properties.filter(property => property.active_location === true)}
                                onMarkerClick={this.handleMarkerClick}
                                onMapClick={this.handleMapClick} 
                                cardHovered={this.state.cardHovered}
                                initialStateSearch={queryString.parse(this.props.location.search)}
                                loadingStatus={this.state.isLoading}/>
                  </div>
                  {mapPropertyCard}
                </div>
              </section>
            </Route>
            <Route path={`${this.props.match.url}/:id`} exact
              render={props => (
                <PropertyDetails {...props}
                  onLike={this.handleLike}
                  onLikeDelete={this.handleLikeDelete}
                  userLikes={this.state.userLikes}
                  onLead={this.handleLoginClick}
                  // userId={this.context.isLoggedIn ? this.context.user.id : null}
                  // userLikeId={this.props.userLikes.find(x => x.listing_id === property.id)}
                  />
              )}
            />
              {/* <PropertyDetails
                onLike={this.handleLike}
                onLikeDelete={this.handleLikeDelete}
                userLikes={this.state.userLikes}
                /> */}
            
            {/* <AnimatedRoute path="/properties/:id" component={PropertyDetails}
            atEnter={{ offset: -100 }}
            atLeave={{ offset: -100 }}
            atActive={{ offset: 0 }}
            mapStyles={(styles) => ({
              transform: `translateX(${styles.offset}%)`,
            })}/> */}
          </LoadScript>
        </Switch>
      </div>
    )
  }
}

MainSearch.propTypes = {
  match: PropTypes.object.isRequired
}

MainSearch.contextType = userContext;
export default MainSearch;
