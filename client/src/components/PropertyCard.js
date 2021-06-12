import React from "react";
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import dateFormat from 'dateformat'
import {Link} from 'react-router-dom';
import {userContext} from './userContext';

class PropertyCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      liked: false
    }
  }

  componentDidMount() {
    console.log(this.props.userLike, this.props.userLikeId)
    if(this.props.userLike !== -1) this.setState({liked: true})
  }
  componentDidUpdate(prevProps) {
    if(this.props.userLike !== prevProps.userLike) {
      console.log(this.props.userLike, this.props.userLikeId)
      if(this.props.userLike !== -1) {
        this.setState({liked: true})
      } else if(this.props.userLike === -1) {
        this.setState({liked: false})
      }
    } 
  }

  renderFavButton() {
    if(this.state.liked) {
      return <div className="favorite-button liked" onClick={() => this.props.onLikeDelete(this.props.userLikeId.id)}><i className="fas fa-heart"></i></div>
    } else {
      return <div className="favorite-button" onClick={() => this.props.onLike(this.props.property.id)}><i className="far fa-heart"></i></div>
    }
  }

  renderNewBadge() {
    // Set todays date
    let today = new Date();
    // Set listing date
    let listingDate = new Date(dateFormat(this.props.property.createdAt, "mm/dd/yyyy"))
    // To calculate the time difference of two dates
    let differenceInTime = today.getTime() - listingDate.getTime();
    // To calculate the no. of days between two dates
    let differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
    if(differenceInDays <= 7) {
      return <div className="top-left-new">Nuevo</div>
    }
  }

  render() {
    return (
      <div className="home-card-container"
           id={`homecard_${this.props.identifier}`}
           onMouseEnter={() => this.props.onCardHovered(this.props.identifier)}
           onMouseLeave={this.props.onCardHoverOut}>
        <div className={this.props.cardSelected === this.props.identifier ? "home-card cardSelected" : "home-card"}>
          <Link to={`/properties/${this.props.property.id}`}>
            <div className="property-card-media">
              <div className="photo-container">
                <img src={this.props.property['PropertyPictures'][0].location} alt="property"/>
                {this.renderNewBadge()}
                {/* <div className="top-left-video"><i className="fas fa-video"></i></div> */}
              </div>
            </div>
            <div className="property-card-info">
              <span className="home-card-price">
                <NumberFormat value={this.props.property.listing_price} displayType={'text'} thousandSeparator={true} prefix={'US$'}/>
              </span>
              <div className="home-card-stats">
                <div className="stats beds"><i className="fas fa-bed"></i>{this.props.property.bedrooms}</div>
                <div className="stats baths"><i className="fas fa-bath"></i>{this.props.property.bathrooms}</div>
                <div className="stats cars"><i className="fas fa-car-side"></i>{this.props.property.parking_spaces}</div>
                <div className="stats mts"><i className="fas fa-ruler-vertical"></i>{this.props.property.square_meters} mts</div>
              </div>
              {/* <div className="home-card-address">{this.props.property.listing_address}</div> */}
              <div className="home-card-sector">
                <i className="fas fa-map-marker-alt"></i>
                {this.props.property.sector}
              </div>
            </div>
          </Link>
          {this.renderFavButton()}
        </div>
      </div>
    )
  }	
}

PropertyCard.propTypes = {
  property: PropTypes.object.isRequired
}

PropertyCard.contextType = userContext;
export default PropertyCard;