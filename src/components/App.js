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

import house1 from "../demo_img/house1.png"
const propertyCard = {
  id: 1,
  imgSrc: house1,
  price: 100000,
  beds: 3,
  baths: 2,
  cars: 2,
  mts: 150,
  address: "C/ Dr. Fabio Mota #9",
  sector: "Naco, Distrito Nacional",
  lat: 18.472233,
  lng: -69.922225
};
const propertyCard2 = {
  id: 2,
  imgSrc: house1,
  price: 100000,
  beds: 3,
  baths: 2,
  cars: 2,
  mts: 150,
  address: "C/ Dr. Fabio Mota #9",
  sector: "Naco, Distrito Nacional",
  lat: 18.471853,
  lng: -69.922347
};
const propertyCard3 = {
  id: 3,
  imgSrc: house1,
  price: 100000,
  beds: 3,
  baths: 2,
  cars: 2,
  mts: 150,
  address: "C/ Dr. Fabio Mota #9",
  sector: "Naco, Distrito Nacional",
  lat: 18.471365,
  lng: -69.932690
};

const properties = [propertyCard, propertyCard2, propertyCard3];


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false
    }
    this.handleSideDrawerToggleClick = this.handleSideDrawerToggleClick.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
  }
  

  // Hanlde clicks related to side drawer
  handleSideDrawerToggleClick() {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  }
  handleBackdropClick() {
    this.setState({ sideDrawerOpen: false });
  }

  

  render() {    
    return (
      <div className="main-app-container">
        {this.state.sideDrawerOpen && <Backdrop onBackdropClick={this.handleBackdropClick} />}
        <SideDrawer show={this.state.sideDrawerOpen} />
        <NavBar onSideDrawerToggleClick={this.handleSideDrawerToggleClick} />
        <section id="main-app-content" className="search-results-container">
          <div id="results-column-left" className="search-results-columns">
            <FixedFilters />
            <PropertyList properties={properties} />
            <Pagination />
            <Footer />
          </div>
          <MapColumn properties={properties} />
        </section>
      </div>
    )
  }
}

export default App;
