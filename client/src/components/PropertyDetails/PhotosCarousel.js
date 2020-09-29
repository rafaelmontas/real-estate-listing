import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import './PhotosCarousel.css'
import image from "../../demo_img/house1.png"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

class PhotosCarousel extends React.Component {
  render() {
    return (
      <div className="carousel-modal">
        <div className="carousel-header">
          <div className="times-x" onClick={this.props.onCloseClick}><i className="fas fa-times"></i></div>
        </div>
        <Carousel infiniteLoop useKeyboardArrows>
          <div>
            <img src={image}/>
          </div>
          <div>
            <img src={image}/>
          </div>
          <div>
            <img src={image}/>
          </div>
        </Carousel>
      </div>
    )
  }
}

export default PhotosCarousel;