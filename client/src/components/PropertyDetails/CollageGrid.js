import React from 'react';
import CollageGridSkeleton from './CollageGridSkeleton';

class CollageGrid extends React.Component {
  renderSecondMedia() {
    if(this.props.pictures.length === 1) {
      return (
        <div className="second-media">
          <div className="photo-top">
            <img src="https://hauzzy-media-assets.s3.us-east-2.amazonaws.com/photo_placeholder.jpeg" alt="property"/>
          </div>
          <div className="photo-bottom">
            <img src="https://hauzzy-media-assets.s3.us-east-2.amazonaws.com/photo_placeholder.jpeg" alt="property"/>
          </div>
        </div>
      )
    } else if(this.props.pictures.length === 2) {
      return (
        <div className="second-media">
          <div className="photo-top">
            <img src={this.props.pictures[1].location} alt="property"/>
          </div>
          <div className="photo-bottom">
            <img src="https://hauzzy-media-assets.s3.us-east-2.amazonaws.com/photo_placeholder.jpeg" alt="property"/>
          </div>
        </div>
      )
    } else if(this.props.pictures.length === 3) {
      return (
        <div className="second-media">
          <div className="photo-top">
            <img src={this.props.pictures[1].location} alt="property"/>
          </div>
          <div className="photo-bottom">
            <img src={this.props.pictures[2].location} alt="property"/>
          </div>
        </div>
      )
    }
  }
  render() {
    if(this.props.loadingStatus) {
      return <CollageGridSkeleton/>
    }
    else {
      return (
        <div className="collage-grid" onClick={this.props.onCollageClick}>
          <div className="media-main">
            <img src={this.props.pictures[0].location} alt="property"/>
            <div className="photos-badge">
              <i className="far fa-image"></i>
              <span>{this.props.pictures.length}</span>
              <span className="photos-text">fotos</span>
            </div>
          </div>
          {this.renderSecondMedia()}
        </div>
      ) 
    }
  }
}

export default CollageGrid;