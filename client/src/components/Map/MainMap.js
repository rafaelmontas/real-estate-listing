import React from "react";
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

class MainMap extends React.Component {
  
  displayMarkers() {
    return this.props.properties.map(property => {
      return <Marker key={property.id}
                     lat= {property.lat}
                     lng= {property.lng}
                     propertyId={property.id}
                     handleClick={this.props.onMarkerClick} 
                     cardHovered={this.props.cardHovered}/>
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
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
            defaultCenter={{lat: 18.472233, lng: -69.922225}}
            defaultZoom={14}>
              {this.displayMarkers()}
          </GoogleMapReact>
        </div>
      </div>
    )
  }
}

export default MainMap;