import React from 'react';
import { GoogleMap, LoadScript, OverlayView, Polygon } from '@react-google-maps/api';
import Market from './Marker';
import './Marker.css';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 18.474860,
  lng: -69.926488
};

const paths = [
  { lat: 18.482289, lng: -69.931080 },
  { lat: 18.468409, lng: -69.931788 },
  { lat: 18.465620, lng: -69.930244 },
  { lat: 18.469040, lng: -69.923677 },
  { lat: 18.472713, lng: -69.919289 },
  { lat: 18.473583, lng: -69.919879 },
  { lat: 18.473782, lng: -69.919992 },
  { lat: 18.475023, lng: -69.920325 },
  { lat: 18.481841, lng: -69.920765 },
  { lat: 18.482065, lng: -69.921129 },
  { lat: 18.482711, lng: -69.931064 },
  
]

const options = {
  // fillColor: "lightblue",
  fillOpacity: 0,
  strokeColor: "blue",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1
}

class MainMap extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_API_KEY}`}>
          <GoogleMap
            options={{mapTypeControl: false, streetViewControl: false}}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}>
              {this.props.properties.map(property => {
                return <OverlayView
                  key={property.id}
                  position={{lat: property.lat, lng: property.lng}}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                  <Market propertyId={property.id}
                          handleClick={this.props.onMarkerClick} 
                          cardHovered={this.props.cardHovered} />
                </OverlayView>
              })}
              <Polygon
                paths={paths}
                options={options}
              />
          </GoogleMap>
      </LoadScript>
    )
  }
}

export default MainMap;