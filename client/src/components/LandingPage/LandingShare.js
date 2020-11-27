import React from 'react';
import './LandingShare.css'
import {FacebookShareButton, WhatsappShareButton, FacebookIcon, WhatsappIcon} from 'react-share';

class LandingShare extends React.Component {
  render() {
    return (
      <div className="social-share">
        <FacebookShareButton className="fb-share-button"
                             url={"https://www.hauzzy.com"}
                             quote="Se parte de una nueva experiencia en el sector inmobiliario!">
          <FacebookIcon size={46} borderRadius={4}/>
          Compartir
        </FacebookShareButton>
        <WhatsappShareButton url={"https://www.hauzzy.com"} className="wa-share-button">
          <WhatsappIcon size={46} borderRadius={14}/>
          Compartir
        </WhatsappShareButton>
      </div>
    )
  }
}

export default LandingShare;