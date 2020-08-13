import React from "react";
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import {Link} from 'react-router-dom';

// Temporal image
import image from "../demo_img/house1.png"

class PropertyCard extends React.Component {
  render() {
    return (
      <div className="home-card-container">
        <div className="home-card">
          <Link to={`/properties/${this.props.property.id}`}>
            <div className="property-card-media">
              <div className="photo-container">
                <img src={image} alt="property"/>
                <div className="top-left-premium">Premium</div>
              </div>
            </div>
            <div className="property-card-info">
              <span className="home-card-price">
                <NumberFormat value={this.props.property.listing_price} displayType={'text'} thousandSeparator={true} prefix={'US$'}/>
              </span>
              <div className="favorite-button"><i className="far fa-heart"></i></div>
              <div className="home-card-stats">
                <div className="stats beds"><i className="fas fa-bed"></i>{this.props.property.bedrooms}</div>
                <div className="stats baths"><i className="fas fa-bath"></i>{this.props.property.bathrooms}</div>
                <div className="stats cars"><i className="fas fa-car-side"></i>{this.props.property.parking_spaces}</div>
                <div className="stats mts"><i className="fas fa-ruler-vertical"></i>{this.props.property.square_meters} mts</div>
              </div>
              <div className="home-card-address">{`C/ ${this.props.property.street_name} #${this.props.property.street_number}`}</div>
              <div className="home-card-sector">{this.props.property.sector}</div>
            </div>
          </Link>
        </div>
      </div>
    )
  }	
}

PropertyCard.propTypes = {
  property: PropTypes.object.isRequired
}

export default PropertyCard;