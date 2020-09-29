import React from 'react';
import { GoogleMap, OverlayView, Polygon } from '@react-google-maps/api';
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
  strokeColor: "#1183E6",
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
    this.prevCenter = {lat: 18.473110,lng: -69.934695};
    this.prevZoom = null;
    this.prevPaths = [];
  }

  componentDidMount() {
    console.log(this.props.initialStateSearch.sector)
    // navigator.geolocation.getCurrentPosition(position => {
    //   console.log("Latitude is :", position.coords.latitude);
    //   console.log("Longitude is :", position.coords.longitude);
    //   this.setState({centerMap: {lat: position.coords.latitude, lng: position.coords.longitude}})
    // })
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
      // if back button from search to /properties
      if(this.props.initialStateSearch.sector === undefined) {
        this.setState({
            sector: '',
            paths: [],
            zoomLevel: 14,
            centerMap: {lat: 18.473110,lng: -69.934695}
        })
      } else {
        sectorsProvinces.forEach(arrayItem => {
          if(arrayItem.sector === this.props.initialStateSearch.sector) {
            const index = sectorsProvinces.findIndex(i => i.sector === arrayItem.sector)
            const paths = sectorsProvinces[index].paths
            console.log(index)
            this.prevCenter = this.state.centerMap;
            this.prevZoom = this.state.zoomLevel;
            this.prevPaths = this.state.paths;
            this.setState({
              sector: this.props.initialStateSearch.sector,
              paths: paths,
              zoomLevel: sectorsProvinces[index].zoomLevel,
              centerMap: sectorsProvinces[index].centerLocation
            }, () => {
              console.log(this.state.paths)
            })
          }
        })
      }
    } else if(prevProps.initialStateSearch.sector === this.props.initialStateSearch.sector) {
      this.prevCenter = this.state.centerMap;
      this.prevZoom = this.state.zoomLevel;
      this.prevPaths = this.state.paths;
    }
  }


  render() {
    return (
      <GoogleMap
        options={mapOptions}
        mapContainerStyle={{width: '100%', height: '100%'}}
        center={this.props.loadingStatus ? this.prevCenter : this.state.centerMap}
        zoom={this.props.loadingStatus ? this.prevZoom : this.state.zoomLevel}
        onClick={this.props.onMapClick}>
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
            paths={this.props.loadingStatus ? this.prevPaths : this.state.paths}
            options={polygonOptions}
          />
      </GoogleMap>
    )
  }
}

MainMap.defaultProps = {
  defaultCenter: {lat: 18.473110,lng: -69.934695},
  defaultZoom: 14
}

export default MainMap;