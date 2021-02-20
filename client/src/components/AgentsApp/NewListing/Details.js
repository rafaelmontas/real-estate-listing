import React from 'react'
import Select from 'react-select'

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


class Details extends React.Component {
  constructor(props) {
    super(props)
  }
  handleBedroomChange = (optionSelected) => {
    console.log(optionSelected)
    this.props.handleChange('bedrooms', optionSelected.value)
  }
  handleBathroomChange = (optionSelected) => {
    console.log(optionSelected)
    this.props.handleChange('bathrooms', optionSelected.value)
  }
  render() {
    return (
      <div className="details-info-container">
        <div className="listing-beds-baths-mts listing-container">
          <div className="listing-options">
            <label>Habitaciones</label>
            <Select
              options={bedOptions}
              placeholder="Seleccionar..."
              onChange={this.handleBedroomChange}
              isSearchable={false}/>
          </div>
          <div className="listing-options">
            <label>Baños</label>
            <Select
              options={bathOptions}
              placeholder="Seleccionar..."
              onChange={this.handleBathroomChange}
              isSearchable={false}/>
          </div>
          <div className="listing-options">
            <label>Metros Cuadrados</label>
            <div className="mts-option">
              <input id="mts-input"/>
              <label for="mts-input">Mts2</label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Details