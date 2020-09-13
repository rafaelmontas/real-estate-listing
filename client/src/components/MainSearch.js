import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string'
import './App.css';
import NavBar from "./NavBar";
import FixedFilters from "./FixedFilters";
import PropertyList from "./PropertyList";
import Pagination from "./Pagination";
import Footer from "./Footer";
import MainMap from './Map/MainMap';
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";
import LoginModal from './LoginModal';
import AutoCompleteMobile from './SearchBar/AutoCompleteMobile';
import {Route, Switch} from 'react-router-dom';
// import { AnimatedRoute } from 'react-router-transition';
import PropertyDetails from './PropertyDetails';
import Favorites from './Favorites';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

class MainSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      isLoading: false,
      sideDrawerOpen: false,
      mapToggleOpen: false,
      moreFiltersOpen: false,
      loginOpen: false,
      mobileSearchOpen: false,
      cardSelected: 0,
      cardHovered: 0
    }
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleCardHover = this.handleCardHover.bind(this);
    this.handleCardHoverOut = this.handleCardHoverOut.bind(this);
    this.handleSideDrawerToggleClick = this.handleSideDrawerToggleClick.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.handleMapToggleClick = this.handleMapToggleClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.searchProperties = this.searchProperties.bind(this);
    this.handleMobileSearchClick = this.handleMobileSearchClick.bind(this);
    this.handleCloseMobileSearchClick = this.handleCloseMobileSearchClick.bind(this);
  }

  handleMarkerClick(id) {
    window.scroll({
      top: document.getElementById(`homecard_${id}`).offsetTop -124,
      behavior: "smooth"
    })
    this.setState({cardSelected: id});
  }
  
  handleCardHover(identifier) {
    this.setState({cardHovered: identifier});
    console.log(identifier)
  }
  handleCardHoverOut() {
    this.setState({cardHovered: 0});
  }
  
  componentDidMount() {
    this.setState({ isLoading: true })
    this.timer = setTimeout(() => {
      fetch("/properties" + this.props.location.search)
        .then(res => res.json())
        .then(properties => {
          this.setState({
            properties: properties,
            isLoading: false
          });
        });
    }, 2000)
    console.log(queryString.parse(this.props.location.search).sector, queryString.parse(this.props.location.search));
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
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
      loginOpen: false
    });
  }
  handleMapToggleClick() {
    this.setState((prevState) => {
      return { mapToggleOpen: !prevState.mapToggleOpen };
    })
    // Add redirect to /properties url to show map - will unmount property details component
  }

  handleLoginClick() {
    this.setState({
      loginOpen: true,
      sideDrawerOpen: false
    });
  }

  handleMobileSearchClick() {
    if(this.state.mobileSearchOpen !== true && window.innerWidth <= 770) {
      this.setState({mobileSearchOpen: true});
    }
  }
  handleCloseMobileSearchClick() {
    this.setState({mobileSearchOpen: false})
  }
  
  searchProperties(sector, listingType, minPrice, maxPrice, bedrooms, bathrooms, propertyType) {
    this.setState({ isLoading: true })
    this.timer = setTimeout(() => {
      fetch(`/properties?sector=${sector}&listing_type=${listingType}&minPrice=${minPrice}&maxPrice=${maxPrice}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&property_type=${propertyType}`)
        .then(response => {
          return response.json();
        }).then(properties => {
          console.log(properties);
          this.setState({ 
            properties: properties,
            isLoading: false,
            cardSelected: 0
          })
        })
    }, 2000)
    this.props.history.push({
      pathname: "/properties",
      search: `?sector=${sector}&listing_type=${listingType}&minPrice=${minPrice}&maxPrice=${maxPrice}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&property_type=${propertyType}`
    })
    window.scrollTo(0, 0);
  }

  render() {
    let mapOpenCss;
    if(this.state.mapToggleOpen) {
      mapOpenCss = "search-results-columns none"
    } else {
      mapOpenCss = "search-results-columns"
    }
    
    let backdrop;
    if(this.state.sideDrawerOpen || this.state.loginOpen) {
      backdrop = <Backdrop onBackdropClick={this.handleBackdropClick} />
    }
    
    return (
      <div className="main-app-container">
        {backdrop}
        {this.state.mobileSearchOpen && <AutoCompleteMobile onCloseMobileSearchClick={this.handleCloseMobileSearchClick} initialStateSearch={queryString.parse(this.props.location.search)} search={this.searchProperties}/>}
        <SideDrawer show={this.state.sideDrawerOpen}
                    onLoginClick={this.handleLoginClick} />
        <NavBar onSideDrawerToggleClick={this.handleSideDrawerToggleClick}
                mapOpen={this.state.mapToggleOpen}
                onMapToggleClick={this.handleMapToggleClick}
                onLoginClick={this.handleLoginClick} 
                search={this.searchProperties}
                initialStateSearch={queryString.parse(this.props.location.search)}
                loadingStatus={this.state.isLoading}
                onMobileSearchClick={this.handleMobileSearchClick}/>
        {this.state.loginOpen && <LoginModal />}
        <Switch>
          <Route path={this.props.match.url} exact>
            <section id="main-app-content" className="search-results-container">
              <div id="results-column-left" className={mapOpenCss}>
                <FixedFilters status={this.state.isLoading}
                              searchProperties={this.searchProperties}
                              initialState={queryString.parse(this.props.location.search)}
                              onFiltersClick={this.handleMoreFiltersClick}/>
                <PropertyList properties={this.state.properties}
                              status={this.state.isLoading}
                              cardSelected={this.state.cardSelected}
                              onCardHovered={this.handleCardHover}
                              onCardHoverOut={this.handleCardHoverOut}/>
                <Pagination />
                <Footer />
              </div>
              <div id="map-column-right" className={this.state.mapToggleOpen ? "search-results-columns show" : "search-results-columns"}>
                <div className="save-search"><i className="fas fa-bell"></i>Guardar Busqueda</div>
                <div className="filter-button">
                  {/* <FilterToggle /> */}
                </div>
                <div id="map-div">
                  <MainMap properties={this.state.properties}
                               onMarkerClick={this.handleMarkerClick} 
                               cardHovered={this.state.cardHovered}
                               initialStateSearch={queryString.parse(this.props.location.search)}
                               loadingStatus={this.state.isLoading}/>
                </div>
              </div>
            </section>
          </Route>
          <Route path="/properties/favorites" exact component={Favorites} />
          <Route path={`${this.props.match.url}/:id`} exact component={PropertyDetails}/>
          {/* <AnimatedRoute path="/properties/:id" component={PropertyDetails}
          atEnter={{ offset: -100 }}
          atLeave={{ offset: -100 }}
          atActive={{ offset: 0 }}
          mapStyles={(styles) => ({
            transform: `translateX(${styles.offset}%)`,
          })}/> */}
        </Switch>
      </div>
    )
  }
}

MainSearch.propTypes = {
  match: PropTypes.object.isRequired
}

export default MainSearch;
