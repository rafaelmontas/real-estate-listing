import React from 'react';
import './LandingFooter.css';
import logo from '../../demo_img/brand-logo-white.svg';
import ReactGA from 'react-ga';

class LandingFooter extends React.Component {
  render() {
    return (
      <footer className="landing-footer">
        <div className="landing-footer-container">
          <div className="social-media">
            <ul>
              <li>
                <ReactGA.OutboundLink eventLabel="Link to Facebook Page"
                                      to="https://www.facebook.com/Hauzzy-RD-102543455038391"
                                      target="_blank"
                                      action="Facebook Page Clicked">
                  <i className="fab fa-facebook-square"></i>
                </ReactGA.OutboundLink>
              </li>
              <li>
                <ReactGA.OutboundLink eventLabel="Link to Instagram Page"
                                      to="https://www.instagram.com/hauzzyrd/"
                                      target="_blank"
                                      action="Instagram Page Clicked">
                  <i className="fab fa-instagram"></i>
                </ReactGA.OutboundLink>
              </li>
            </ul>
          </div>
          <div className="copyrights">
            <img src={logo} className="brand-logo"/>
            <span>&copy; 2020 hauzzy</span>
          </div>
        </div>
      </footer>
    )
  }
}

export default LandingFooter;