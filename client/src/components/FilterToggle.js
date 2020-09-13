import React from 'react';
import PropTypes from 'prop-types';

class FilterToggle extends React.Component {
  render() {
    return (
      <button onClick={this.props.onFiltersClick}>
        Filtros
        <i className="fas fa-angle-down"></i>
      </button>
    )
  }
}

FilterToggle.propTypes = {
  onFiltersClick: PropTypes.func.isRequired
}

export default FilterToggle;