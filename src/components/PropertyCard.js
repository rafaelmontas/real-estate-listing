import React from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class PropertyCard extends React.Component {
  render() {
    return (
      <div className="home-card-container">
        <div className="home-card">
          <Link to={`/properties/${this.props.property.id}`}>
            <div className="property-card-media">
              <div className="photo-container">
                <img src={this.props.property.imgSrc} alt="property"/>
                <div className="top-left-premium">Premium</div>
              </div>
            </div>
            <div className="property-card-info">
              <span className="home-card-price">US$ {this.props.property.price}</span>
              <div className="favorite-button"><i className="far fa-heart"></i></div>
              <div className="home-card-stats">
                <div className="stats beds"><i className="fas fa-bed"></i>{this.props.property.beds}</div>
                <div className="stats baths"><i className="fas fa-bath"></i>{this.props.property.baths}</div>
                <div className="stats cars"><i className="fas fa-car-side"></i>{this.props.property.cars}</div>
                <div className="stats mts"><i className="fas fa-ruler-vertical"></i>{this.props.property.mts} mts</div>
              </div>
              <div className="home-card-address">{this.props.property.address}</div>
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