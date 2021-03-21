import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const mapOptions = {
  mapTypeControl: false,
  streetViewControl: false,
  styles: [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "transit.station",
      stylers: [{ visibility: "off" }]
    }
  ]
}

class ListingMap extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="listing-map" style={{height: '200px', width: '100%', marginBottom: '15px'}}>
        <GoogleMap
        options={mapOptions}
          mapContainerStyle={{width: '100%', height: '100%'}}
          center={this.props.latLng}
          zoom={16}>
            <Marker position={this.props.latLng}/>
        </GoogleMap>
      </div>
    )
  }
}

export default ListingMap