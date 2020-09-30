import React from 'react';
import NavBar from '../NavBar';
import Favorites from './Favorites';
import Backdrop from "../Backdrop";
import SideDrawer from '../SideDrawer';
import AutoCompleteMobile from '../SearchBar/AutoCompleteMobile';

import queryString from 'query-string'
import {Route} from 'react-router-dom';


class MyHauzzy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false,
      mobileSearchOpen: false
    }
    this.handleSideDrawerToggleClick = this.handleSideDrawerToggleClick.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.handleMobileSearchClick = this.handleMobileSearchClick.bind(this);
    this.handleCloseMobileSearchClick = this.handleCloseMobileSearchClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    console.log("my-hauzzy mounted!", this.props.history)
    if(this.props.location.pathname === '/my-hauzzy' || this.props.location.pathname === '/my-hauzzy/') {
      this.props.history.replace({pathname: '/my-hauzzy/favorites'})
    }
  }

  handleSideDrawerToggleClick() {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  }
  handleBackdropClick() {
    this.setState({sideDrawerOpen: false});
  }

  handleMobileSearchClick() {
    if(this.state.mobileSearchOpen !== true && window.innerWidth <= 770) {
      this.setState({mobileSearchOpen: true, sideDrawerOpen: false});
    }
  }
  handleCloseMobileSearchClick() {
    this.setState({mobileSearchOpen: false})
  }

  handleSearch(sector, listingType, minPrice, maxPrice, bedrooms, bathrooms, propertyType) {
    this.props.history.push({
      pathname: "/properties",
      search: `?sector=${sector}&listing_type=${listingType}&minPrice=${minPrice}&maxPrice=${maxPrice}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&property_type=${propertyType}`
    })
  }

  render() {
    return (
      <div className="account-container" style={{paddingTop: '106px'}}>
        {this.state.sideDrawerOpen ? <Backdrop onBackdropClick={this.handleBackdropClick} backgroundColor={"rgba(0, 0, 0, 0.5)"}/> : null}
        <SideDrawer show={this.state.sideDrawerOpen}
                    onMobileSearchClick={this.handleMobileSearchClick}
                    // onLoginClick={this.handleLoginClick}
                    />
        {this.state.mobileSearchOpen && <AutoCompleteMobile onCloseMobileSearchClick={this.handleCloseMobileSearchClick} initialStateSearch={queryString.parse(this.props.location.search)} search={this.handleSearch}/>}
        <NavBar 
              onSideDrawerToggleClick={this.handleSideDrawerToggleClick}
              // mapOpen={this.state.mapToggleOpen}
              // onMapToggleClick={this.handleMapToggleClick}
              // onLoginClick={this.handleLoginClick} 
              search={this.handleSearch}
              initialStateSearch={queryString.parse(this.props.location.search)}
              // loadingStatus={this.state.isLoading}
              onMobileSearchClick={this.handleMobileSearchClick}
              path={this.props.location.pathname}
              />
        <Route path="/my-hauzzy/favorites" exact component={Favorites} />
      </div>
    )
  }
}
export default MyHauzzy;