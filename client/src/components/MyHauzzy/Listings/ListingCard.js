import React from 'react';
import {Link} from 'react-router-dom';
import NumberFormat from 'react-number-format';
import './ListingCard.css';

import image from "../../../demo_img/house1.png"

class ListingCard extends React.Component {
  render() {
    return (
      <Link to={`${this.props.linkTo}/${this.props.listing.id}`}>
        <div className="listing-card-container">
          <div className="listing-card-item">
            <div className="listing-photo">
              <img src={image}/>
            </div>
            <div className="listing-details">
              <div className="address-section sections">
                <div className="info-container">
                  <div className="listing-address">{`C/ ${this.props.listing.street_name} ${this.props.listing.street_number}`}</div>
                  <div className="listing-sector">{this.props.listing.sector}</div>
                  <div className="listing-stats">
                    <span className="stats beds">{this.props.listing.bedrooms} hab</span>
                    <span className="stats baths">{this.props.listing.bathrooms} {this.props.listing.bathrooms > 1 ? "baños" : "baño"}</span>
                    <span className="stats parkings">{this.props.listing.parking_spaces} parq</span>
                    <span className="stats mts">{this.props.listing.square_meters} mts</span>
                  </div>
                  <div className="price">
                    <NumberFormat value={this.props.listing.listing_price} displayType={'text'} thousandSeparator={true} prefix={'US$'}/>
                  </div>
                </div>
              </div>
              <div className="right-info-container">
                <div className="listing-status sections">
                  <span>Activa</span>
                </div>
                <div className="listing-date sections">
                  <span>25 Jul 2020</span>
                </div>
                <div className="property-type sections">
                  <span>Apartamento</span>
                </div>
                <div className="listing-type sections">
                  <span>En venta</span>
                </div>
                <div className="listing-visits sections">  
                  <span><i className="far fa-eye"></i> 15</span>
                </div>
                <div className="listing-actions sections">  
                  <span className="edit-button"><i className="far fa-edit"></i></span>
                  <span className="delete-button"><i className="far fa-trash-alt"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

export default ListingCard;