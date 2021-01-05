import React from 'react';
import './LandingFooter.css';
import logo from '../../demo_img/brand-logo-white.svg';
import gtag from '../../utils/GaUtils';

class LandingFooter extends React.Component {
  
  handleFbClick(e) {
    e.preventDefault()
    gtag('event', 'click', {
      event_category: 'outbound',
      event_label: 'Facebook Page Clicked'
    })
    window.open("https://www.facebook.com/Hauzzy-RD-102543455038391", "_blank")
  }
  handleIgClick(e) {
    e.preventDefault()
    gtag('event', 'click', {
      event_category: 'outbound',
      event_label: 'Instagram Page Clicked'
    })
    window.open("https://www.instagram.com/hauzzyrd", "_blank")
  }


  render() {
    return (
      <footer className="landing-footer">
        <div className="landing-footer-container">
          <div className="social-media">
            <ul>
              <li>
                <a href="https://www.facebook.com/Hauzzy-RD-102543455038391"
                   target="blank"
                   onClick={this.handleFbClick}>
                  <i className="fab fa-facebook-square"></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/hauzzyrd"
                  target="blank"
                  onClick={this.handleIgClick}>
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="copyrights">
            <img src={logo} className="brand-logo"/>
            <span>&copy; 2021 hauzzy</span>
          </div>
        </div>
      </footer>
    )
  }
}

export default LandingFooter;