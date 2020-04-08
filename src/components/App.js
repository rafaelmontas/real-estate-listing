import React from 'react';
import './App.css';
import NavBar from "./NavBar";
import FixedFilters from "./FixedFilters";
import PropertyList from "./PropertyList";
import Pagination from "./Pagination";
import Footer from "./Footer";
import MapColumn from "./MapColumn";


class App extends React.Component {
  render() {
    return (
      <div className="main-app-container">
        <NavBar/>
        <section id="main-app-content" className="search-results-container">
          <div id="results-column-left" className="search-results-columns">
            <FixedFilters/>
            <PropertyList/>
            <Pagination/>
            <Footer/>
          </div>
          <MapColumn/>
        </section>
      </div>
    )
  }
}

export default App;
