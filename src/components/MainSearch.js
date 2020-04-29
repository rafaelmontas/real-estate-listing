import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import NavBar from "./NavBar";
import FixedFilters from "./FixedFilters";
import PropertyList from "./PropertyList";
import Pagination from "./Pagination";
import Footer from "./Footer";
import MapColumn from "./MapColumn";
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";
import LoginModal from './LoginModal';

import properties from '../data'

import {Route, Switch} from 'react-router-dom';
// import { AnimatedRoute } from 'react-router-transition';
import PropertyDetails from './PropertyDetails';
import Favorites from './Favorites';

class MainSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      isLoading: false,
      sideDrawerOpen: false,
      MapToggleOpen: false,
      loginOpen: false
    }
    this.handleSideDrawerToggleClick = this.handleSideDrawerToggleClick.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.handleMapToggleClick = this.handleMapToggleClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }
  
  componentDidMount() {
    this.setState({ isLoading: true })
    this.timer = setTimeout(() => {
      this.setState({
        properties: properties,
        isLoading: false
      });
    }, 2000)
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
      return { MapToggleOpen: !prevState.MapToggleOpen };
    })
  }

  handleLoginClick() {
    this.setState({
      loginOpen: true,
      sideDrawerOpen: false
    });
  }
  

  render() {
    let mapOpenCss;
    if(this.state.MapToggleOpen) {
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
        <SideDrawer show={this.state.sideDrawerOpen}
                    onLoginClick={this.handleLoginClick} />
        <NavBar onSideDrawerToggleClick={this.handleSideDrawerToggleClick}
                mapOpen={this.state.MapToggleOpen}
                onMapToggleClick={this.handleMapToggleClick}
                onLoginClick={this.handleLoginClick} />
        {this.state.loginOpen && <LoginModal />}
        <Switch>
          <Route path={this.props.match.url} exact>
            <section id="main-app-content" className="search-results-container">
              <div id="results-column-left" className={mapOpenCss}>
                <FixedFilters status={this.state.isLoading}/>
                <PropertyList properties={this.state.properties} status={this.state.isLoading}/>
                <Pagination />
                <Footer />
              </div>
              <MapColumn properties={this.state.properties} mapOpen={this.state.MapToggleOpen} />
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
