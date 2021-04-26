import React from "react";
import appStoreApple from "../demo_img/appstore.png";
import appStoreAndroid from "../demo_img/google-play-badge.png";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer-container">
        <div className="footer-main">
          <h4 className="footer-header-name">hauzzy</h4>
          <div className="footer-description">
            hauzzy es la plataforma inmobiliaria más facil de utilizar e innovadora para realizar 
            tus busquedas de propiedades en venta y alquiler.
          </div>
          <div className="footer-copyright">&copy; Hauzzy S.R.L.</div>
          <div className="footer-follow-us">
            <a href="https://www.facebook.com/Hauzzy-RD-102543455038391" target="_blank">
              <i className="fab fa-facebook-square"></i>
            </a>
            {/* <a href="/"><i className="fab fa-twitter"></i></a> */}
            <a href="https://www.instagram.com/hauzzyrd" target="_blank">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          {/* <div className="footer-badges">
            <a href="/">
              <img className="apple" src={appStoreApple} alt="Apple Store Badge"/>
            </a>
            <a href="/">
              <img className="android" src={appStoreAndroid} alt="Google Play Store Badge"/>
            </a>
          </div> */}
        </div>
      </footer>
    )
  }
}

export default Footer;