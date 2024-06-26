import React from 'react';
import './LandingPage.css';
import LandingNavbar from './LandingNavbar';
import rightMap from '../../demo_img/right-img-2.png';
import rightDashboard from '../../demo_img/dashboard.png'
import searchImg from '../../demo_img/search.png'
import connectionImg from '../../demo_img/contact-form.png'
import macbookMockup from '../../demo_img/macBook-iphone.png'
import listing from '../../demo_img/listing.png'
import LandingFooter from './LandingFooter';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import gtag, { gaInit } from '../../utils/GaUtils';
import ReactPixel from 'react-facebook-pixel';
import publicIp from "public-ip";
import {Link} from 'react-router-dom';

class LandingPage extends React.Component {

  async componentDidMount() {
    console.log(window.location)
    // Track page views GA
    if(process.env.NODE_ENV === 'production') {
      gaInit('G-JQMJWEW91Q', { send_page_view: false })  
    } else {
      gaInit('G-WFH68VZSHT', { send_page_view: false })
    }
    gtag('event', 'page_view', {
      page_title: 'Landing Page'
    })
    try {
      // Init Facebook Pixel
      if(process.env.NODE_ENV === 'production') {
        ReactPixel.init('689804211678157')
      } else {
        ReactPixel.init('587601035409958')
      }
      ReactPixel.pageView(); // For tracking page view
    } catch(err) {
      console.log(err)
      this.props.history.replace({pathname: '/error/500'})
    }
  }

  render() {
    return (
      <div className="main-body">
        <LandingNavbar/>
        <main className="content-container">
          <section className="top-section section">
            <div className="left-info">
              <h1>Ya puedes comenzar a utilizar la plataforma</h1>
              <p>Registrate para comenzar a publicar tus propiedades y posicionarlas entre las primeras disponibles.</p>
              <Link to="/signup" className="landing-button">Comienza a publicar!</Link>
            </div>
            <div className="right-info">
              <img src={rightDashboard} alt="promotion of map based property search"/>
            </div>
          </section>
          <section className="connection-section section" id="features-section">
            <div className="connection-img">
              <img src={searchImg} alt="promotion of contact form on website"/>
            </div>
            <div className="connection-text">
              <h1>Información relevante en tus manos</h1>
              <p>Hauzzy empodera a los usuarios con información actualizada en un diseño moderno y facil de usar.</p>
            </div>
          </section>
          <section className="like-card-section section">
            <div className="left-info">
              <h1>Conoce la popularidad de tus propiedades</h1>
              <p>Mantente al tanto de tus propiedades guardadas y facilitale a tus clientes compartirlas.</p>
            </div>
            <div className="like-card">
              <img src={listing} alt="showing like feature"/>
            </div>
          </section>
          <section className="mockup-section section">
            <div className="mockup-side">
              <img src={connectionImg} alt="showing agent dashboard"/>
            </div>
            <div className="right-info">
              <h1>Deja que los clientes se acerquen</h1>
              <p>Posiciónate frente a clientes potenciales que están buscando propiedades
                 y gestiona tus clientes de manera rápida y efectiva.</p>
            </div>
          </section>
        </main>
        <LandingFooter/>
      </div>
    )
  }
}

export default LandingPage;