import React from 'react'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'

const listingTypes = ['apartment', 'house', 'villa', 'penthouse']

class BasicInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="basic-info-container">
        <h3>Información basica sobre la propiedad</h3>
        <p>Si tienes alguna duda o inconveniente, solo tienes que escribirnos por el chat.</p>
        <div className="property-address listing-container">
          <h3>Ubicación de la Propiedad</h3>
          <div className="location-info">
            <div className="listing-options">
              <label htmlFor="prov-input">Provincia</label>
              <div className="prov-option">
                <input id="prov-input"
                      type="text"
                      onChange={this.props.handleChange('propertyProvince')}
                      value={this.props.propertyProvince}
                      />
              </div>
            </div>
            <div className="listing-options">
              <label htmlFor="sect-input">Sector</label>
              <div className="sect-option">
                <input id="sect-input"
                      type="text"
                      onChange={this.props.handleChange('propertySector')}
                      value={this.props.propertySector}
                      />
              </div>
            </div>
          </div>
          {/* <div className="address-info">
            <div className="listing-options">
              <label for="searchInpt">Nombre de la calle</label>
              <PlacesAutocomplete 
                value={this.props.propertyAddress}
                onChange={this.props.handleAddressChange}
                onSelect={this.props.handleSelect}
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
                              {suggestion.description.replace(', República Dominicana', '')}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}                                
              </PlacesAutocomplete>
            </div>
            <div className="listing-options">
              <label htmlFor="stnumber">Número</label>
              <input id="stnumber"
                      type="number"
                      min="1"
                      onChange={this.props.handleChange('streetNumber')}
                      value={this.props.streetNumber}
                      />
            </div>
            <div className="address-text">
              <p>
                <i className="fas fa-exclamation-circle"></i>
                Nombre y número de calle necesarios para verificar la autenticidad de la publicación</p>
            </div>
            <div className="hide-option">
              <input id="hideAddress" name="hideAddress" type="checkbox" className="hide-address"
                     onChange={this.props.onHide} checked={this.props.hideAddress}
                     />
              <label htmlFor="hideAddress" className="hide-label">Ocultar dirección al público</label>
            </div>
          </div> */}
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
                    <input type="radio" name="propertyType" value={value} onChange={this.props.handleChange('propertyType')}/>
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
                <input type="radio" name="listingType" value="sale" onChange={this.props.handleChange('listingType')}/>
              </label>
              <label className={this.props.listingType === 'rent' ? "type-option selected" : "type-option"}>
                Alquiler
                <input type="radio" name="listingType" value="rent" onChange={this.props.handleChange('listingType')}/>
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BasicInfo