import React from 'react';
import PropertyList from '../PropertyList';
// import PropertyCard from '../PropertyCard';
import './SimilarProperties.css';

class SimilarProperties extends React.Component {
  
  handleCardHover() {
    return;
  }
  handleCardHoverOut() {
    return;
  }
  
  render() {
    return (
      <div className="similar-properties">
        <div className="similar-properties-container">
          <h2>Más Propiedades</h2>
          <div className="property-list">
            <PropertyList status={false}
                          detailsPage={true}
                          properties={this.props.properties.slice(0, 4)}
                          onCardHovered={this.handleCardHover}
                          onCardHoverOut={this.handleCardHoverOut}
                          onLike={this.props.onLike}
                          onLikeDelete={this.props.onLikeDelete}
                          userLikes={this.props.userLikes}/>
          </div>
        </div>
      </div>
    )
  }
}

export default SimilarProperties;