import React from 'react';
import CollageGridSkeleton from './CollageGridSkeleton';

class CollageGrid extends React.Component {
  render() {
    if(this.props.loadingStatus) {
      return <CollageGridSkeleton/>
    }
    else {
      return (
        <div className="collage-grid">
          <div className="media-main">
            <img src={this.props.property.imgSrc} alt="property"></img>
            <div className="photos-badge">
              <i className="far fa-image"></i>
              <span>6</span>
              <span className="photos-text">fotos</span>
            </div>
          </div>
          <div className="second-media">
            <div className="photo-top">
              <img src={this.props.property.imgSrc} alt="property"></img>
            </div>
            <div className="photo-bottom">
              <img src={this.props.property.imgSrc} alt="property"></img>
            </div>
          </div>
        </div>
      ) 
    }
  }
}

export default CollageGrid;