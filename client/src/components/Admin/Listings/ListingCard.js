import React from 'react'
import {Link} from 'react-router-dom'
import NumberFormat from 'react-number-format'
import dateFormat from 'dateformat'
// import './ListingCard.css'


class ListingCard extends React.Component {
  render() {
    return (
      <div className="admin-listing-card-container">
        <Link to={`/listings/${this.props.listing.id}`} className="admin-listing-card-item">
          <div className="admin-listing-card-media">
            <img src={this.props.listing['PropertyPictures'][0].location} alt="property image"/>
            <span className={this.props.listing.listing_active ? "listing-status active" : "listing-status pending"}>
              {this.props.listing.listing_active ? "Activa" : "Pendiente"}
            </span>
          </div>
          <div className="admin-listing-card-info">
            <div className="home-card-top">
              <span className="home-card-price">
                <NumberFormat value={this.props.listing.listing_price} displayType={'text'} thousandSeparator={true} prefix={'US$'}/>
              </span>
              <span>{dateFormat(this.props.listing.createdAt, "dd/mm/yy")}</span>
            </div>
            <div className="home-card-stats">
              <div className="stats beds"><i className="fas fa-bed"></i>{this.props.listing.bedrooms}</div>
              <div className="stats baths"><i className="fas fa-bath"></i>{this.props.listing.bathrooms}</div>
              <div className="stats cars"><i className="fas fa-car-side"></i>{this.props.listing.parking_spaces}</div>
              <div className="stats mts"><i className="fas fa-ruler-vertical"></i>{this.props.listing.square_meters} mts</div>
            </div>
            <div className="home-card-address">{this.props.listing.listing_address}</div>
            <div className="home-card-sector"><strong>{this.props.listing.sector}</strong></div>
          </div>
        </Link>
      </div>
    )
  }
}

export default ListingCard