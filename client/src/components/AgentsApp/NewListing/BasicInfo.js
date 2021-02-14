import React from 'react'

const listingTypes = ['apartment', 'house', 'villa', 'penthouse', 'comercial', 'industrial']

class BasicInfo extends React.Component {
  render() {
    return (
      <div className="basic-info-container">
        <h3>Información basica sobre la propiedad</h3>
        <p>Si tienes alguna duda o inconveniente, solo tienes que escribirnos por el chat.</p>
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
                  <label key={value}className={this.props.propertyType === value ? "type-option selected" : "type-option"}>
                    {valueLabel}
                    <input type="radio" name="propertyType" value={value} onChange={this.props.handleChange('propertyType')}/>
                  </label>
                )
              })}
            </fieldset>
          </div>
        </div>
      </div>
    )
  }
}

export default BasicInfo