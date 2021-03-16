import React from 'react'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import Select from 'react-select'
import Dropzone from 'react-dropzone'


const listingTypes = ['apartment', 'house', 'villa', 'penthouse']
const bedOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];
const bathOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];
const halfBathOptions = [
  { value: '0', label: '0' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
];
const parkingOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];

class ListingEditForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      listingAddress: this.props.listing.listing_address,
      lat: null,
      lng: null,
      propertyType: this.props.listing.property_type,
      listingType: this.props.listing.listing_type,
      bedrooms: this.props.listing.bedrooms,
      bathrooms: this.props.listing.bathrooms,
      halfBathrooms: this.props.listing.half_bathrooms,
      parking: this.props.listing.parking_spaces,
      mts: this.props.listing.square_meters,
      price: this.props.listing.listing_price,
      amenities: {
        halfBath: this.props.listing['PropertyAmenity'].half_bathrooms,
        aC: this.props.listing['PropertyAmenity'].air_conditioner,
        gameZone: this.props.listing['PropertyAmenity'].game_zone,
        laundryRoom: this.props.listing['PropertyAmenity'].laundry_room,
        socialArea: this.props.listing['PropertyAmenity'].social_area,
        elevator: this.props.listing['PropertyAmenity'].elevator,
        balcony: this.props.listing['PropertyAmenity'].balcony,
        familyRoom: this.props.listing['PropertyAmenity'].family_room,
        centralGas: this.props.listing['PropertyAmenity'].shared_gas,
        gym: this.props.listing['PropertyAmenity'].gym,
        serviceRoom: this.props.listing['PropertyAmenity'].service_room,
        jacuzzy: this.props.listing['PropertyAmenity'].jacuzzy,
        lobby: this.props.listing['PropertyAmenity'].lobby,
        pool: this.props.listing['PropertyAmenity'].swimming_pool,
        floor: this.props.listing['PropertyAmenity'].marble_floor,
        powerPlant: this.props.listing['PropertyAmenity'].power_plant,
        security: this.props.listing['PropertyAmenity'].security,
        wiCloset: this.props.listing['PropertyAmenity'].walk_in_closet,
        furnished: this.props.listing['PropertyAmenity'].furnished,
        securitySystem: this.props.listing['PropertyAmenity'].security_system,
        hardwoodFloor: this.props.listing['PropertyAmenity'].hardwood_floor
      },
      description: this.props.listing.description,
      imageFiles: this.props.listing['PropertyPictures'],
      imageToUpload: [],
      imageToDelete: []
    }
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleAddressSelect = this.handleAddressSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    // Details
    this.handleBedroomChange = this.handleBedroomChange.bind(this)
    this.handleChecks = this.handleChecks.bind(this)
    // Photos
    this.handleDrop = this.handleDrop.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {
    if(!window.google) {
      insertScript()
      this.timer = setTimeout(() => {
        this.setState({isLoading: false})
        console.log('places api mounted')
      }, 2000)
    } else {
      this.timer = setTimeout(() => {
        this.setState({isLoading: false})
        console.log('places api already mounted')
      }, 1000)
    }
    console.log(this.props.listing)
  }

  handleAddressChange = address => {
    this.setState({listingAddress: address})
  }
  handleAddressSelect = async value => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    this.setState({listingAddress: value,lat: latLng.lat, lng: latLng.lng})
    console.log(value, latLng)
  }
  handleChange = input => e => {
    console.log([input], e.target.value)
    if(input === 'mts' || input === 'price') {
      if(isNaN(parseInt(e.target.value))) {
        this.setState({[input]: null})    
      } else {
        this.setState({[input]: parseInt(e.target.value)})  
      }
    } else {
      this.setState({[input]: e.target.value})
    }
  }
  // handleSelectChange = (optionSelected, value) => {
  //   console.log(optionSelected, value)
  //   this.setState({[optionSelected]: parseInt(value)})
  // }

  // Details
  handleBedroomChange = (optionSelected) => {
    this.setState({bedrooms: parseInt(optionSelected.value)})
  }
  handleBathroomChange = (optionSelected) => {
    this.setState({bathrooms: parseInt(optionSelected.value)})
  }
  handleHalfBathroomChange = (optionSelected) => {
    this.setState({halfBathrooms: parseInt(optionSelected.value)})
  }
  handleParkingChange = (optionSelected) => {
    this.setState({parking: parseInt(optionSelected.value)})
  }
  handleChecks(e) {
    e.persist()
    this.setState(prevState => ({
      amenities: {
        ...prevState.amenities,
        [e.target.name]: e.target.checked  
      }
    }))
  }
  handleDrop = (imageFiles) => {
    console.log(imageFiles);
    this.setState({
      imageFiles: this.state.imageFiles.concat(imageFiles.map(file => Object.assign(file, {location: URL.createObjectURL(file)}))),
      imageToUpload: this.state.imageToUpload.concat(imageFiles)
    })
  }
  handleRemove = imageName => e => {
    // find the image's index
    let imageIndex;
    if(this.state.imageFiles.findIndex(e => e.original_name === imageName) === -1) {
      imageIndex = this.state.imageFiles.findIndex(e => e.name === imageName)
    } else {
      imageIndex = this.state.imageFiles.findIndex(e => e.original_name === imageName)
    }
    console.log(imageIndex)
    // Add to array of images to delete if image in db
    if(this.state.imageFiles[imageIndex].id) {
      console.log(this.state.imageFiles[imageIndex].id)
      this.setState({
        imageToDelete: this.state.imageToDelete.concat([this.state.imageFiles[imageIndex].id])
      })
    }

    // remove the item from array
    this.state.imageFiles.splice(imageIndex, 1)
    // update the array
    this.setState([...this.state.imageFiles])
    
    // Remove image to upload
    if(this.state.imageToUpload.findIndex(e => e.name === imageName) !== -1) {
      const uploadIndex = this.state.imageToUpload.findIndex(e => e.name === imageName)
      this.state.imageToUpload.splice(uploadIndex, 1)
      this.setState([...this.state.imageToUpload])
    }
  }

  render() {
    if(this.state.isLoading) {
      return <div></div>
    } else {
      return (
        <div className="listing-edit-section">
          <div className="property-address listing-container">
            <h3>Ubicación de la Propiedad</h3>
            <span>Especificar dirección con número (#)</span>
            <PlacesAutocomplete 
              value={this.state.listingAddress}
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
          </div>
          <div className="property-type listing-container">
            <h3>Tipo de Propiedad</h3>
            <div className="property-type-options">
              <fieldset>
                {listingTypes.map(value => {
                  let valueLabel;
                  if(value === 'apartment') {
                    valueLabel = 'Apartamento'
                  } else if(value === 'house') {
                    valueLabel = 'Casa'
                  } else if(value === 'villa') {
                    valueLabel = 'Villa'
                  } else if(value === 'penthouse') {
                    valueLabel = 'Penthouse'
                  } else if(value === 'comercial') {
                    valueLabel = 'Locales'
                  } else if(value === 'industrial') {
                    valueLabel = 'Naves'
                  }
                  return (
                    <label key={value} className={this.state.propertyType === value ? "type-option selected" : "type-option"}>
                      {valueLabel}
                      <input type="radio" name="propertyType" value={value} onChange={this.handleChange('propertyType')}/>
                    </label>
                  )
                })}
              </fieldset>
            </div>
            <div className="listing-type-container">
              <h3>Tipo de Publicación</h3>
              <div className="listing-type-options">
                <label className={this.state.listingType === 'sale' ? "type-option selected" : "type-option"}>
                  Venta
                  <input type="radio" name="listingType" value="sale" onChange={this.handleChange('listingType')}/>
                </label>
                <label className={this.state.listingType === 'rent' ? "type-option selected" : "type-option"}>
                  Alquiler
                  <input type="radio" name="listingType" value="rent" onChange={this.handleChange('listingType')}/>
                </label>
              </div>
            </div>
          </div>
          {/* Details */}
          <div className="listing-beds-baths-mts listing-container">
            <div className="listing-options">
              <label>Habitaciones</label>
              <Select
                options={bedOptions}
                placeholder="Seleccionar..."
                onChange={this.handleBedroomChange}
                isSearchable={false}
                value={this.state.bedrooms && {label: `${this.state.bedrooms}`, value: `${this.state.bedrooms}`}}/>
            </div>
            <div className="listing-options">
              <label>Baños</label>
              <Select
                options={bathOptions}
                placeholder="Seleccionar..."
                onChange={this.handleBathroomChange}
                isSearchable={false}
                value={this.state.bathrooms && {label: `${this.state.bathrooms}`, value: `${this.state.bathrooms}`}}/>
            </div>
            <div className="listing-options">
              <label>Medio Baños</label>
              <Select
                options={halfBathOptions}
                placeholder="Seleccionar..."
                onChange={this.handleHalfBathroomChange}
                isSearchable={false}
                value={this.state.halfBathrooms !== null ? {label: `${this.state.halfBathrooms}`, value: `${this.state.halfBathrooms}`}: ''}/>
            </div>
            <div className="listing-options">
              <label>Parqueos</label>
              <Select
                options={parkingOptions}
                placeholder="Seleccionar..."
                onChange={this.handleParkingChange}
                isSearchable={false}
                value={this.state.parking && {label: `${this.state.parking}`, value: `${this.state.parking}`}}/>
            </div>
            <div className="listing-options">
              <label>Metros Cuadrados</label>
              <div className="mts-option">
                <input id="mts-input"
                      type="text"
                      pattern="[0-9]+"
                      onChange={this.handleChange('mts')}
                      value={this.state.mts === null ? '' : this.state.mts}/>
                <label htmlFor="mts-input">Mts2</label>
              </div>
            </div>
            <div className="listing-options">
              <label>Precio</label>
              <div className="price-option">
                <input id="price-input"
                      type="text"
                      pattern="[0-9]+"
                      onChange={this.handleChange('price')}
                      value={this.state.price === null ? '' : this.state.price}/>
                <label htmlFor="price-input">US$</label>
              </div>
            </div>
          </div>
          {/* Amenities */}
          <div className="listing-amenities listing-container">
            <h3>Amenidades</h3>
            <div className="checkbox-container">
              <div className="amenity-info">
                <input id="1/2" name="halfBath" type="checkbox" className="amenity-input" onChange={this.handleChecks} checked={this.state.amenities.halfBath}/>
                <label htmlFor="1/2" className="amenity-label">1/2 Baño</label>
              </div>
              <div className="amenity-info">
                <input id="a/c" name="aC" type="checkbox" className="amenity-input" onChange={this.handleChecks} checked={this.state.amenities.aC}/>
                <label htmlFor="a/c" className="amenity-label">Aire Acondicionado</label>
              </div>
              <div className="amenity-info">
                <input id="furnished" name="furnished" type="checkbox" className="amenity-input" onChange={this.handleChecks} checked={this.state.amenities.furnished}/>
                <label htmlFor="furnished" className="amenity-label">Amueblado</label>
              </div>
              <div className="amenity-info">
                <input id="games-zone" name="gameZone" type="checkbox" className="amenity-input" onChange={this.handleChecks} checked={this.state.amenities.gameZone}/>
                <label htmlFor="games-zone" className="amenity-label">Área de Juegos</label>
              </div>
              <div className="amenity-info">
                <input id="laundry-room" name="laundryRoom" type="checkbox" className="amenity-input" onChange={this.handleChecks} checked={this.state.amenities.laundryRoom}/>
                <label htmlFor="laundry-room" className="amenity-label">Área de Lavado</label>
              </div>
              <div className="amenity-info">
                <input id="social-area" name="socialArea" type="checkbox" className="amenity-input" onChange={this.handleChecks} checked={this.state.amenities.socialArea}/>
                <label htmlFor="social-area" className="amenity-label">Área Social</label>
              </div>
              <div className="amenity-info">
                <input id="elevator" name="elevator" type="checkbox" className="amenity-input" onChange={this.handleChecks} checked={this.state.amenities.elevator}/>
                <label htmlFor="elevator" className="amenity-label">Ascensor</label>
              </div>
              <div className="amenity-info">
                <input id="balcony" name="balcony" type="checkbox" className="amenity-input" onChange={this.handleChecks} checked={this.state.amenities.balcony}/>
                <label htmlFor="balcony" className="amenity-label">Balcón</label>
              </div>
              <div className="amenity-info">
                <input id="securitySystem" name="securitySystem" type="checkbox" className="amenity-input" onChange={this.handleChecks} checked={this.state.amenities.securitySystem}/>
                <label htmlFor="securitySystem" className="amenity-label">Cámaras de Seguridad</label>
              </div>
              <div className="amenity-info">
                <input id="family-room" name="familyRoom" type="checkbox" className="amenity-input" onChange={this.handleChecks} checked={this.state.amenities.familyRoom}/>
                <label htmlFor="family-room" className="amenity-label">Family Room</label>
              </div>
              <div className="amenity-info">
                <input id="central-gas" name="centralGas" type="checkbox" className="amenity-input" onChange={this.handleChecks} checked={this.state.amenities.centralGas}/>
                <label htmlFor="central-gas" className="amenity-label">Gas Común</label>
              </div>
              <div className="amenity-info">
                <input id="gym" type="checkbox" name="gym" className="amenity-input" onChange={this.handleChecks} checked={this.state.amenities.gym}/>
                <label htmlFor="gym" className="amenity-label">Gimnasio</label>
              </div>
              <div className="amenity-info">
                <input id="service-room"  name="serviceRoom" type="checkbox" className="amenity-input" onChange={this.handleChecks} checked={this.state.amenities.serviceRoom}/>
                <label htmlFor="service-room" className="amenity-label">Habitación de Servicio</label>
              </div>
              <div className="amenity-info">
                <input id="jacuzzi" name="jacuzzy" type="checkbox" className="amenity-input" onChange={this.handleChecks} checked={this.state.amenities.jacuzzy}/>
                <label htmlFor="jacuzzi" className="amenity-label">Jacuzzi</label>
              </div>
              <div className="amenity-info">
                <input id="lobby" name="lobby" type="checkbox" className="amenity-input" onChange={this.handleChecks} checked={this.state.amenities.lobby}/>
                <label htmlFor="lobby" className="amenity-label">Lobby</label>
              </div>
              <div className="amenity-info">
                <input id="pool" name="pool" type="checkbox" className="amenity-input" onChange={this.handleChecks} checked={this.state.amenities.pool}/>
                <label htmlFor="pool" className="amenity-label">Piscina</label>
              </div>
              <div className="amenity-info">
                <input id="hardwoodFloor" name="hardwoodFloor" type="checkbox" className="amenity-input" onChange={this.handleChecks} checked={this.state.amenities.hardwoodFloor}/>
                <label htmlFor="hardwoodFloor" className="amenity-label">Piso de Madera</label>
              </div>
              <div className="amenity-info">
                <input id="floor" name="floor" type="checkbox" className="amenity-input" onChange={this.handleChecks} checked={this.state.amenities.floor}/>
                <label htmlFor="floor" className="amenity-label">Piso de Marmol</label>
              </div>
              <div className="amenity-info">
                <input id="power-plant" name="powerPlant" type="checkbox" className="amenity-input" onChange={this.handleChecks} checked={this.state.amenities.powerPlant}/>
                <label htmlFor="power-plant" className="amenity-label">Planta Eléctrica</label>
              </div>
              <div className="amenity-info">
                <input id="security" name="security" type="checkbox" className="amenity-input" onChange={this.handleChecks} checked={this.state.amenities.security}/>
                <label htmlFor="security" className="amenity-label">Seguridad 24/7</label>
              </div>
              <div className="amenity-info">
                <input id="wi-closet" name="wiCloset" type="checkbox" className="amenity-input" onChange={this.handleChecks} checked={this.state.amenities.wiCloset}/>
                <label htmlFor="wi-closet" className="amenity-label">Walk In Closet</label>
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="listing-description listing-container">
            <h3>Descripción Detallada</h3>
            <p>Destacar caracteristicas como renovaciones, remodelaciones o cualquier detalle importante sobre la propiedad.</p>
            <div className="text-area-container">
              <textarea value={this.state.description} name="description" rows="6" onChange={this.handleChange('description')}/>
            </div>
          </div>
          {/* Photos */}
          <div className="listing-photos listing-container">
            <h3>Fotos de la Propiedad</h3>
            <p>Subir imagenes en formato: jpg, png o jpeg. Propiedades con fotos de calidad llaman más la atención</p>
            <div className="upload-container">
              <Dropzone onDrop={this.handleDrop} accept="image/*" multiple>
                {({getRootProps, getInputProps}) => (
                  <div {...getRootProps()} className="upload-component">
                    <input {...getInputProps()}/>
                    <span><i className="far fa-images"></i></span>
                    <p>Arrastrar fotos o haz click para seleccionar.</p>
                  </div>
                )}
              </Dropzone>
              <div className="image-preview">
                {this.state.imageFiles.map(image => (
                  <div className="thumb" key={image.original_name || image.name}>
                    <div className="thumb-inner">
                      <img src={image.location}/>
                      <span className="remove-image">
                        <i className="fas fa-trash-alt" onClick={this.handleRemove(image.original_name || image.name)}></i>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

function insertScript() {
  const {head} = document
  const script = document.createElement('script')
  script.id = 'newListingTag'
  script.type = 'text/javascript'
  script.async = false
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places&language=es`
  head.appendChild(script)
}

export default ListingEditForm