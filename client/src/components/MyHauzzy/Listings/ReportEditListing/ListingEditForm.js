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
  }

  // componentDidMount() {
  //   console.log(this.props.listing)
  // }

  render() {
    if(this.props.isLoading) {
      return <div></div>
    } else {
      return (
        <form className="listing-edit-section" onSubmit={this.props.onUpdate}>
          <div className="property-address listing-container">
            <h3>Ubicación de la Propiedad</h3>
            <div className="location-info">
              <div className="listing-options">
                <label for="prov-input">Provincia</label>
                <div className="prov-option">
                  <input id="prov-input"
                        type="text"
                        onChange={this.props.handleChange('province')}
                        value={this.props.listingProvince}
                        />
                </div>
              </div>
              <div className="listing-options">
                <label for="sect-input">Sector</label>
                <div className="sect-option">
                  <input id="sect-input"
                        type="text"
                        onChange={this.props.handleChange('sector')}
                        value={this.props.listingSector}
                        />
                </div>
              </div>
            </div>
            <label for="searchInpt">Dirección</label>
            <PlacesAutocomplete 
              value={this.props.listingAddress}
              onChange={this.props.handleAddressChange}
              onSelect={this.props.handleAddressSelect}
              searchOptions={{componentRestrictions: { country: "do" }, types: ['address'], fields: ['address_components']}}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <input {...getInputProps({
                      placeholder: 'Dirección de la propiedad ...',
                      className: 'address-search-input',
                      id: 'searchInpt'
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
                    <label key={value} className={this.props.propertyType === value ? "type-option selected" : "type-option"}>
                      {valueLabel}
                      <input type="radio" name="propertyType" value={value} onChange={this.props.handleChange('property_type')}/>
                    </label>
                  )
                })}
              </fieldset>
            </div>
            <div className="listing-type-container">
              <h3>Tipo de Publicación</h3>
              <div className="listing-type-options">
                <label className={this.props.listingType === 'sale' ? "type-option selected" : "type-option"}>
                  Venta
                  <input type="radio" name="listingType" value="sale" onChange={this.props.handleChange('listing_type')}/>
                </label>
                <label className={this.props.listingType === 'rent' ? "type-option selected" : "type-option"}>
                  Alquiler
                  <input type="radio" name="listingType" value="rent" onChange={this.props.handleChange('listing_type')}/>
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
                onChange={this.props.handleBedroomChange}
                isSearchable={false}
                value={this.props.bedrooms && {label: `${this.props.bedrooms}`, value: `${this.props.bedrooms}`}}/>
            </div>
            <div className="listing-options">
              <label>Baños</label>
              <Select
                options={bathOptions}
                placeholder="Seleccionar..."
                onChange={this.props.handleBathroomChange}
                isSearchable={false}
                value={this.props.bathrooms && {label: `${this.props.bathrooms}`, value: `${this.props.bathrooms}`}}/>
            </div>
            <div className="listing-options">
              <label>Medio Baños</label>
              <Select
                options={halfBathOptions}
                placeholder="Seleccionar..."
                onChange={this.props.handleHalfBathroomChange}
                isSearchable={false}
                value={this.props.halfBathrooms !== null ? {label: `${this.props.halfBathrooms}`, value: `${this.props.halfBathrooms}`}: ''}/>
            </div>
            <div className="listing-options">
              <label>Parqueos</label>
              <Select
                options={parkingOptions}
                placeholder="Seleccionar..."
                onChange={this.props.handleParkingChange}
                isSearchable={false}
                value={this.props.parking && {label: `${this.props.parking}`, value: `${this.props.parking}`}}/>
            </div>
            <div className="listing-options">
              <label>Metros Cuadrados</label>
              <div className="mts-option">
                <input id="mts-input"
                      type="text"
                      pattern="[0-9]+"
                      onChange={this.props.handleChange('square_meters')}
                      value={this.props.mts === null ? '' : this.props.mts}/>
                <label htmlFor="mts-input">Mts2</label>
              </div>
            </div>
            <div className="listing-options">
              <label>Precio</label>
              <div className="price-option">
                <input id="price-input"
                      type="text"
                      pattern="[0-9]+"
                      onChange={this.props.handleChange('listing_price')}
                      value={this.props.price === null ? '' : this.props.price}/>
                <label htmlFor="price-input">US$</label>
              </div>
            </div>
          </div>
          {/* Amenities */}
          <div className="listing-amenities listing-container">
            <h3>Amenidades</h3>
            <div className="checkbox-container">
              <div className="amenity-info">
                <input id="1/2" name="half_bathrooms" type="checkbox" className="amenity-input" onChange={this.props.handleChecks} checked={this.props.amenities.half_bathrooms}/>
                <label htmlFor="1/2" className="amenity-label">1/2 Baño</label>
              </div>
              <div className="amenity-info">
                <input id="a/c" name="air_conditioner" type="checkbox" className="amenity-input" onChange={this.props.handleChecks} checked={this.props.amenities.air_conditioner}/>
                <label htmlFor="a/c" className="amenity-label">Aire Acondicionado</label>
              </div>
              <div className="amenity-info">
                <input id="furnished" name="furnished" type="checkbox" className="amenity-input" onChange={this.props.handleChecks} checked={this.props.amenities.furnished}/>
                <label htmlFor="furnished" className="amenity-label">Amueblado</label>
              </div>
              <div className="amenity-info">
                <input id="games-zone" name="game_zone" type="checkbox" className="amenity-input" onChange={this.props.handleChecks} checked={this.props.amenities.game_zone}/>
                <label htmlFor="games-zone" className="amenity-label">Área de Juegos</label>
              </div>
              <div className="amenity-info">
                <input id="laundry-room" name="laundry_room" type="checkbox" className="amenity-input" onChange={this.props.handleChecks} checked={this.props.amenities.laundry_room}/>
                <label htmlFor="laundry-room" className="amenity-label">Área de Lavado</label>
              </div>
              <div className="amenity-info">
                <input id="social-area" name="social_area" type="checkbox" className="amenity-input" onChange={this.props.handleChecks} checked={this.props.amenities.social_area}/>
                <label htmlFor="social-area" className="amenity-label">Área Social</label>
              </div>
              <div className="amenity-info">
                <input id="elevator" name="elevator" type="checkbox" className="amenity-input" onChange={this.props.handleChecks} checked={this.props.amenities.elevator}/>
                <label htmlFor="elevator" className="amenity-label">Ascensor</label>
              </div>
              <div className="amenity-info">
                <input id="balcony" name="balcony" type="checkbox" className="amenity-input" onChange={this.props.handleChecks} checked={this.props.amenities.balcony}/>
                <label htmlFor="balcony" className="amenity-label">Balcón</label>
              </div>
              <div className="amenity-info">
                <input id="securitySystem" name="security_system" type="checkbox" className="amenity-input" onChange={this.props.handleChecks} checked={this.props.amenities.security_system}/>
                <label htmlFor="securitySystem" className="amenity-label">Cámaras de Seguridad</label>
              </div>
              <div className="amenity-info">
                <input id="family-room" name="family_room" type="checkbox" className="amenity-input" onChange={this.props.handleChecks} checked={this.props.amenities.family_room}/>
                <label htmlFor="family-room" className="amenity-label">Family Room</label>
              </div>
              <div className="amenity-info">
                <input id="central-gas" name="shared_gas" type="checkbox" className="amenity-input" onChange={this.props.handleChecks} checked={this.props.amenities.shared_gas}/>
                <label htmlFor="central-gas" className="amenity-label">Gas Común</label>
              </div>
              <div className="amenity-info">
                <input id="gym" type="checkbox" name="gym" className="amenity-input" onChange={this.props.handleChecks} checked={this.props.amenities.gym}/>
                <label htmlFor="gym" className="amenity-label">Gimnasio</label>
              </div>
              <div className="amenity-info">
                <input id="service-room"  name="service_room" type="checkbox" className="amenity-input" onChange={this.props.handleChecks} checked={this.props.amenities.service_room}/>
                <label htmlFor="service-room" className="amenity-label">Habitación de Servicio</label>
              </div>
              <div className="amenity-info">
                <input id="jacuzzi" name="jacuzzy" type="checkbox" className="amenity-input" onChange={this.props.handleChecks} checked={this.props.amenities.jacuzzy}/>
                <label htmlFor="jacuzzi" className="amenity-label">Jacuzzi</label>
              </div>
              <div className="amenity-info">
                <input id="lobby" name="lobby" type="checkbox" className="amenity-input" onChange={this.props.handleChecks} checked={this.props.amenities.lobby}/>
                <label htmlFor="lobby" className="amenity-label">Lobby</label>
              </div>
              <div className="amenity-info">
                <input id="pool" name="swimming_pool" type="checkbox" className="amenity-input" onChange={this.props.handleChecks} checked={this.props.amenities.swimming_pool}/>
                <label htmlFor="pool" className="amenity-label">Piscina</label>
              </div>
              <div className="amenity-info">
                <input id="hardwoodFloor" name="hardwood_floor" type="checkbox" className="amenity-input" onChange={this.props.handleChecks} checked={this.props.amenities.hardwood_floor}/>
                <label htmlFor="hardwoodFloor" className="amenity-label">Piso de Madera</label>
              </div>
              <div className="amenity-info">
                <input id="floor" name="marble_floor" type="checkbox" className="amenity-input" onChange={this.props.handleChecks} checked={this.props.amenities.marble_floor}/>
                <label htmlFor="floor" className="amenity-label">Piso de Marmol</label>
              </div>
              <div className="amenity-info">
                <input id="power-plant" name="power_plant" type="checkbox" className="amenity-input" onChange={this.props.handleChecks} checked={this.props.amenities.power_plant}/>
                <label htmlFor="power-plant" className="amenity-label">Planta Eléctrica</label>
              </div>
              <div className="amenity-info">
                <input id="security" name="security" type="checkbox" className="amenity-input" onChange={this.props.handleChecks} checked={this.props.amenities.security}/>
                <label htmlFor="security" className="amenity-label">Seguridad 24/7</label>
              </div>
              <div className="amenity-info">
                <input id="wi-closet" name="walk_in_closet" type="checkbox" className="amenity-input" onChange={this.props.handleChecks} checked={this.props.amenities.walk_in_closet}/>
                <label htmlFor="wi-closet" className="amenity-label">Walk In Closet</label>
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="listing-description listing-container">
            <h3>Descripción Detallada</h3>
            <p>Destacar caracteristicas como renovaciones, remodelaciones o cualquier detalle importante sobre la propiedad.</p>
            <div className="text-area-container">
              <textarea value={this.props.listing.description} name="description" rows="6" onChange={this.props.handleChange('description')}/>
            </div>
          </div>
          {/* Photos */}
          <div className="listing-photos listing-container">
            <h3>Fotos de la Propiedad</h3>
            <p>Subir imagenes en formato: jpg, png o jpeg. Propiedades con fotos de calidad llaman más la atención</p>
            <div className="upload-container">
              <Dropzone onDrop={this.props.handleDrop} accept="image/*" multiple>
                {({getRootProps, getInputProps}) => (
                  <div {...getRootProps()} className="upload-component">
                    <input {...getInputProps()}/>
                    <span><i className="far fa-images"></i></span>
                    <p>Arrastrar fotos o haz click para seleccionar.</p>
                  </div>
                )}
              </Dropzone>
              <div className="image-preview">
                {this.props.imageFiles.map(image => (
                  <div className="thumb" key={image.original_name || image.name}>
                    <div className="thumb-inner">
                      <img src={image.location}/>
                      <span className="remove-image">
                        <i className="fas fa-trash-alt" onClick={this.props.handleRemove(image.original_name || image.name)}></i>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="listing-edit-action">
            <button type="submit" className="update-listing">Guardar Cambios</button>
            <button type="button" className="delete-listing" onClick={this.props.onDeleteClick}>Eliminar Propiedad</button>
          </div>
        </form>
      )
    }
  }
}


export default ListingEditForm