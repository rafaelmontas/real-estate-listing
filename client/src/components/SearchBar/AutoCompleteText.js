import React from 'react';
import PropTypes from 'prop-types';
import './AutoCompleteText.css';

class AutoCompleteText extends React.Component {
  constructor(props) {
    super(props);
    this.itemsOptions = [
      {
        province: 'Distrito Nacional',
        sector: 'Ensanche Naco',
        type: 'sector'
      },
      {
        province: 'Distrito Nacional',
        sector: 'Piantini',
        type: 'sector'
      },
      {
        province: 'Distrito Nacional',
        sector: 'Bella Vista',
        type: 'sector'
      },
      {
        province: 'Distrito Nacional',
        sector: 'Evaristo Morales',
        type: 'sector'
      }
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
      const suggestions = this.itemsOptions.sort(v => v.sector).filter(v => regex.test(v.sector));
      this.setState(() => ({suggestions, text: value}), () => console.log(this.state.suggestions));
    }
  }

  suggestionSelected(value) {
    this.setState(() => ({
      text: value,
      suggestions: [],
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
            <div key={index} className="autocomplete-option" onMouseDown={() => this.suggestionSelected(item.sector)}>
              <div className="option-logo-text">
                <i className="fas fa-search"></i>
                <div className="option-text">
                  <li>{item.sector}</li>
                  <span>{item.province}</span>
                </div>
              </div>
              <span>{item.type}</span>
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