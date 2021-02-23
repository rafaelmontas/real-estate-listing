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
const parkingOptions = [
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

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleBedroomChange = (optionSelected) => {
    console.log(optionSelected)
    this.props.handleSelectChange('bedrooms', optionSelected.value)
  }
  handleBathroomChange = (optionSelected) => {
    console.log(optionSelected)
    this.props.handleSelectChange('bathrooms', optionSelected.value)
  }
  handleParkingChange = (optionSelected) => {
    console.log(optionSelected)
    this.props.handleSelectChange('parking', optionSelected.value)
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
            <label>Parqueos</label>
            <Select
              options={parkingOptions}
              placeholder="Seleccionar..."
              onChange={this.handleParkingChange}
              isSearchable={false}
              value={this.props.parking && {label: `${this.props.parking}`, value: `${this.props.parking}`}}/>
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
        <div className="listing-amenities listing-container">
          <h3>Amenidades</h3>
          <div className="checkbox-container">
            <div className="amenity-info">
              <input id="1/2" name="halfBath" type="checkbox" className="amenity-input" onChange={this.props.onChecks} checked={this.props.amenities.halfBath}/>
              <label htmlFor="1/2" className="amenity-label">1/2 Baño</label>
            </div>
            <div className="amenity-info">
              <input id="a/c" name="aC" type="checkbox" className="amenity-input" onChange={this.props.onChecks} checked={this.props.amenities.aC}/>
              <label htmlFor="a/c" className="amenity-label">Aire Acondicionado</label>
            </div>
            <div className="amenity-info">
              <input id="games-zone" name="gameZone" type="checkbox" className="amenity-input" onChange={this.props.onChecks} checked={this.props.amenities.gameZone}/>
              <label htmlFor="games-zone" className="amenity-label">Área de Juegos</label>
            </div>
            <div className="amenity-info">
              <input id="laundry-room" name="laundryRoom" type="checkbox" className="amenity-input" onChange={this.props.onChecks} checked={this.props.amenities.laundryRoom}/>
              <label htmlFor="laundry-room" className="amenity-label">Área de Lavado</label>
            </div>
            <div className="amenity-info">
              <input id="social-area" name="socialArea" type="checkbox" className="amenity-input" onChange={this.props.onChecks} checked={this.props.amenities.socialArea}/>
              <label htmlFor="social-area" className="amenity-label">Área Social</label>
            </div>
            <div className="amenity-info">
              <input id="elevator" name="elevator" type="checkbox" className="amenity-input" onChange={this.props.onChecks} checked={this.props.amenities.elevator}/>
              <label htmlFor="elevator" className="amenity-label">Ascensor</label>
            </div>
            <div className="amenity-info">
              <input id="balcony" name="balcony" type="checkbox" className="amenity-input" onChange={this.props.onChecks} checked={this.props.amenities.balcony}/>
              <label htmlFor="balcony" className="amenity-label">Balcón</label>
            </div>
            <div className="amenity-info">
              <input id="family-room" name="familyRoom" type="checkbox" className="amenity-input" onChange={this.props.onChecks} checked={this.props.amenities.familyRoom}/>
              <label htmlFor="family-room" className="amenity-label">Family Room</label>
            </div>
            <div className="amenity-info">
              <input id="central-gas" name="centralGas" type="checkbox" className="amenity-input" onChange={this.props.onChecks} checked={this.props.amenities.centralGas}/>
              <label htmlFor="central-gas" className="amenity-label">Gas Común</label>
            </div>
            <div className="amenity-info">
              <input id="gym" type="checkbox" name="gym" className="amenity-input" onChange={this.props.onChecks} checked={this.props.amenities.gym}/>
              <label htmlFor="gym" className="amenity-label">Gimnasio</label>
            </div>
            <div className="amenity-info">
              <input id="service-room"  name="serviceRoom" type="checkbox" className="amenity-input" onChange={this.props.onChecks} checked={this.props.amenities.serviceRoom}/>
              <label htmlFor="service-room" className="amenity-label">Habitación de Servicio</label>
            </div>
            <div className="amenity-info">
              <input id="jacuzzi" name="jacuzzy" type="checkbox" className="amenity-input" onChange={this.props.onChecks} checked={this.props.amenities.jacuzzy}/>
              <label htmlFor="jacuzzi" className="amenity-label">Jacuzzi</label>
            </div>
            <div className="amenity-info">
              <input id="lobby" name="lobby" type="checkbox" className="amenity-input" onChange={this.props.onChecks} checked={this.props.amenities.lobby}/>
              <label htmlFor="lobby" className="amenity-label">Lobby</label>
            </div>
            <div className="amenity-info">
              <input id="pool" name="pool" type="checkbox" className="amenity-input" onChange={this.props.onChecks} checked={this.props.amenities.pool}/>
              <label htmlFor="pool" className="amenity-label">Piscina</label>
            </div>
            <div className="amenity-info">
              <input id="floor" name="floor" type="checkbox" className="amenity-input" onChange={this.props.onChecks} checked={this.props.amenities.floor}/>
              <label htmlFor="floor" className="amenity-label">Piso de Marmol</label>
            </div>
            <div className="amenity-info">
              <input id="power-plant" name="powerPlant" type="checkbox" className="amenity-input" onChange={this.props.onChecks} checked={this.props.amenities.powerPlant}/>
              <label htmlFor="power-plant" className="amenity-label">Planta Eléctrica</label>
            </div>
            <div className="amenity-info">
              <input id="security" name="security" type="checkbox" className="amenity-input" onChange={this.props.onChecks} checked={this.props.amenities.security}/>
              <label htmlFor="security" className="amenity-label">Seguridad 24/7</label>
            </div>
            <div className="amenity-info">
              <input id="wi-closet" name="wiCloset" type="checkbox" className="amenity-input" onChange={this.props.onChecks} checked={this.props.amenities.wiCloset}/>
              <label htmlFor="wi-closet" className="amenity-label">Walk In Closet</label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Details