import React from 'react';
import './LandingPage.css';
import logo from '../../demo_img/brand-logo-vf.svg';
import rightMap from '../../demo_img/right-img-2.png';
import connectionImg from '../../demo_img/contact-form.png'
import macbookMockup from '../../demo_img/macBook-iphone.png'
import likeCard from '../../demo_img/like-card.png'

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
          <section className="connection-section section">
            <div className="connection-img">
              <img src={connectionImg}/>
            </div>
            <div className="connection-text">
              <h1>Deja que los clientes se acerquen</h1>
              <p>Posicionate frente a clientes potenciales que están buscando propiedades
                 y gestiona con las herramientas que necesitas para responder de manera rapida, efectiva y ampliar tu red de clientes</p>
            </div>
          </section>
          <section className="like-card-section section">
            <div className="left-info">
              <h1>Deja que los clientes se acerquen</h1>
              <p>Posicionate frente a clientes potenciales que están buscando propiedades
                 y gestiona con las herramientas que necesitas para responder de manera rapida, efectiva y ampliar tu red de clientes</p>
            </div>
            <div className="like-card">
              <img src={likeCard}/>
            </div>
          </section>
          <section className="mockup-section section">
            <div className="mockup-side">
              <img src={macbookMockup}/>
            </div>
            <div className="right-info">
              <h1>Deja que los clientes se acerquen</h1>
              <p>Posicionate frente a clientes potenciales que están buscando propiedades
                 y gestiona con las herramientas que necesitas para responder de manera rapida, efectiva y ampliar tu red de clientes</p>
            </div>
          </section>
        </main>
      </div>
    )
  }
}

export default LandingPage;