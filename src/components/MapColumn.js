import React from "react";
import PropTypes from 'prop-types';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
// import FilterToggle from './FilterToggle';

const mapStyles = {
  width: '100%',
  height: 'calc(100% - 66px)'
};


class MapColumn extends React.Component {

  displayMarkers() {
    return this.props.properties.map(property => {
      return  <Marker key={property.id} position={{ lat: property.lat, lng: property.lng}} />;
    });
  }



  render() {
    return (
      <div id="map-column-right" className={this.props.mapOpen ? "search-results-columns show" : "search-results-columns"}>
        <div className="save-search"><i className="fas fa-bell"></i>Guardar Busqueda</div>
        <div className="filter-button">
          {/* <FilterToggle /> */}
        </div>
        <div id="map-div">
          <Map
            google={this.props.google}
            zoom={14}
            mapTypeControl= {false}
            streetViewControl= {false}
            style={mapStyles}
            initialCenter={{
            lat: 18.472233,
            lng: -69.922225
            }}>
              
              {this.displayMarkers()}
          </Map>
        </div>
      </div>
    )
  }
}

MapColumn.propTypes = {
  properties: PropTypes.array.isRequired,
  google: PropTypes.object.isRequired,
  mapOpen: PropTypes.bool.isRequired
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapColumn);
