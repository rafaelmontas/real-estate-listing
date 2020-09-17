import React from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api';


// const mapStyles = {
//   width: '100%',
//   height: '100%',
//   borderRadius: '4px'
// };

const mapOptions = {
  mapTypeControl: false,
  streetViewControl: false,
  // styles: [
  //   {
  //     featureType: "poi",
  //     stylers: [{ visibility: "off" }]
  //   },
  //   {
  //     featureType: "transit.station",
  //     stylers: [{ visibility: "off" }]
  //   }
  // ]
}

class MapSection extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.property)
  }



  render() {
    console.log(this.props.property)
    if(this.props.property.lat === undefined && this.props.property.lng === undefined) {
      return null
    } else {
      return (
        <div className="map-section">
          <h3>Mapa</h3>
          <div className="map">
            <GoogleMap 
              options={mapOptions}
              mapContainerStyle={{width: '100%', height: '100%', borderRadius: '4px'}}
              center={{lat: this.props.property.lat, lng: this.props.property.lng}}
              zoom={16}>
                <Marker position={{lat: this.props.property.lat, lng: this.props.property.lng}}/>
            </GoogleMap>
          </div>
        </div>
      )
    }
    
  }
}

export default MapSection;