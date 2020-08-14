import React from 'react';
import PropTypes from 'prop-types';
import './AutoCompleteText.css';

class AutoCompleteText extends React.Component {
  constructor(props) {
    super(props);
    this.items = [
      'Distrito Nacional',
      'Ensanche Naco',
      'Piantini',
      'Bella Vista',
      'Evaristo Morales'
    ];
    this.state = {
      suggestions: [],
      text: '',
      suggestionsOpen: false,
    }
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
  }

  onTextChange = (e) => {
    const value = e.target.value;
    if(value.length === 0) {
      this.setState(() => ({suggestions: [], text: value}))
    } else {
      const regex = new RegExp(`${value}`, 'i');
      const suggestions = this.items.sort().filter(v => regex.test(v));
      this.setState(() => ({suggestions, text: value}))
    }
  }

  suggestionSelected(value) {
    this.setState(() => ({
      text: value,
      suggestions: [],
      // suggestionsOpen: false,
    }))
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if(suggestions.length === 0) {
      return null
    }
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <div key={index} className="autocomplete-option" onMouseDown={() => this.suggestionSelected(item)}>
              <i className="fas fa-search"></i>
              <li>{item}</li>
            </div>
          )
        })}
      </ul>
    );
  }

  handleInputFocus() {
    this.setState({suggestionsOpen: true});
  }
  handleInputBlur() {
    this.setState({suggestionsOpen: false})
  }

  render() {
    return (
      <div className="autocomplete-container">
        <div className="input-autocomplete">
          <input value={this.state.text} onFocus={this.handleInputFocus}
                                          onBlur={this.handleInputBlur}
                                          onChange={this.onTextChange}
                                          type="text"
                                          placeholder="Provincia, Sector..."/>
          <button><i className="fas fa-search"></i></button>
        </div>
        <div className={this.state.suggestionsOpen ? "autocomplete-suggestions open" : "autocomplete-suggestions"}>
          {this.renderSuggestions()}
        </div>
      </div>
    )
  }
}

export default AutoCompleteText;