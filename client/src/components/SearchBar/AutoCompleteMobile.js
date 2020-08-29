import React from 'react';
import PropTypes from 'prop-types';
import AutocompleteText from './AutoCompleteText';
import './AutoCompleteMobile.css';
// import { withRouter } from "react-router-dom";

class AutoCompleteMobile extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focus();
    // this.textInput.current.select();
    // console.log(this.props.location.search);
    
  }

  render() {
    return (
      <div className="autocomplete-mobile-container">
        <div className="autocomplete-mobile-input-container">
          <AutocompleteText refProp={this.textInput}
                            onCloseMobileSearchClick={this.props.onCloseMobileSearchClick}
                            initialStateSearch={this.props.initialStateSearch}
                            search={this.props.search}/>
        </div>
      </div>
    )
  }

}

export default AutoCompleteMobile;