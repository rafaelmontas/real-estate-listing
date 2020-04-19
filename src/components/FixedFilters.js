import React from "react";
import "./FixedFilters.css";
import PropTypes from 'prop-types';
import InputFilters from "./InputFilters";

const priceList = {
  "sell": [
    {value: 0, text: "No Min"},
    {value: 50000, text: "US$ 50,000"},
    {value: 75000, text: "US$ 75,000"},
    {value: 100000, text: "US$ 100,000"},
    {value: 125000, text: "US$ 125,000"},
    {value: 150000, text: "US$ 150,000"},
    {value: 175000, text: "US$ 175,000"},
    {value: 200000, text: "US$ 200,000"},
    {value: 225000, text: "US$ 225,000"},
    {value: 250000, text: "US$ 250,000"},
    {value: 275000, text: "US$ 275,000"},
    {value: 300000, text: "US$ 300,000"},
    {value: 350000, text: "US$ 350,000"},
    {value: 400000, text: "US$ 400,000"},
    {value: 450000, text: "US$ 450,000"},
    {value: 500000, text: "US$ 500,000"},
    {value: 550000, text: "US$ 550,000"},
    {value: 600000, text: "US$ 600,000"},
    {value: 6500000, text: "US$ 650,000"},
    {value: 700000, text: "US$ 700,000"},
    {value: 750000, text: "US$ 750,000"},
    {value: 800000, text: "US$ 800,000"},
    {value: 850000, text: "US$ 850,000"},
    {value: 900000, text: "US$ 900,000"},
    {value: 950000, text: "US$ 950,000"},
    {value: 1000000, text: "US$ 1,000,000"}
  ],
  "rent": [
    {value: 0, text: "No Min"},
    {value: 500, text: "US$500"},
    {value: 750, text: "US$750"},
    {value: 1000, text: "US$ 1,000"},
    {value: 1250, text: "US$ 1,250"},
    {value: 1500, text: "US$ 1,500"},
    {value: 1750, text: "US$ 1,750"},
    {value: 2000, text: "US$ 2,000"},
    {value: 2250, text: "US$ 2,250"},
    {value: 2500, text: "US$ 2,500"},
    {value: 2750, text: "US$ 2,750"},
    {value: 3000, text: "US$ 3,000"},
    {value: 3250, text: "US$ 3,250"},
    {value: 3500, text: "US$ 3,500"},
    {value: 3750, text: "US$ 3,750"},
    {value: 4000, text: "US$ 4,000"},
    {value: 4250, text: "US$ 4,250"},
    {value: 4500, text: "US$ 4,500"},
    {value: 4750, text: "US$ 4,750"},
    {value: 5000, text: "US$ 5,000"}
  ]
}


class FixedFilters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listingTypeOpen: false,
      listingType: "sell",
      priceFilterOpen: false,
      minPrice: 0,
      maxPrice: 0,
      moreFiltersOpen: false,
      beds: 0,
      baths: 0,
      // Property Types
      housesSelected: true,
      apartmentsSelected: true,
      villasSelected: true,
      comercialSelected: true,
      industrialSelected: true,
      penthouseSelected: true
    }
    this.handleListingTypeClick = this.handleListingTypeClick.bind(this);
    this.handleListingType = this.handleListingType.bind(this);
    this.handlePriceFilterClick = this.handlePriceFilterClick.bind(this);
    this.handleMinPrice = this.handleMinPrice.bind(this);
    this.handleMaxPrice = this.handleMaxPrice.bind(this);
    this.handleMoreFiltersClick = this.handleMoreFiltersClick.bind(this);
    this.handleBedsClick = this.handleBedsClick.bind(this);
    this.handleBathClick = this.handleBathClick.bind(this);
    this.handleChecks = this.handleChecks.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  handleListingTypeClick() {
    this.setState({ priceFilterOpen: false });
    this.setState(prevState => {
      return { listingTypeOpen: !prevState.listingTypeOpen }
    });
  }
  handleListingType(event) {
    this.setState({ listingType: event.target.value })
    this.setState({ minPrice: 0 });
    this.setState({ maxPrice: 0 });
  }

  handlePriceFilterClick() {
    this.setState({ listingTypeOpen: false });
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
      let prices = [0, 1000, 1500, 2000, 2250, 2500, 2750, 3000, 3250, 3500, 3750, 4000, 4250, 4500, 4750, 5000];
      let index = prices.findIndex(number => {
        return number > event.target.value;
      })
      this.setState({ minPrice: parseInt(event.target.value) })
      this.setState({ maxPrice: prices[index] });
    } else {
      this.setState({ minPrice: parseInt(event.target.value) });
    }
  }
  handleMaxPrice(event) {
    if(this.state.listingType === "sell" && this.state.minPrice > parseInt(event.target.value) && parseInt(event.target.value) !== 0) {
      let prices = [0, 75000, 100000, 150000, 175000, 200000, 225000, 250000, 275000, 300000, 350000, 400000, 450000, 500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000];
      let index = prices.findIndex(number => {
        return number > this.state.minPrice;
      })
      this.setState({ maxPrice: event.target.value = prices[index] });
      // this.setState({ maxPrice: prices[index] });
    } else if(this.state.listingType === "rent" && this.state.minPrice > event.target.value && parseInt(event.target.value) !== 0) {
      let prices = [0, 1000, 1500, 2000, 2250, 2500, 2750, 3000, 3250, 3500, 3750, 4000, 4250, 4500, 4750, 5000];
      let index = prices.findIndex(number => {
        return number > this.state.minPrice;
      })
      this.setState({ maxPrice: event.target.value = prices[index] });
    } else {
      this.setState({ maxPrice: parseInt(event.target.value) });
    }
  }

  handleMoreFiltersClick() {
    this.setState({ listingTypeOpen: false });
    this.setState({ priceFilterOpen: false });
    this.setState({ moreFiltersOpen: true });
  }
  handleBedsClick(event) {
    this.setState({ beds: parseInt(event.target.value) });
  }
  handleBathClick(event) {
    this.setState({ baths: parseInt(event.target.value) });
  }

  // Property Types Checks
  handleChecks(event) {
    this.setState({ [event.target.name]: event.target.checked });
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
    } else {
      minPriceLabel = `US$${this.state.minPrice / 1000}k`
    }
    let maxPriceLabel;
    if(this.state.maxPrice === 0) {
      maxPriceLabel = "No Max";
    } else {
      maxPriceLabel = `US$${this.state.maxPrice / 1000}k`
    }

    let listingSelected = this.state.listingType;
    let priceOptions = priceList[listingSelected];

    return (
      <div className="fixed-filters">
        <div className="search-results-filter-section">
          <div className="filter-section-left">
            <div className="buy-sell filters">
              <button onClick={this.handleListingTypeClick} className={buttonCssWhenOpen}>
                <i className={this.state.listingType === "sell" ? "fas fa-circle sell" : "fas fa-circle rent"}></i>
                <span>{this.state.listingType === "sell" ? "Comprar" : "Alquilar"}</span>
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
              </button>
              <div className={this.state.priceFilterOpen === true ? "exposed-popover price-filters open" : "exposed-popover price-filters"}>
                <div className="container">
                  <div className="select left">
                    <select value={this.state.minPrice} onChange={this.handleMinPrice}>
                      {priceOptions.map((o, index) => <option key={index} value={o.value}>{o.text}</option>)}
                    </select>
                  </div>
                  <span>-</span>
                  <div className="select right">
                    <select value={this.state.maxPrice} onChange={this.handleMaxPrice}>
                      {priceOptions.map((o, index) => <option key={index} value={o.value}>{o.text}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <span className="beds-baths filters">Hab. & Baños</span>
            <span className="type filters">Tipo de propiedad</span>
          </div>
          <div className="filter-section-button-right">
            <div className="filter-button filters">
              <button onClick={this.handleMoreFiltersClick}>
                Filtros
                <i className="fas fa-angle-down"></i>
              </button>
              <InputFilters show={this.state.moreFiltersOpen}
                            onBedsClick={this.handleBedsClick}
                            bedOptionSelected={this.state.beds}
                            onBathClick={this.handleBathClick}
                            bathOptionSelected={this.state.baths}
                            onChecks={this.handleChecks}
                            housesSelected={this.state.housesSelected}
                            apartmentsSelected={this.state.apartmentsSelected}
                            villasSelected={this.state.villasSelected}
                            comercialSelected={this.state.comercialSelected}
                            industrialSelected={this.state.industrialSelected}
                            penthouseSelected={this.state.penthouseSelected}
                            onCloseClick={this.handleCloseClick}
                            status={this.props.status} />
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