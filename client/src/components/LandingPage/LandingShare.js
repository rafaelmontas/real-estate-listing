import React from 'react';
import './LandingShare.css'
import {FacebookShareButton, WhatsappShareButton, FacebookIcon, WhatsappIcon} from 'react-share';
import ReactGA from 'react-ga';

class LandingShare extends React.Component {
  // componentDidMount() {
  //   ReactGA.initialize('UA-184126949-1');
  // }

  handleFBClick() {
    ReactGA.event({
      category: 'Social',
      action: 'Facebook share button clicked'
    })
  }
  handleWAClick() {
    ReactGA.event({
      category: 'Social',
      action: 'Whatsapp share button clicked'
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