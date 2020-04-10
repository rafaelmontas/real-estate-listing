import React from "react";
import appStoreApple from "../demo_img/appstore.png";
import appStoreAndroid from "../demo_img/google-play-badge.png";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer-container">
        <div className="footer-main">
          <h4 className="footer-header-name">NewApp</h4>
          <div className="footer-description">
            NewApp is the easiest way to search for apartments for rent. Apply for the listings you want and post your rental properties.
          </div>
          <div className="footer-copyright">&copy; NewApp S.R.L.</div>
          <div className="footer-follow-us">
            <a href="/"><i className="fab fa-facebook-square"></i></a>
            <a href="/"><i className="fab fa-twitter"></i></a>
            <a href="/"><i className="fab fa-instagram"></i></a>
          </div>
          <div className="footer-badges">
            <a href="/"><img className="apple" src={appStoreApple} alt="Apple Store Badge"/></a>
            <a href="/"><img className="android" src={appStoreAndroid} alt="Google Play Store Badge"/></a>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;