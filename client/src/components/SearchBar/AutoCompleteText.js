import React from 'react';
import PropTypes from 'prop-types';
import './AutoCompleteText.css';
import { withRouter } from "react-router-dom";
import queryString from 'query-string'

import { sectorsProvinces } from '../../utils/SectorsProvinces';

import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border: 3px solid #fff;
  border-bottom-color: transparent;
`;

class AutoCompleteText extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    // this.textInput = React.createRef();
    // this.itemsOptions = [
    //   {
    //     province: 'Distrito Nacional',
    //     sector: 'Ensanche Naco',
    //     type: 'sector'
    //   },
    //   {
    //     province: 'Distrito Nacional',
    //     sector: 'Piantini',
    //     type: 'sector'
    //   },
    //   {
    //     province: 'Distrito Nacional',
    //     sector: 'Bella Vista',
    //     type: 'sector'
    //   },
    //   {
    //     province: 'Distrito Nacional',
    //     sector: 'Evaristo Morales',
    //     type: 'sector'
    //   }
    // ];
    this.state = {
      suggestions: sectorsProvinces.slice(0, 3),
      text: '',
      activeOption: -1,
      suggestionsOpen: false,
    }
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.hanldeKeyPressed = this.hanldeKeyPressed.bind(this);
    this.handleOptionsHover = this.handleOptionsHover.bind(this);
    this.suggestionSelected = this.suggestionSelected.bind(this);
    this.bottomSuggestionSelected = this.bottomSuggestionSelected.bind(this);
  }

  componentDidMount() {
    const sectorQ = queryString.parse(this.props.location.search).sector
    console.log(typeof sectorQ)
    if (typeof sectorQ !== "undefined" && sectorQ !== "All") {
      this.setState({text: sectorQ})
    }
    console.log("mounted!")
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.initialStateSearch.sector !== prevProps.initialStateSearch.sector && this.props.location.pathname === "/properties" && prevProps.initialStateSearch !== null) {
      // if backbutton clicked from search to /properties
      if(this.props.initialStateSearch.sector === undefined) {
        console.log("worked");
        this.setState({text: ''});  
      } else {
        console.log("worked");
        this.setState({text: this.props.initialStateSearch.sector});
      }
    }
    Object.entries(this.props).forEach(([key, val]) =>
      prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
    if (this.state) {
      Object.entries(this.state).forEach(([key, val]) =>
        prevState[key] !== val && console.log(`State '${key}' changed`)
      );
    }
    console.log(prevProps.initialStateSearch, prevProps.loadingStatus)
    console.log(this.props.initialStateSearch, this.props.loadingStatus)
    console.log(prevProps.location.search, this.props.location.search)

    // if(prevProps.location.search === "") {
    //   console.log("Empty search!")
    // }
    // if(this.props.location.search !== "") {
    //   const {bathrooms, bedrooms, listing_type, maxPrice, minPrice, property_type, sector} = queryString.parse(prevProps.location.search);
    //   this.prevBathrooms = bathrooms;
    //   this.prevBedrooms = bedrooms;
    //   this.prevListingType = listing_type;
    //   this.prevMaxPrice = maxPrice;
    //   this.prevMinPrice = minPrice;
    //   this.prevPropertyType = property_type;
    //   this.prevSector = sector;
    // }
    if (this.props.location.search !== prevProps.location.search && this.props.location.pathname !== "/properties") {
      const {bathrooms, bedrooms, listing_type, maxPrice, minPrice, property_type, sector} = queryString.parse(prevProps.location.search);
      this.prevBathrooms = bathrooms;
      this.prevBedrooms = bedrooms;
      this.prevListingType = listing_type;
      this.prevMaxPrice = maxPrice;
      this.prevMinPrice = minPrice;
      this.prevPropertyType = property_type;
      this.prevSector = sector;
      console.log("Route changed!", prevProps.location, this.props.location)
    } else if (this.props.location.search === prevProps.location.search && this.props.location.pathname !== "/properties") {
      this.prevBathrooms = 0;
      this.prevBedrooms = 0;
      this.prevListingType = "sale";
      this.prevMaxPrice = 2000000;
      this.prevMinPrice = 0;
      this.prevPropertyType = ["apartment", "house", "villa", "penthouse"];
      this.prevSector = this.state.text;
      console.log("Without filters", prevProps.location, this.props.location)
    }
    // if (this.state.text === "" && prevState.text !== "") {
    //   this.setState({text: prevState})
    // }
    console.log(this.state.text)
    console.log(prevProps.location, this.props.location)
    console.log("logging", prevProps, this.prevBedrooms)
  }

  componentWillUnmount(prevProps) {
    // if (this.props.location.search !== prevProps.location.search && this.props.location.pathname !== "/properties") {
    //   const {bathrooms, bedrooms, listing_type, maxPrice, minPrice, property_type, sector} = queryString.parse(prevProps.location.search);
    //   this.prevBathrooms = bathrooms;
    //   this.prevBedrooms = bedrooms;
    //   this.prevListingType = listing_type;
    //   this.prevMaxPrice = maxPrice;
    //   this.prevMinPrice = minPrice;
    //   this.prevPropertyType = property_type;
    //   this.prevSector = sector;
    //   console.log("Route changed!", prevProps.location, this.props.location)
    // }
    console.log("unmounting..", this.prevBedrooms)
  }

  onTextChange = (e) => {
    const value = e.target.value;
    if(value.length === 0) {
      this.setState(() => ({suggestions: sectorsProvinces.slice(0, 3), text: value, activeOption: -1}))
    } else {
      const regex = new RegExp(`${value}`, 'i');
      const suggestions = sectorsProvinces.sort(v => v.sector).filter(v => regex.test(v.sector)).slice(0, 4);
      this.setState(() => ({suggestions, text: value, activeOption: -1}), () => console.log(this.state.suggestions));
    }
  }

  suggestionSelected(value) {
    this.setState({
      text: value,
      activeOption: -1,
      suggestions: sectorsProvinces.slice(0, 4),
    }, () => {
      const listingType = this.props.initialStateSearch.listing_type == null ? "sale" : this.props.initialStateSearch.listing_type;
      const minPrice = this.props.initialStateSearch.minPrice == null ? 0 : this.props.initialStateSearch.minPrice;
      const maxPrice = this.props.initialStateSearch.maxPrice == null ? 2000000 : this.props.initialStateSearch.maxPrice;
      const bedrooms = this.props.initialStateSearch.bedrooms == null ? 0 : this.props.initialStateSearch.bedrooms;
      const bathrooms = this.props.initialStateSearch.bathrooms == null ? 0 : this.props.initialStateSearch.bathrooms;
      const propertyType = this.props.initialStateSearch.property_type == null ? ["apartment", "house", "villa", "penthouse"] : this.props.initialStateSearch.property_type;
      if(this.props.location.pathname !== '/properties') {
        console.log(this.prevBathrooms)
        this.props.search(this.state.text, this.prevListingType, this.prevMinPrice, this.prevMaxPrice, this.prevBedrooms, this.prevBathrooms, this.prevPropertyType)
        if(window.innerWidth <= 770) {
          this.props.onCloseMobileSearchClick();
        }
      } else {
        this.props.search(this.state.text, listingType, minPrice, maxPrice, bedrooms, bathrooms, propertyType)
        if(window.innerWidth <= 770) {
          this.props.onCloseMobileSearchClick();
        }
      }
    })
    // this.props.search("For Sale", 0, 2000000, 0, 0, ["apartment", "House", "Villa"])
  }
  bottomSuggestionSelected(value) {
    this.setState({
      text: value,
      activeOption: -1,
      suggestions: sectorsProvinces.slice(0, 4)
    }, () => {
      const listingType = this.props.initialStateSearch.listing_type == null ? "sale" : this.props.initialStateSearch.listing_type;
      const minPrice = this.props.initialStateSearch.minPrice == null ? 0 : this.props.initialStateSearch.minPrice;
      const maxPrice = this.props.initialStateSearch.maxPrice == null ? 2000000 : this.props.initialStateSearch.maxPrice;
      const bedrooms = this.props.initialStateSearch.bedrooms == null ? 0 : this.props.initialStateSearch.bedrooms;
      const bathrooms = this.props.initialStateSearch.bathrooms == null ? 0 : this.props.initialStateSearch.bathrooms;
      const propertyType = this.props.initialStateSearch.property_type == null ? ["apartment", "house", "villa", "penthouse"] : this.props.initialStateSearch.property_type;
      if(this.props.location.pathname !== '/properties') {
        console.log(this.prevBathrooms)
        this.props.search(this.state.text, this.prevListingType, this.prevMinPrice, this.prevMaxPrice, this.prevBedrooms, this.prevBathrooms, this.prevPropertyType)
        if(window.innerWidth <= 770) {
          this.props.onCloseMobileSearchClick();
        }
      } else {
        this.props.search(this.state.text, listingType, minPrice, maxPrice, bedrooms, bathrooms, propertyType)
        if(window.innerWidth <= 770) {
          this.props.onCloseMobileSearchClick();
        }
      }
    })
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if(suggestions.length === 0) {
      return null
    }
    return (
      <div>
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
        <div className="hauzzy-suggestions-bottom">
          <div className="suggestions-bottom-container">
            <div>
              <h2>Descubre el Distrito Nacional</h2>
            </div>
            <div className="suggestions-container">
              <div className="suggestions-column">
                {sectorsProvinces.slice(3, 7).map((item, index) => {
                  return (
                    <div key={index} className="suggestion-item" onMouseDown={() => this.bottomSuggestionSelected(item.sector)}>
                      <span>{item.sector}</span>
                    </div>
                  )
                })}
              </div>
              <div className="suggestions-column">
                {sectorsProvinces.slice(7, 11).map((item, index) => {
                  return (
                    <div key={index} className="suggestion-item" onMouseDown={() => this.bottomSuggestionSelected(item.sector)}>
                      <span>{item.sector}</span>
                    </div>
                  )
                })}
              </div>
              <div className="suggestions-column">
                {sectorsProvinces.slice(11, 15).map((item, index) => {
                  return (
                    <div key={index} className="suggestion-item" onMouseDown={() => this.bottomSuggestionSelected(item.sector)}>
                      <span>{item.sector}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleInputFocus(event) {
    event.target.select();
    this.setState({suggestionsOpen: true});
    console.log(window.innerWidth, window.innerHeight)
  }
  handleInputBlur() {
    if(window.innerWidth > 770) {
      this.setState({suggestionsOpen: false})
    }
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
            const listingType = this.props.initialStateSearch.listing_type == null ? "sale" : this.props.initialStateSearch.listing_type;
            const minPrice = this.props.initialStateSearch.minPrice == null ? 0 : this.props.initialStateSearch.minPrice;
            const maxPrice = this.props.initialStateSearch.maxPrice == null ? 2000000 : this.props.initialStateSearch.maxPrice;
            const bedrooms = this.props.initialStateSearch.bedrooms == null ? 0 : this.props.initialStateSearch.bedrooms;
            const bathrooms = this.props.initialStateSearch.bathrooms == null ? 0 : this.props.initialStateSearch.bathrooms;
            const propertyType = this.props.initialStateSearch.property_type == null ? ["apartment", "house", "villa", "penthouse"] : this.props.initialStateSearch.property_type;
            if(this.props.location.pathname !== '/properties') {
              console.log(this.prevBathrooms)
              this.props.search(this.state.text, this.prevListingType, this.prevMinPrice, this.prevMaxPrice, this.prevBedrooms, this.prevBathrooms, this.prevPropertyType)
            } else {
              this.props.search(this.state.text, listingType, minPrice, maxPrice, bedrooms, bathrooms, propertyType)
            }
          });
        }
        // this.props.search(thi.state.text, "For Sale", 0, 2000000, 0, 0, ["apartment", "House", "Villa"])
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
          <button className="back-search-mobile" onClick={this.props.onCloseMobileSearchClick}>
            <i className="fas fa-arrow-left"></i>
          </button>
          {this.props.loadingStatus ? <ClipLoader css={override} size={20} color={"#fff"} loading={true}/> : <i className="fas fa-search mobile"></i>}
          <input value={this.state.text === 'All' ? '' : this.state.text} onFocus={this.handleInputFocus}
                                          onBlur={this.handleInputBlur}
                                          onChange={this.onTextChange}
                                          type="text"
                                          placeholder="Provincia, Sector..."
                                          onKeyDown={this.hanldeKeyPressed}
                                          aria-autocomplete="list"
                                          aria-controls="hauzzy-suggestions"
                                          ref={this.props.refProp}
                                          onClick={this.props.onMobileSearchClick} />
          <button className="search-button-desktop">
            {this.props.loadingStatus ? <ClipLoader css={override} size={20} color={"#fff"} loading={true}/> : <i className="fas fa-search"></i>}
          </button>
        </div>
        <div className={this.state.suggestionsOpen ? "autocomplete-suggestions open" : "autocomplete-suggestions"}>
          {this.renderSuggestions()}
        </div>
      </div>
    )
  }
}

export default withRouter(AutoCompleteText);