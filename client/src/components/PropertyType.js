import React from 'react';
import PropTypes from 'prop-types';


class PropertyType extends React.Component {
  
  componentDidMount() {
    console.log(this.props.propertyTypes)
  }

  render() {
    return (
      <fieldset className="property-types">
        <legend>Tipo de propiedad</legend>
        <div className="check-options">
          <ul className="options">
            <li>
              <label>
                <input type="checkbox"
                        name="Apartment"
                        checked={this.props.propertyTypes["Apartment"]}
                        onChange={this.props.onChecks}/>
                Apartamentos
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="House" checked={this.props.propertyTypes["House"]}
                onChange={this.props.onChecks}/>
                Casas
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox"
                        name="Villa"
                        checked={this.props.propertyTypes["Villa"]}
                        onChange={this.props.onChecks}/>
                Villas
              </label>
            </li>
          </ul>
          <ul className="options">
            <li>
              <label>
                <input type="checkbox"
                        name="Comercial"
                        checked={this.props.propertyTypes["Comercial"]}
                        onChange={this.props.onChecks}/>
                Locales
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox"
                        name="Industrial"
                        checked={this.props.propertyTypes["Industrial"]}
                        onChange={this.props.onChecks}/>
                Naves
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox"
                        name="Penthouse"
                        checked={this.props.propertyTypes["Penthouse"]}
                        onChange={this.props.onChecks}/>
                Penthouse
              </label>
            </li>
          </ul>
        </div>
      </fieldset>
    )
  }
}

PropertyType.propTypes = {
  onChecks: PropTypes.func.isRequired
}

export default PropertyType;