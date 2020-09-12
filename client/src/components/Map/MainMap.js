import React from 'react';
import { GoogleMap, LoadScript, OverlayView, Polygon } from '@react-google-maps/api';
import Market from './Marker';
import './Marker.css';
import { sectorsProvinces } from '../../utils/SectorsProvinces';


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

const polygonOptions = {
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
    this.state = {
      sector: '',
      paths: [],
      zoomLevel: 14,
      centerMap: {lat: 18.473110,lng: -69.934695}
    }
  }

  componentDidMount() {
    console.log(this.props.initialStateSearch.sector)
    // if(this.props.initialStateSearch.sector) {
    //   this.setState({sector: this.props.initialStateSearch.sector})
    // }
    sectorsProvinces.forEach(arrayItem => {
      if(arrayItem.sector === this.props.initialStateSearch.sector) {
        const index = sectorsProvinces.findIndex(i => i.sector === arrayItem.sector)
        const paths = sectorsProvinces[index].paths
        console.log(index)
        this.setState({
          sector: this.props.initialStateSearch.sector,
          paths: paths,
          zoomLevel: sectorsProvinces[index].zoomLevel,
          centerMap: sectorsProvinces[index].centerLocation
        })
      }
    })
  }
  componentDidUpdate(prevProps) {
    console.log('updated map')
    if(prevProps.initialStateSearch.sector !== this.props.initialStateSearch.sector) {
      this.setState({sector: this.props.initialStateSearch.sector})
      sectorsProvinces.forEach(arrayItem => {
        if(arrayItem.sector === this.props.initialStateSearch.sector) {
          const index = sectorsProvinces.findIndex(i => i.sector === arrayItem.sector)
          const paths = sectorsProvinces[index].paths
          console.log(index)
          this.setState({
            paths: paths,
            zoomLevel: sectorsProvinces[index].zoomLevel,
            centerMap: sectorsProvinces[index].centerLocation
          }, () => {
            console.log(this.state.paths)
          })
        }
      })
    }
  }

  // handleSectorChange() {
  //   sectorsProvinces.forEach(arrayItem => {
  //     if(arrayItem.sector === this.props.initialStateSearch.sector) {
  //       const index = sectorsProvinces.indexOf(arrayItem.sector)
  //       console.log(index)
  //     }
  //   })
  //   const foundSector = sectorsProvinces.filter(s => s.sector)
  // }

  render() {
    return (
      <LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_API_KEY}`}>
          <GoogleMap
            options={mapOptions}
            mapContainerStyle={{width: '100%', height: '100%'}}
            center={!this.props.loadingStatus && this.state.centerMap}
            zoom={!this.props.loadingStatus && this.state.zoomLevel}>
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
              {!this.props.loadingStatus && <Polygon
                paths={this.state.paths}
                options={polygonOptions}
              />}
          </GoogleMap>
      </LoadScript>
    )
  }
}

MainMap.defaultProps = {
  defaultCenter: {lat: 18.473110,lng: -69.934695},
  defaultZoom: 14
}

export default MainMap;