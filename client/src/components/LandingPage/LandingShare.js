import React from 'react';
import './LandingShare.css'
import {FacebookShareButton, WhatsappShareButton, FacebookIcon, WhatsappIcon} from 'react-share';
import gtag from '../../utils/GaUtils';

class LandingShare extends React.Component {

  handleFBClick() {
    gtag('event', 'share', {
      event_category: 'engagement',
      event_label: 'Facebook share button clicked',
      method: 'Facebook'
    })
  }
  handleWAClick() {
    gtag('event', 'share', {
      event_category: 'engagement',
      event_label: 'Whatsapp share button clicked',
      method: 'Whatsapp'
    })
  }

  render() {
    return (
      <div className="social-share">
        <FacebookShareButton className="fb-share-button"
                             url={"https://www.hauzzy.com"}
                             quote="Se parte de una nueva experiencia en el sector inmobiliario!"
                             onClick={this.handleFBClick}>
          <FacebookIcon size={46} borderRadius={4}/>
          Compartir
        </FacebookShareButton>
        <WhatsappShareButton url={"https://www.hauzzy.com"}
                             className="wa-share-button"
                             onClick={this.handleWAClick}>
          <WhatsappIcon size={46} borderRadius={14}/>
          Compartir
        </WhatsappShareButton>
      </div>
    )
  }
}

export default LandingShare;