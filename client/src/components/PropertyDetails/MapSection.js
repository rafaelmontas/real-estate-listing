import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


const mapStyles = {
  width: '100%',
  height: '100%',
  borderRadius: '4px'
};

class MapSection extends React.Component {
  render() {
    return (
      <div className="map-section">
        <h3>Mapa</h3>
        <div className="map">
          <Map
            google={this.props.google}
            zoom={16}
            mapTypeControl= {false}
            streetViewControl= {false}
            style={mapStyles}
            center={{lat: this.props.property.lat, lng: this.props.property.lng}}
            property={this.props.property}>
            <Marker position={{ lat: this.props.property.lat, lng: this.props.property.lng}}/>
          </Map>
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapSection);