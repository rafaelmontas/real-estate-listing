import React from 'react';
import { GoogleMap, LoadScript, OverlayView, Polygon } from '@react-google-maps/api';
import Market from './Marker';
import './Marker.css';
import { sectorsProvinces } from '../../utils/SectorsProvinces';


const center = {
  'Ensanche Naco': {
    lat: 18.474860,
    lng: -69.926488
  },
  'Piantini': {
    lat: 18.473527,
    lng: -69.935778
  }
};

const paths = {
  'Ensanche Naco': [
    { lat: 18.482289, lng: -69.931080 },
    { lat: 18.468409, lng: -69.931788 },
    { lat: 18.465620, lng: -69.930244 },
    { lat: 18.469040, lng: -69.923677 },
    { lat: 18.470586, lng: -69.924750 },
    { lat: 18.470810, lng: -69.924300 },
    { lat: 18.471380, lng: -69.923871 },
    { lat: 18.474596, lng: -69.920180 },
    // { lat: 18.472713, lng: -69.919289 },
    // { lat: 18.473583, lng: -69.919879 },
    // { lat: 18.473782, lng: -69.919992 },
    { lat: 18.475023, lng: -69.920325 },
    { lat: 18.481841, lng: -69.920765 },
    { lat: 18.482065, lng: -69.921129 },
    { lat: 18.482711, lng: -69.931064 },
    
  ],
  'Piantini': [
    { lat: 18.482289, lng: -69.931080 },
    { lat: 18.468409, lng: -69.931788 },
    { lat: 18.465620, lng: -69.930244 },
    { lat: 18.462694, lng: -69.936008 },
    { lat: 18.475679, lng: -69.943325 },
    { lat: 18.476101, lng: -69.942564 },
    { lat: 18.476213, lng: -69.942349 },
    { lat: 18.476447, lng: -69.942231 },
    { lat: 18.476732, lng: -69.941561 },
    { lat: 18.476630, lng: -69.941464 },
    { lat: 18.478604, lng: -69.937591 },
    { lat: 18.483987, lng: -69.940595 },
    { lat: 18.484313, lng: -69.939629 },
    { lat: 18.484211, lng: -69.939029 },
    { lat: 18.483051, lng: -69.934930 },
    { lat: 18.482929, lng: -69.934222 },
    { lat: 18.482715, lng: -69.931057 },
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

  handleSectorChange(prevSector, newSector) {
    sectorsProvinces.forEach(arrayItem => {
      if(arrayItem.sector === this.props.initialStateSearch.sector) {
        const index = sectorsProvinces.indexOf(arrayItem.sector)
        console.log(index)
      }
    })
    const foundSector = sectorsProvinces.filter(s => s.sector)
  }

  render() {
    return (
      <LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_API_KEY}`}>
          <GoogleMap
            options={{mapTypeControl: false, streetViewControl: false, styles: [{featureType: "poi", stylers: [{ visibility: "off" }] }]}}
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