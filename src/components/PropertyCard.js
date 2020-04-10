import React from "react";
import house1 from "../demo_img/house1.png"

const propertyCard = {
  imgSrc: house1,
  price: 100000,
  beds: 3,
  baths: 2,
  cars: 2,
  mts: 150,
  address: "C/ Dr. Fabio Mota #9",
  sector: "Naco, Distrito Nacional"
};

class PropertyCard extends React.Component {
  render() {
    return (
      <div className="home-card-container">
        <div className="home-card">
          <a href="/">
            <div className="property-card-media">
              <div className="photo-container">
                <img src={propertyCard.imgSrc} alt="property"/>
                <div className="top-left-premium">Premium</div>
              </div>
            </div>
            <div className="property-card-info">
              <span className="home-card-price">US$ {propertyCard.price}</span>
              <div className="favorite-button"><i className="far fa-heart"></i></div>
              <div className="home-card-stats">
                <div className="stats beds"><i className="fas fa-bed"></i>{propertyCard.beds}</div>
                <div className="stats baths"><i className="fas fa-bath"></i>{propertyCard.baths}</div>
                <div className="stats cars"><i className="fas fa-car-side"></i>{propertyCard.cars}</div>
                <div className="stats mts"><i className="fas fa-ruler-vertical"></i>{propertyCard.mts} mts</div>
              </div>
              <div className="home-card-address">{propertyCard.address}</div>
              <div className="home-card-sector">{propertyCard.sector}</div>
            </div>
          </a>
        </div>
      </div>
    )
  }	
}

export default PropertyCard;