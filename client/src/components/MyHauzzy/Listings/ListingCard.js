import React from 'react';
import {Link} from 'react-router-dom';
import NumberFormat from 'react-number-format';
import dateFormat from 'dateformat'
import './ListingCard.css';

import image from "../../../demo_img/house1.png"

class ListingCard extends React.Component {

  renderPropertyType() {
    if(this.props.listing.property_type === "apartment") {
      return <span>Apartamento</span>
    } else if(this.props.listing.property_type === "house") {
      return <span>Casa</span>
    } else if(this.props.listing.property_type === "villa") {
      return <span>Villa</span>
    } else if(this.props.listing.property_type === "penthouse") {
      return <span>Penthouse</span>
    }
  }

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
                  <div className="listing-address">{this.props.listing.listing_address}</div>
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
                  <span className={this.props.listing.listing_active ? "active" : "pending"}>
                    {this.props.listing.listing_active ? "Activa" : "Pendiente"}
                  </span>
                </div>
                <div className="listing-date sections">
                  <span>{dateFormat(this.props.listing.createdAt, "dd/mm/yy")}</span>
                </div>
                <div className="property-type sections">
                  {this.renderPropertyType()}
                </div>
                <div className="listing-type sections">
                  <span>{this.props.listing.listing_type === "sale" ? "En venta" : "Alquiler"}</span>
                </div>
                <div className="listing-visits sections">  
                  <span><i className="far fa-eye"></i> 0</span>
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