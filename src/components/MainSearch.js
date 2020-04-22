import React from 'react';
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
    
    return (
      <div className="main-app-container">
        {this.state.sideDrawerOpen || this.state.loginOpen && <Backdrop onBackdropClick={this.handleBackdropClick} />}
        <SideDrawer show={this.state.sideDrawerOpen}
                    onLoginClick={this.handleLoginClick} />
        <NavBar onSideDrawerToggleClick={this.handleSideDrawerToggleClick}
                mapOpen={this.state.MapToggleOpen}
                onMapToggleClick={this.handleMapToggleClick}
                onLoginClick={this.handleLoginClick} />
        {this.state.loginOpen && <LoginModal />}
        <section id="main-app-content" className="search-results-container">
          <div id="results-column-left" className={mapOpenCss}>
            <FixedFilters status={this.state.isLoading}/>
            <PropertyList properties={this.state.properties} status={this.state.isLoading}/>
            <Pagination />
            <Footer />
          </div>
          <MapColumn properties={this.state.properties} mapOpen={this.state.MapToggleOpen} />
        </section>
      </div>
    )
  }
}

export default MainSearch;