import React from 'react'
import axios from 'axios'
import dateFormat from 'dateformat'
import NumberFormat from 'react-number-format'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import { GoogleMap, Marker } from '@react-google-maps/api'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

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

class AdminListingDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      listing: {},
      alertOpen: false,
      successMsg: '',
      errMsg: '',
      status: null
    }
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleAddressSelect = this.handleAddressSelect.bind(this)
    this.handleStreetChange = this.handleStreetChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.handleProvinceDropdown = this.handleProvinceDropdown.bind(this)
    this.handleProvinceDropdownId = this.handleProvinceDropdownId.bind(this)
    this.handleSectorDropdown = this.handleSectorDropdown.bind(this)
    this.handleSectorDropdownId = this.handleSectorDropdownId.bind(this)
    this.handleVerification = this.handleVerification.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    // window.scrollTo(0, 0);
    axios.get(`/api/listings/${this.props.match.params.id}`)
    .then(listing => {
      console.log(listing)
      this.setState({listing: listing.data.listing});
    })
    .then(() => {
      // Load Google Places API
      if(!window.google) {
        insertScript()
        this.timer = setTimeout(() => {
          this.setState({isLoading: false})
          // console.log('places api mounted')
        }, 2000)
      } else {
        this.timer = setTimeout(() => {
          this.setState({isLoading: false})
          // console.log('places api already mounted')
        }, 1000)
      }
    })
    .catch(err => {
      console.log(err.response.data, err.response.status)
    })
  }

  // Render Agent Photo
  renderAdminImg() {
    if(!this.state.isLoading && this.state.listing.agent['AgentProfilePicture']) {
      return <img src={this.state.listing.agent['AgentProfilePicture'][0].location} alt="Agent photo"/>
    } else {
      return <img src="https://agents-profile-pictures.s3.us-east-2.amazonaws.com/profile-avatar.png"
                  alt="Agent profile picture"/>
    }
  }

  // Address Change
  handleAddressChange = address => {
    this.setState(prevState => {
      let listing = {...prevState.listing}
      listing.listing_address = address
      return {listing}
    })
  }
  handleAddressSelect = async value => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    this.setState(prevState => {
      let listing = {...prevState.listing}
      listing.listing_address = value
      listing.lat = latLng.lat
      listing.lng = latLng.lng
      return {listing}
    })
    console.log(value, latLng)
  }
  handleStreetChange = street => {
    street.persist()
    this.setState(prevState => {
      let listing = {...prevState.listing}
      listing.street_name = street.target.value
      return {listing}
    })
  }
  handleNumberChange = number => {
    number.persist()
    this.setState(prevState => {
      let listing = {...prevState.listing}
      listing.street_number = parseInt(number.target.value)
      return {listing}
    })
  }
  handleProvinceDropdown = province => {
    province.persist()
    this.setState(prevState => {
      let listing = {...prevState.listing}
      listing.province = province.target.value
      return {listing}
    })
  }
  handleProvinceDropdownId = province => {
    province.persist()
    this.setState(prevState => {
      let listing = {...prevState.listing}
      listing.province_id = parseInt(province.target.value)
      return {listing}
    })
  }
  handleSectorDropdown = sector => {
    sector.persist()
    this.setState(prevState => {
      let listing = {...prevState.listing}
      listing.sector = sector.target.value
      return {listing}
    })
  }
  handleSectorDropdownId = sector => {
    sector.persist()
    this.setState(prevState => {
      let listing = {...prevState.listing}
      listing.sector_id = parseInt(sector.target.value)
      return {listing}
    })
  }
  // Alert
  renderAlert() {
    if(this.state.status === 200) {
      return <MuiAlert elevation={6} variant="filled" severity="success">{this.state.successMsg}</MuiAlert>
    } else {
      return <MuiAlert elevation={6} variant="filled" severity="error">{this.state.errMsg}</MuiAlert>
    }
  }
  handleClose() {
    this.setState({alertOpen: false})
  }

  handleVerification(e) {
    e.preventDefault()
    const body = this.state.listing
    axios.put(`/api/listings/${this.props.match.params.id}`, body)
    .then(res => {
      console.log(res.data.msg, res.data.updatedListing)
      this.setState({
        listing: res.data.updatedListing,
        successMsg: res.data.msg,
        status: res.status,
        errMsg: '',
        alertOpen: true
      })
    })
    .catch(err => {
      console.log(err.response.data.msg)
      this.setState({
        successMsg: '',
        errMsg: err.response.data.msg,
        status: err.response.status,
        alertOpen: true
      })
    })
  }
  
  render() {
    if(this.state.isLoading) {
      return <div></div>
    } else {
      return (
        <div className="admin-listing-details-container">
          <Snackbar open={this.state.alertOpen}
                    autoHideDuration={4000}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    onClose={this.handleClose}
                    style={{top: '92px'}}>
            {this.renderAlert()}
          </Snackbar>
          <div className="agent-info">
            <div className="agent-info-left">
              {this.renderAdminImg()}
              <div className="agent-info-text">
                <h4>{this.state.listing.agent.name}</h4>
                <span>{this.state.listing.agent.email}</span>
                <span>{this.state.listing.agent.phone_number}</span>
                <span>{dateFormat(this.state.listing.agent.createdAt, "dd/mm/yy")}</span>
              </div>
            </div>
            <div className="agent-info-right">
              <h4>{this.state.listing.agent.brokerage_name}</h4>
            </div>
          </div>
          <div className="listing-details-container">
            <div className="listing-details-left">
              <span>{`Tipo de Propiedad: ${this.state.listing.property_type}`}</span>
              <span>{`Tipo de Publicación: ${this.state.listing.listing_type}`}</span>
              <span>{`Habitaciones: ${this.state.listing.bedrooms}`}</span>
              <span>{`Baños: ${this.state.listing.bathrooms}`}</span>
              <span>{`Medio Baños: ${this.state.listing.half_bathrooms}`}</span>
              <span>{`Parqueos: ${this.state.listing.parking_spaces}`}</span>
              <span>{`Metros Cuadrados: ${this.state.listing.square_meters}`}</span>
              <span>Precio:
                <NumberFormat
                  value={this.state.listing.listing_price}
                  displayType={'text'}
                  thousandSeparator={true} prefix={' US$'}/>
              </span>
              <span>Fecha: {dateFormat(this.state.listing.createdAt, "dd/mm/yy")}</span>
              <span>{`Descripción: ${this.state.listing.description}`}</span>
              <span>{`Estatus: ${this.state.listing.listing_active}`}</span>
              <div className="image-preview">
                {this.state.listing['PropertyPictures'].map(image => (
                  <div className="thumb" key={image.id}>
                    <div className="thumb-inner">
                      <img src={image.location}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="listing-details-right">
              <span>{`Dirección: ${this.state.listing.listing_address}`}</span>
              <PlacesAutocomplete 
                value={this.state.listing.listing_address}
                onChange={this.handleAddressChange}
                onSelect={this.handleAddressSelect}
                searchOptions={{componentRestrictions: { country: "do" }, types: ['address'], fields: ['address_components']}}>
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                      <input {...getInputProps({
                        placeholder: 'Dirección de la propiedad ...',
                        className: 'address-search-input'
                        })}/>
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Cargando...</div>}
                        {suggestions.map(suggestion => {
                          const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item'
                          return (
                            <div {...getSuggestionItemProps(suggestion, {className})} key={suggestion.placeId}>
                              {suggestion.description}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}                                
              </PlacesAutocomplete>
              <h3>Nombre de la Calle:</h3>
              <input type="text"
                     value={this.state.listing.street_name ? this.state.listing.street_name : ""}
                     onChange={this.handleStreetChange}/>
              <h3>Número de la Calle: </h3>
              <input type="number"
                     value={this.state.listing.street_number ? this.state.listing.street_number : ""}
                     onChange={this.handleNumberChange}/>
              <span>{`Lat: ${this.state.listing.lat}, Lng: ${this.state.listing.lng}`}</span>
              <div className="listing-map" style={{height: '200px', width: '100%', margin: '15px 0px'}}>
                <GoogleMap
                  options={mapOptions}
                  mapContainerStyle={{width: '100%', height: '100%'}}
                  center={{lat: this.state.listing.lat, lng: this.state.listing.lng}}
                  zoom={16}>
                    <Marker position={{lat: this.state.listing.lat, lng: this.state.listing.lng}}/>
                </GoogleMap>
              </div>
              <label htmlFor="province-select">Provincia</label>
              <input name="province-select"
                      type="text"
                      id="province-select"
                      value={this.state.listing.province ? this.state.listing.province : ""}
                      onChange={this.handleProvinceDropdown}/>
              <label htmlFor="province-id">ID Provincia</label>
              <input name="province-id"
                      type="number"
                      id="province-id"
                      value={this.state.listing.province_id ? this.state.listing.province_id : ""}
                      onChange={this.handleProvinceDropdownId}/>
              <label htmlFor="sector">Sector</label>
              <input name="sector"
                      type="text"
                      id="sector"
                      value={this.state.listing.sector ? this.state.listing.sector : ""}
                      onChange={this.handleSectorDropdown}/>
              <label htmlFor="sector-id">ID Sector</label>
              <input name="sector-id"
                      type="number"
                      id="sector-id"
                      value={this.state.listing.sector_id ? this.state.listing.sector_id : ""}
                      onChange={this.handleSectorDropdownId}/>
              <form onSubmit={this.handleVerification}>
                <button type="submit">Verificar</button>
              </form>
            </div>
          </div>
        </div>
      )
    }
  }
}


function insertScript() {
  let mapsApiKey;
  if(process.env.NODE_ENV === 'production') {
    mapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY_PROD
  } else {
    mapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY
  }

  const {head} = document
  const script = document.createElement('script')
  script.id = 'newListingTag'
  script.type = 'text/javascript'
  script.async = false
  script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&libraries=places&language=es`
  head.appendChild(script)
}

export default AdminListingDetails