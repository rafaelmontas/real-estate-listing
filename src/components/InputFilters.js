import React from "react";
import "./InputFilters.css";


const bedValues = [0, 1, 2, 3, 4, 5];
const bathValues = [0, 1, 2, 3, 4, 5];

class InputFilters extends React.Component {

  render() {
    return (
      <div className={this.props.show ? "exposed-popover more-filters open" : "exposed-popover more-filters"}>
        <div className="container">
          <div className="top">
            <header className="header">
              <div className="reset"><span>Restaurar</span></div>
              <div className="label"><h1>Filtros</h1></div>
              <div className="close"><span onClick={this.props.onCloseClick}><i className="fas fa-times"></i></span></div>
            </header>
            <div className="main-options">
              <fieldset className="beds-filter">
                <legend>Habitaciones</legend>
                <div className="radio-options">
                  {bedValues.map(value => {
                    return (
                      <label key={value}className={this.props.bedOptionSelected === value ? "label-button labels selected" : "label-button labels"}>
                        {value === 0 ? "Todas" : value}
                        <input type="radio" name="beds-options" value={value} onChange={this.props.onBedsClick}/>
                      </label>
                    )
                  })}
                </div>
              </fieldset>
              <fieldset className="bath-filter">
                <legend>Baños</legend>
                <div className="radio-options">
                  {bathValues.map(value => {
                    return (
                      <label key={value}className={this.props.bathOptionSelected === value ? "label-button labels selected" : "label-button labels"}>
                        {value === 0 ? "Todas" : `${value}+`}
                        <input type="radio" name="bath-options" value={value} onChange={this.props.onBathClick}/>
                      </label>
                    )
                  })}
                </div>
              </fieldset>
            </div>
          </div>
          <div className="bottom">
            <div className="bottom-options">
              <PropertyType onChecks={this.props.onChecks}
                            housesSelected={this.props.housesSelected}
                            apartmentsSelected={this.props.apartmentsSelected}
                            villasSelected={this.props.villasSelected}
                            comercialSelected={this.props.comercialSelected}
                            industrialSelected={this.props.industrialSelected}
                            penthouseSelected={this.props.penthouseSelected}/>
            </div>
          </div>
          <div className="bottom-fixed">
            <span id="save-search">
            <i className="far fa-bell"></i>
              Guardar Busqueda
            </span>
            <span id="search">Ver Resultados</span>
          </div>
        </div>
      </div>
    )
  }
}

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

export {InputFilters, PropertyType};