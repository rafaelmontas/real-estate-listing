import React from 'react';
import PropTypes from 'prop-types';


class PropertyType extends React.Component {
  render() {
    return (
      <fieldset className="property-types">
        <legend>Tipo de propiedad</legend>
        <div className="check-options">
          <ul className="options">
            <li>
              <label>
                <input type="checkbox"
                        name="apartmentsSelected"
                        checked={this.props.apartmentsSelected}
                        onChange={this.props.onChecks}/>
                Apartamentos
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="housesSelected" checked={this.props.housesSelected}
                onChange={this.props.onChecks}/>
                Casas
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox"
                        name="villasSelected"
                        checked={this.props.villasSelected}
                        onChange={this.props.onChecks}/>
                Villas
              </label>
            </li>
          </ul>
          <ul className="options">
            <li>
              <label>
                <input type="checkbox"
                        name="comercialSelected"
                        checked={this.props.comercialSelected}
                        onChange={this.props.onChecks}/>
                Locales
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox"
                        name="industrialSelected"
                        checked={this.props.industrialSelected}
                        onChange={this.props.onChecks}/>
                Naves
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox"
                        name="penthouseSelected"
                        checked={this.props.penthouseSelected}
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
  onChecks: PropTypes.func.isRequired,
  housesSelected: PropTypes.bool.isRequired,
  apartmentsSelected: PropTypes.bool.isRequired,
  villasSelected: PropTypes.bool.isRequired,
  comercialSelected: PropTypes.bool.isRequired,
  industrialSelected: PropTypes.bool.isRequired,
  penthouseSelected: PropTypes.bool.isRequired
}

export default PropertyType;