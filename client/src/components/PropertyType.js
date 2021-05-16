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
                        name="apartment"
                        checked={this.props.propertyTypes["apartment"]}
                        onChange={this.props.onChecks}/>
                Apartamentos
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="house" checked={this.props.propertyTypes["house"]}
                onChange={this.props.onChecks}/>
                Casas
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox"
                        name="villa"
                        checked={this.props.propertyTypes["villa"]}
                        onChange={this.props.onChecks}/>
                Villas
              </label>
            </li>
          </ul>
          <ul className="options">
            {/* <li>
              <label>
                <input type="checkbox"
                        name="comercial"
                        checked={this.props.propertyTypes["comercial"]}
                        onChange={this.props.onChecks}/>
                Locales
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox"
                        name="industrial"
                        checked={this.props.propertyTypes["industrial"]}
                        onChange={this.props.onChecks}/>
                Naves
              </label>
            </li> */}
            <li>
              <label>
                <input type="checkbox"
                        name="penthouse"
                        checked={this.props.propertyTypes["penthouse"]}
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