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
    let backdrop;

    if(this.state.sideDrawerOpen) {
      backdrop = <Backdrop onBackdropClick={this.handleBackdropClick} />
    }

    return (
      <div className="main-app-container">
        {backdrop}
        <SideDrawer show={this.state.sideDrawerOpen} />
        <NavBar onSideDrawerToggleClick={this.handleSideDrawerToggleClick} />
        <section id="main-app-content" className="search-results-container">
          <div id="results-column-left" className="search-results-columns">
            <FixedFilters />
            <PropertyList />
            <Pagination />
            <Footer />
          </div>
          <MapColumn/>
        </section>
      </div>
    )
  }
}

export default App;
