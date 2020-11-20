import React from 'react';
import './LandingPage.css';
import logo from '../../demo_img/brand-logo-vf.svg';
import rightMap from '../../demo_img/right-img-2.png';

class LandingPage extends React.Component {
  render() {
    return (
      <div className="main-body">
        <nav id="header">
          <div className="nav-container">
            <div className="nav-logo-menu">
              <img src={logo} className="brand-logo"/>
              <span>Caracteristicas <i className="fas fa-angle-down"></i></span>
            </div>
            <div className="contact-button">
              <span>Contactanos</span>
            </div>
          </div>
        </nav>
        <main className="content-container">
          <section className="top-section section">
            <div className="left-info">
              <h1>Una plataforma de bienes raices innovadora</h1>
              <p>Obten acceso a una red inmobiliaria y comienza a conectar con clientes</p>
              <form>
                <input type="email" placeholder="Correo electrónico"/>
                <button type="submit">Enviar <i className="fas fa-arrow-right"></i></button>
              </form>
            </div>
            <div className="right-info">
              <img src={rightMap}/>
            </div>
          </section>
          <section className="solutions-section section">

          </section>
        </main>
      </div>
    )
  }
}

export default LandingPage;