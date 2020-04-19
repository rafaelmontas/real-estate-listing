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

import properties from '../data'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      isLoading: false,
      sideDrawerOpen: false
    }
    this.handleSideDrawerToggleClick = this.handleSideDrawerToggleClick.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
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
            <PropertyList properties={this.state.properties} status={this.state.isLoading}/>
            <Pagination />
            <Footer />
          </div>
          <MapColumn properties={this.state.properties} />
        </section>
      </div>
    )
  }
}

export default App;
