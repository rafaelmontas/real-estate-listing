import React from 'react';
import NumberFormat from 'react-number-format';
import {Link} from 'react-router-dom';
import './MapPropertyCard.css';


class MapPropertyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: {}
    }
  }

  componentDidMount() {
    const property = this.props.properties.find(property => property.id === this.props.identifier);
    this.setState({property}, () => console.log(this.state.property, this.props.identifier))
  }
  componentDidUpdate(prevProps) {
    if(prevProps.identifier !== this.props.identifier) {
      const property = this.props.properties.find(property => property.id === this.props.identifier);
      this.setState({property}, () => console.log(this.state.property, this.props.identifier))
    }
  }

  render() {
    return (
      <div className="map-property-card">
        <Link to={`/properties/${this.state.property.id}`} style={{ textDecoration: 'none', color: '#000' }}>
          <div className="map-property-card-content">
            <div className="map-property-card-img">
              hello
            </div>
            <div className="map-property-card-info">
              <div className="price-like-section">
                <div className="price-tag">
                  <NumberFormat value={this.state.property.listing_price} displayType={'text'} thousandSeparator={true} prefix={'US$'} />
                </div>
                <div className="like-button">
                  <i className="far fa-heart"></i>
                </div>
              </div>
              <div className="property-stats">
                <div className="stats beds">
                  {this.state.property.bedrooms}
                  <span>hab</span>
                  {/* <i className="fas fa-bed"></i> */}
                </div>
                <div className="stats baths">
                  {this.state.property.bathrooms}
                  <span>{this.state.property.bathrooms > 1 ? "baños" : "baño"}</span>
                  {/* <i className="fas fa-bath"></i> */}
                </div>
                <div className="stats cars">
                  {this.state.property.parking_spaces}
                  <span>parq</span>
                  {/* <i className="fas fa-car-side"></i> */}
                </div>
                <div className="stats mts">
                  {this.state.property.square_meters}
                  <span>mts</span>
                  {/* <i className="fas fa-ruler-vertical"></i> */}
                </div>
              </div>
              <div className="property-address">
                {`C/ ${this.state.property.street_name} #${this.state.property.street_number}`}
              </div>
              <div className="property-sector">{this.state.property.sector}</div>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default MapPropertyCard;