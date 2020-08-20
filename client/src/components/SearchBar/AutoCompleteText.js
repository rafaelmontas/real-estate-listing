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
      suggestions: this.itemsOptions,
      text: '',
      activeOption: -1,
      suggestionsOpen: false,
    }
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.hanldeKeyPressed = this.hanldeKeyPressed.bind(this);
    this.handleOptionsHover = this.handleOptionsHover.bind(this);
    this.suggestionSelected = this.suggestionSelected.bind(this);
  }

  onTextChange = (e) => {
    const value = e.target.value;
    if(value.length === 0) {
      this.setState(() => ({suggestions: this.itemsOptions, text: value, activeOption: -1}))
    } else {
      const regex = new RegExp(`${value}`, 'i');
      const suggestions = this.itemsOptions.sort(v => v.sector).filter(v => regex.test(v.sector));
      this.setState(() => ({suggestions, text: value, activeOption: -1}), () => console.log(this.state.suggestions));
    }
  }

  suggestionSelected(value) {
    this.setState({
      text: value,
      activeOption: -1,
      suggestions: this.itemsOptions,
    }, () => {
      const listingType = this.props.initialStateSearch.listing_type == null ? "For Sale" : this.props.initialStateSearch.listing_type;
      const minPrice = this.props.initialStateSearch.minPrice == null ? 0 : this.props.initialStateSearch.minPrice;
      const maxPrice = this.props.initialStateSearch.maxPrice == null ? 2000000 : this.props.initialStateSearch.maxPrice;
      const bedrooms = this.props.initialStateSearch.bedrooms == null ? 0 : this.props.initialStateSearch.bedrooms;
      const bathrooms = this.props.initialStateSearch.bathrooms == null ? 0 : this.props.initialStateSearch.bathrooms;
      const propertyType = this.props.initialStateSearch.property_type == null ? ["Apartment", "House", "Villa", "Comercial", "Industrial", "Penthouse"] : this.props.initialStateSearch.property_type;
      this.props.search(this.state.text, listingType, minPrice, maxPrice, bedrooms, bathrooms, propertyType)
    })
    // this.props.search("For Sale", 0, 2000000, 0, 0, ["Apartment", "House", "Villa"])
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if(suggestions.length === 0) {
      return null
    }
    return (
      <ul id="hauzzy-suggestions" tabIndex={-1} rol="listbox">
        {suggestions.map((item, index) => {
          return (
            <div key={index} className={index === this.state.activeOption ? "autocomplete-option autocomplete-option-selected" : "autocomplete-option"}
                             onMouseDown={() => this.suggestionSelected(item.sector)}
                             onMouseEnter={this.handleOptionsHover}
                             tabIndex={-1}
                             rol="option">
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

  handleOptionsHover() {
    this.setState({activeOption: -1})
  }

  hanldeKeyPressed(e) {
    console.log(e.keyCode);
    console.log(e.target);
    // User pressed the enter key, update the input and close the suggestions
    if(e.keyCode === 13) {
      if(e.target.value.length != 0 || this.state.activeOption != -1) {
        if(this.state.activeOption === -1) {
          this.setState({
            text: this.state.suggestions[0].sector,
            activeOption: -1
          });  
        } else {
          this.setState({
            text: this.state.suggestions[this.state.activeOption].sector,
            activeOption: -1
          }, () => {
            const listingType = this.props.initialStateSearch.listing_type == null ? "For Sale" : this.props.initialStateSearch.listing_type;
            const minPrice = this.props.initialStateSearch.minPrice == null ? 0 : this.props.initialStateSearch.minPrice;
            const maxPrice = this.props.initialStateSearch.maxPrice == null ? 2000000 : this.props.initialStateSearch.maxPrice;
            const bedrooms = this.props.initialStateSearch.bedrooms == null ? 0 : this.props.initialStateSearch.bedrooms;
            const bathrooms = this.props.initialStateSearch.bathrooms == null ? 0 : this.props.initialStateSearch.bathrooms;
            const propertyType = this.props.initialStateSearch.property_type == null ? ["Apartment", "House", "Villa", "Comercial", "Industrial", "Penthouse"] : this.props.initialStateSearch.property_type;
            this.props.search(this.state.text, listingType, minPrice, maxPrice, bedrooms, bathrooms, propertyType)
          });
        }
        // this.props.search(thi.state.text, "For Sale", 0, 2000000, 0, 0, ["Apartment", "House", "Villa"])
      }
      return e.target.blur();
    }
    // User pressed the up arrow, decrement the index
    else if(e.keyCode === 38) {
      if(this.state.activeOption === -1) {
        return;
      } else {
        this.setState({activeOption: this.state.activeOption - 1})
      }
    }
    // User pressed the down arrow, increment index
    else if(e.keyCode === 40) {
      if(this.state.activeOption + 1 === this.state.suggestions.length) {
        return;
      } else {
        this.setState({activeOption: this.state.activeOption + 1})
      }
    }
  }

  render() {
    return (
      <div className="autocomplete-container">
        <div className="input-autocomplete">
          <input value={this.state.text} onFocus={this.handleInputFocus}
                                          onBlur={this.handleInputBlur}
                                          onChange={this.onTextChange}
                                          type="text"
                                          placeholder="Provincia, Sector..."
                                          onKeyDown={this.hanldeKeyPressed}
                                          aria-autocomplete="list"
                                          aria-controls="hauzzy-suggestions" />
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