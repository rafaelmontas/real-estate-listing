import React from "react";
import "./InputFilters.css";
import PropTypes from 'prop-types';
import PropertyType from './PropertyType';
import LoadingButton from './LoadingButton';


const bedValues = [0, 1, 2, 3, 4, 5];
const bathValues = [0, 1, 2, 3, 4, 5];

class InputFilters extends React.Component {

  render() {
    return (
      <div className={this.props.show ? "exposed-popover more-filters open" : "exposed-popover more-filters"}>
        <div className="container">
          <div className="top">
            <header className="header">
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
            <LoadingButton status={this.props.status} onCloseClick={this.props.onCloseClick}/>
          </div>
        </div>
      </div>
    )
  }
}


InputFilters.propTypes = {
  show: PropTypes.bool.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  bedOptionSelected: PropTypes.number.isRequired,
  onBedsClick: PropTypes.func.isRequired,
  bathOptionSelected: PropTypes.number.isRequired,
  onBathClick: PropTypes.func.isRequired,
  onChecks: PropTypes.func.isRequired,
  housesSelected: PropTypes.bool.isRequired,
  apartmentsSelected: PropTypes.bool.isRequired,
  villasSelected: PropTypes.bool.isRequired,
  comercialSelected: PropTypes.bool.isRequired,
  industrialSelected: PropTypes.bool.isRequired,
  penthouseSelected: PropTypes.bool.isRequired,
  status: PropTypes.bool.isRequired
}

export default InputFilters;