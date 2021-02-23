import React from 'react'
import Select from 'react-select'
import AsyncSelect from 'react-select/async';

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
    this.props.handleSelectChange('bedrooms', optionSelected.value)
  }
  handleBathroomChange = (optionSelected) => {
    console.log(optionSelected)
    this.props.handleSelectChange('bathrooms', optionSelected.value)
  }
  filterColors = (inputValue) => {
    return bedOptions.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  loadOptions = (inputValue, callback) => {
    console.log("getting dropdown options from api...");
    setTimeout(() => {
      callback(this.filterColors(inputValue));
    }, 1000);
  };
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
              isSearchable={false}
              value={this.props.bedrooms && {label: `${this.props.bedrooms}`, value: `${this.props.bedrooms}`}}/>
          </div>
          <div className="listing-options">
            <label>Baños</label>
            <Select
              options={bathOptions}
              placeholder="Seleccionar..."
              onChange={this.handleBathroomChange}
              isSearchable={false}
              value={this.props.bathrooms && {label: `${this.props.bathrooms}`, value: `${this.props.bathrooms}`}}/>
          </div>
          <div className="listing-options">
            <label>Metros Cuadrados</label>
            <div className="mts-option">
              <input id="mts-input"
                     type="text"
                     pattern="[0-9]+"
                     onChange={this.props.handleChange('mts')}
                     value={this.props.listingMts === null ? '' : this.props.listingMts}/>
              <label htmlFor="mts-input">Mts2</label>
            </div>
          </div>
          <div className="listing-options">
            <label>Precio</label>
            <div className="price-option">
              <input id="price-input"
                     type="text"
                     pattern="[0-9]+"
                     onChange={this.props.handleChange('price')}
                     value={this.props.listingPrice === null ? '' : this.props.listingPrice}/>
              <label htmlFor="price-input">US$</label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Details