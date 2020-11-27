import React from 'react';
import './LandingPage.css';
import LandingNavbar from './LandingNavbar';
import LandingForm from './LandingForm';
import rightMap from '../../demo_img/right-img-2.png';
import connectionImg from '../../demo_img/contact-form.png'
import macbookMockup from '../../demo_img/macBook-iphone.png'
import likeCard from '../../demo_img/like-card.png'
import LandingFooter from './LandingFooter';
import ReactNotifications from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      submitSuccess: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    if(this.state.email !== '') {
      this.setState({
        email: '',
        submitSuccess: true
      })
      store.addNotification({
        title: 'Listo!',
        message: 'Te mantendremos al tanto de nuestras novedades.',
        type: 'success',
        container: 'top-right',
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000
        }
      })
    }
  }
  handleEmailChange(value) {
    console.log(value)
    this.setState({email: value})
  }

  render() {
    return (
      <div className="main-body">
        <LandingNavbar onSubmit={this.handleSubmit}
                       submitStatus={this.state.submitSuccess}
                       onEmailChange={this.handleEmailChange}
                       emailValue={this.state.email}/>
        <ReactNotifications isMobile={true} breakpoint/>
        <main className="content-container">
          <section className="top-section section">
            <div className="left-info">
              <h1>Una plataforma de bienes raices innovadora</h1>
              <p>Obten acceso a una red inmobiliaria y comienza a conectar con clientes</p>
              <LandingForm onSubmit={this.handleSubmit}
                           submitStatus={this.state.submitSuccess}
                           onEmailChange={this.handleEmailChange}
                           emailValue={this.state.email}/>
            </div>
            <div className="right-info">
              <img src={rightMap}/>
            </div>
          </section>
          <section className="connection-section section" id="features-section">
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
        <LandingFooter/>
      </div>
    )
  }
}

export default LandingPage;