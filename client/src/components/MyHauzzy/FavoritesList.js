import React from 'react';
import PropertyList from '../PropertyList';

class FavoritesList extends React.Component {
  
  handleCardHover() {
    return;
  }
  handleCardHoverOut() {
    return;
  }
  
  render() {
    return (
      <div className="favorites-list">
        <PropertyList status={false}
                      properties={this.props.properties}
                      onCardHovered={this.handleCardHover}
                      onCardHoverOut={this.handleCardHoverOut}
                      onLike={this.props.onLike}
                      onLikeDelete={this.props.onLikeDelete}
                      userLikes={this.props.userLikes}/>
      </div>
    )
  }
}

export default FavoritesList;