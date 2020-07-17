import React from "react";
import "./FixedFilters.css";
import PropTypes from 'prop-types';
import InputFilters from "./InputFilters";
import { minPriceList, maxPriceList } from "../utils/PriceUtils";
import PropertyType from "./PropertyType";
import FilterToggle from "./FilterToggle";


const bedValues = [0, 1, 2, 3, 4, 5];
const bathValues = [0, 1, 2, 3, 4, 5];

class FixedFilters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listingTypeOpen: false,
      listingType: "sell",
      priceFilterOpen: false,
      minPrice: 0,
      maxPrice: 2000000,
      bedsBathsOpen: false,
      propertyTypeOpen: false,
      moreFiltersOpen: false,
      beds: 0,
      baths: 0,
      // Property Types
      propertyTypes: {
        "Apartamento": true,
        casa: true,
        villa: true,
        comercial: true,
        industrial: true,
        penthouse: true
      }
    }
    this.handleListingTypeClick = this.handleListingTypeClick.bind(this);
    this.handleListingType = this.handleListingType.bind(this);
    this.handlePriceFilterClick = this.handlePriceFilterClick.bind(this);
    this.handleMinPrice = this.handleMinPrice.bind(this);
    this.handleMaxPrice = this.handleMaxPrice.bind(this);
    this.handleBedsBathsClick = this.handleBedsBathsClick.bind(this);
    this.handlePropertyTypeClick = this.handlePropertyTypeClick.bind(this);
    this.handleMoreFiltersClick = this.handleMoreFiltersClick.bind(this);
    this.handleBedsClick = this.handleBedsClick.bind(this);
    this.handleBathClick = this.handleBathClick.bind(this);
    this.handleChecks = this.handleChecks.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  componentDidMount() {
    if (Object.entries(this.props.initialState).length > 0) {
      const propertyTypesArray = this.props.initialState.property_type.split(",")
      console.log(propertyTypesArray.includes("Villa"))
      this.setState({
        listingType: this.props.initialState.listing_type,
        minPrice: parseInt(this.props.initialState.minPrice),
        maxPrice: parseInt(this.props.initialState.maxPrice),
        beds: parseInt(this.props.initialState.beds),
        baths: parseInt(this.props.initialState.baths),
        propertyTypes: {
          "Apartamento": propertyTypesArray.includes("Apartamento"),
          casa: propertyTypesArray.includes("casa"),
          villa: propertyTypesArray.includes("villa"),
          comercial: propertyTypesArray.includes("comercial"),
          industrial: propertyTypesArray.includes("industrial"),
          penthouse: propertyTypesArray.includes("penthouse")
        }
      })
      console.log(Object.entries(this.props.initialState).length) 
    }
  }

  handleListingTypeClick() {
    this.setState({
      priceFilterOpen: false,
      bedsBathsOpen: false,
      propertyTypeOpen: false
    });
    this.setState(prevState => {
      return { listingTypeOpen: !prevState.listingTypeOpen }
    });
  }
  handleListingType(event) {
    this.setState({
      listingType: event.target.value,
      minPrice: 0,
      maxPrice: 2000000
    }, () => {
      const keys = Object.keys(this.state.propertyTypes).filter(key => this.state.propertyTypes[key])
      this.props.searchProperties(this.state.listingType, this.state.minPrice, this.state.maxPrice, this.state.beds, this.state.baths, keys)
    })
  }

  handlePriceFilterClick() {
    this.setState({
      listingTypeOpen: false,
      bedsBathsOpen: false,
      propertyTypeOpen: false
    });
    this.setState(prevState => {
      return { priceFilterOpen: !prevState.priceFilterOpen }
    });
  }
  handleMinPrice(event) {
    if(this.state.listingType === "sell" && parseInt(event.target.value) > this.state.maxPrice && this.state.maxPrice !== 0) {
      let prices = [0, 75000, 100000, 150000, 175000, 200000, 225000, 250000, 275000, 300000, 350000, 400000, 450000, 500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000];
      let index = prices.findIndex(number => {
        return number > event.target.value;
      })
      this.setState({ minPrice: parseInt(event.target.value) })
      this.setState({ maxPrice: prices[index] });
    } else if(this.state.listingType === "rent" && event.target.value > this.state.maxPrice && this.state.maxPrice !== 0) {
      let prices = [0, 1000, 1250, 1500, 2000, 2250, 2500, 2750, 3000, 3250, 3500, 3750, 4000, 4250, 4500, 4750, 5000];
      let index = prices.findIndex(number => {
        return number > event.target.value;
      })
      this.setState({ minPrice: parseInt(event.target.value) })
      this.setState({ maxPrice: prices[index] });
    } else {
      this.setState({ minPrice: parseInt(event.target.value) });
    }
    const keys = Object.keys(this.state.propertyTypes).filter(key => this.state.propertyTypes[key])
    return this.props.searchProperties(this.state.listingType, parseInt(event.target.value), this.state.maxPrice, this.state.beds, this.state.baths, keys)
  }
  handleMaxPrice(event) {
    if(this.state.listingType === "sell" && this.state.minPrice > parseInt(event.target.value) && parseInt(event.target.value) !== 0) {
      let prices = [0, 75000, 100000, 125000, 150000, 175000, 200000, 225000, 250000, 275000, 300000, 350000, 400000, 450000, 500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000];
      let index = prices.findIndex(number => {
        return number > this.state.minPrice;
      })
      this.setState({ maxPrice: event.target.value = prices[index] });
      // this.setState({ maxPrice: prices[index] });
    } else if(this.state.listingType === "rent" && this.state.minPrice > event.target.value && parseInt(event.target.value) !== 0) {
      let prices = [0, 1000, 1250, 1500, 2000, 2250, 2500, 2750, 3000, 3250, 3500, 3750, 4000, 4250, 4500, 4750, 5000];
      let index = prices.findIndex(number => {
        return number > this.state.minPrice;
      })
      this.setState({ maxPrice: event.target.value = prices[index] });
    } else {
      this.setState({ maxPrice: parseInt(event.target.value) });
    }
    const keys = Object.keys(this.state.propertyTypes).filter(key => this.state.propertyTypes[key])
    return this.props.searchProperties(this.state.listingType, this.state.minPrice, parseInt(event.target.value), this.state.beds, this.state.baths, keys)
  }

  handleBedsBathsClick() {
    this.setState({
      listingTypeOpen: false,
      priceFilterOpen: false,
      propertyTypeOpen: false
    })
    this.setState(prevState => {
      return { bedsBathsOpen: !prevState.bedsBathsOpen }
    })
  }
  handlePropertyTypeClick() {
    this.setState({
      listingTypeOpen: false,
      priceFilterOpen: false,
      bedsBathsOpen: false
    })
    this.setState(prevState => {
      return { propertyTypeOpen: !prevState.propertyTypeOpen }
    })
  }

  handleMoreFiltersClick() {
    this.setState({ listingTypeOpen: false });
    this.setState({ priceFilterOpen: false });
    this.setState({ moreFiltersOpen: true });
  }
  handleBedsClick(event) {
    this.setState({ beds: parseInt(event.target.value) }, () => {
      const keys = Object.keys(this.state.propertyTypes).filter(key => this.state.propertyTypes[key])
      this.props.searchProperties(this.state.listingType, this.state.minPrice, this.state.maxPrice, this.state.beds, this.state.baths, keys)
    });
  }
  handleBathClick(event) {
    this.setState({ baths: parseInt(event.target.value) }, () => {
      const keys = Object.keys(this.state.propertyTypes).filter(key => this.state.propertyTypes[key])
      this.props.searchProperties(this.state.listingType, this.state.minPrice, this.state.maxPrice, this.state.beds, this.state.baths, keys)
    });
  }

  // Property Types Checks
  handleChecks(event) {
    event.persist()
    this.setState(prevState => ({
      propertyTypes: {
        ...prevState.propertyTypes,
        [event.target.name]: event.target.checked  
      }
    }), () => {
      console.log(this.state.propertyTypes)
      const keys = Object.keys(this.state.propertyTypes).filter(key => this.state.propertyTypes[key])
      console.log(keys)
      this.props.searchProperties(this.state.listingType, this.state.minPrice, this.state.maxPrice, this.state.beds, this.state.baths, keys)
    })
  }
  handleCloseClick() {
    this.setState({ moreFiltersOpen: false });
  }

  render() {
    // Listing Type Filters
    let buttonCssWhenOpen;
    let popoverCss = "exposed-popover listing-type";
    if(this.state.listingTypeOpen) {
      buttonCssWhenOpen = "active";
      popoverCss = "exposed-popover listing-type open"
    }

    // Price Filters
    let minPriceLabel;
    if(this.state.minPrice === 0) {
      minPriceLabel = "No Min";
    } else if(this.state.minPrice === 1000000) {
      minPriceLabel = `US$${this.state.minPrice / 1000000}mm`
    } else {
      minPriceLabel = `US$${this.state.minPrice / 1000}k`
    }
    let maxPriceLabel;
    if(this.state.maxPrice === 2000000) {
      maxPriceLabel = "No Max";
    } else if(this.state.maxPrice === 1000000) {
      maxPriceLabel = `US$${this.state.maxPrice / 1000000}mm`
    } else {
      maxPriceLabel = `US$${this.state.maxPrice / 1000}k`
    }

    let listingSelected = this.state.listingType;
    let minPriceOptions = minPriceList[listingSelected];
    let maxPriceOptions = maxPriceList[listingSelected];

    let bedsLabel;
    if(this.state.beds === 0) {
      bedsLabel = "Hab. &"
    } else {
      bedsLabel = `${this.state.beds}hab,`
    }
    let bathsLabel;
    if(this.state.baths === 0) {
      bathsLabel = " Baños"
    } else {
      bathsLabel = ` ${this.state.baths}+ ba`
    }


    return (
      <div className="fixed-filters">
        <div className="search-results-filter-section">
          <div className="filter-section-left">
            <div className="buy-sell filters">
              <button onClick={this.handleListingTypeClick} className={buttonCssWhenOpen}>
                <i className={this.state.listingType === "sell" ? "fas fa-circle sell" : "fas fa-circle rent"}></i>
                <span>{this.state.listingType === "sell" ? "Comprar" : "Alquilar"}</span>
                {this.state.listingTypeOpen ? <i className="fas fa-angle-up dynamic-angle"></i> : <i className="fas fa-angle-down dynamic-angle"></i>}
              </button>
              <div className={popoverCss}>
                <div className="separator">
                  <input type="radio" checked={this.state.listingType === "sell"} onChange={this.handleListingType} value="sell" name="listing-type" id="for-sell"/>
                  <label className="label-listingType" htmlFor="for-sell" id="label-for-sell"><i className="fas fa-circle"></i>Comprar</label>
                </div>
                <div className="separator">
                  <input type="radio" checked={this.state.listingType === "rent"} onChange={this.handleListingType} value="rent" name="listing-type" id="for-rent"/>
                  <label className="label-listingType" htmlFor="for-rent" id="label-for-rent"><i className="fas fa-circle"></i>Alquilar</label>
                </div>
                <div className="separator done">
                  <span onClick={this.handleListingTypeClick}>Listo</span>
                </div>
              </div>
            </div>
            <div className="price filters">
              <button onClick={this.handlePriceFilterClick} className={this.state.priceFilterOpen === true ? "active" : ""}>
                <span>{minPriceLabel}</span>
                <span>-</span>
                <span>{maxPriceLabel}</span>
                {this.state.priceFilterOpen ? <i className="fas fa-angle-up dynamic-angle"></i> : <i className="fas fa-angle-down dynamic-angle"></i>}
              </button>
              <div className={this.state.priceFilterOpen === true ? "exposed-popover price-filters open" : "exposed-popover price-filters"}>
                <div className="container">
                  <div className="select left">
                    <select value={this.state.minPrice} onChange={this.handleMinPrice}>
                      {minPriceOptions.map((o, index) => <option key={index} value={o.value}>{o.text}</option>)}
                    </select>
                  </div>
                  <span>-</span>
                  <div className="select right">
                    <select value={this.state.maxPrice} onChange={this.handleMaxPrice}>
                      {maxPriceOptions.map((o, index) => <option key={index} value={o.value}>{o.text}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="beds-baths filters">
              <button onClick={this.handleBedsBathsClick}>
                <span>{bedsLabel}</span>
                <span>{bathsLabel}</span>
                {this.state.bedsBathsOpen ? <i className="fas fa-angle-up dynamic-angle"></i> : <i className="fas fa-angle-down dynamic-angle"></i>}
              </button>
              <div className={this.state.bedsBathsOpen ? "exposed-popover beds-baths open" : "exposed-popover beds-baths"}>
                <div className="container">
                  <fieldset className="beds-filter">
                    <legend>Habitaciones</legend>
                    <div className="radio-options">
                      {bedValues.map(value => {
                        return (
                          <label key={value}className={this.state.beds === value ? "label-button labels selected" : "label-button labels"}>
                            {value === 0 ? "Todas" : value}
                            <input type="radio" name="beds-options" value={value} onChange={this.handleBedsClick}/>
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
                          <label key={value}className={this.state.baths === value ? "label-button labels selected" : "label-button labels"}>
                            {value === 0 ? "Todas" : `${value}+`}
                            <input type="radio" name="bath-options" value={value} onChange={this.handleBathClick}/>
                          </label>
                        )
                      })}
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
            <div className="type filters">
              <button onClick={this.handlePropertyTypeClick}>
                <span>Tipo de propiedad</span>
                {this.state.propertyTypeOpen ? <i className="fas fa-angle-up dynamic-angle"></i> : <i className="fas fa-angle-down dynamic-angle"></i>}
              </button>
              <div className={this.state.propertyTypeOpen ? "exposed-popover type open" : "exposed-popover type"}>
                <div className="container">
                  <PropertyType onChecks={this.handleChecks}
                                propertyTypes={this.state.propertyTypes}
                                />
                </div>
              </div>
            </div>
          </div>
          <div className="filter-section-button-right">
            <div className="filter-button filters">
              <FilterToggle onFilterClick={this.handleMoreFiltersClick} />
              <InputFilters show={this.state.moreFiltersOpen}
                            onBedsClick={this.handleBedsClick}
                            bedOptionSelected={this.state.beds}
                            onBathClick={this.handleBathClick}
                            bathOptionSelected={this.state.baths}
                            onChecks={this.handleChecks}
                            onCloseClick={this.handleCloseClick}
                            status={this.props.status}
                            propertyTypes={this.state.propertyTypes} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

FixedFilters.propTypes = {
  status: PropTypes.bool.isRequired
}

export default FixedFilters;