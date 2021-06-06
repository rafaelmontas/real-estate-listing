import React from 'react';
import NumberFormat from 'react-number-format';
import {Link} from 'react-router-dom';
import './MapPropertyCard.css';
import image from "../../demo_img/house1.png"


class MapPropertyCard extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <div className="map-property-card">
        <Link to={`/properties/${this.props.property.id}`} style={{ textDecoration: 'none', color: '#000' }}>
          <div className="map-property-card-content">
            <div className="map-property-card-img">
              <img src={this.props.property['PropertyPictures'][0].location}/>
            </div>
            <div className="map-property-card-info">
              <div className="price-like-section">
                <div className="price-tag">
                  <NumberFormat value={this.props.property.listing_price} displayType={'text'} thousandSeparator={true} prefix={'US$'} />
                </div>
                {/* <div className="like-button">
                  <i className="far fa-heart"></i>
                </div> */}
              </div>
              <div className="property-stats">
                <div className="stats beds">
                  {this.props.property.bedrooms}
                  <span>hab</span>
                  {/* <i className="fas fa-bed"></i> */}
                </div>
                <div className="stats baths">
                  {this.props.property.bathrooms}
                  <span>{this.props.property.bathrooms > 1 ? "baños" : "baño"}</span>
                  {/* <i className="fas fa-bath"></i> */}
                </div>
                <div className="stats cars">
                  {this.props.property.parking_spaces}
                  <span>parq</span>
                  {/* <i className="fas fa-car-side"></i> */}
                </div>
                <div className="stats mts">
                  {this.props.property.square_meters}
                  <span>mts</span>
                  {/* <i className="fas fa-ruler-vertical"></i> */}
                </div>
              </div>
              {/* <div className="property-address">
                {`C/ ${this.props.property.street_name} #${this.props.property.street_number}`}
              </div> */}
              <div className="property-sector">{this.props.property.sector}</div>
            </div>
          </div>
        </Link>
        {this.renderFavButton()}
      </div>
    )
  }
}

export default MapPropertyCard;