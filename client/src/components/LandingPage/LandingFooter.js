import React from 'react';
import './LandingFooter.css';
import logo from '../../demo_img/brand-logo-white.svg';

class LandingFooter extends React.Component {
  render() {
    return (
      <footer className="landing-footer">
        <div className="landing-footer-container">
          <div className="social-media">
            <ul>
              <li>
                <a href="#">
                  <i className="fab fa-facebook-square"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
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