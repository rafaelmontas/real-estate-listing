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
import gtag, { gaInit } from '../../utils/GaUtils';
import ReactPixel from 'react-facebook-pixel';
import publicIp from "public-ip";
import axios from 'axios';

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      submitSuccess: null
    }
    this.inputRef = React.createRef()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.focusInput = this.focusInput.bind(this)
  }
  async componentDidMount() {
    // Track page views GA
    if(process.env.NODE_ENV === 'production') {
      gaInit('G-JQMJWEW91Q', { send_page_view: false })  
    } else {
      gaInit('G-WFH68VZSHT', { send_page_view: false })
    }
    gtag('event', 'page_view', {
      page_title: 'Landing Page'
    })
    // Init Facebook Pixel
    if(await publicIp.v4() === '186.150.167.185' && process.env.NODE_ENV === 'production') {
      console.log('Internal IP')
      // return null
      ReactPixel.init('689804211678157')
    } else if(await publicIp.v4() !== '186.150.167.185' && process.env.NODE_ENV === 'production') {
      ReactPixel.init('689804211678157')
    } else {
      ReactPixel.init('587601035409958')
    }
    ReactPixel.pageView(); // For tracking page view
    // ReactPixel.track('test_event_code', 'TEST98714');
  }

  handleSubmit(e) {
    e.preventDefault()
    let listId;
    let apiKey;
    if(process.env.NODE_ENV === 'production') {
      listId = process.env.REACT_APP_SENDGRID_WAITING_LIST_ID;
      apiKey = process.env.REACT_APP_SENDGRID_PROD_API_KEY
    } else {
      listId = process.env.REACT_APP_SENDGRID_TEST_LIST_ID;
      apiKey = process.env.REACT_APP_SENDGRID_DEV_API_KEY
    }
    const body = {
      list_ids: [`${listId}`],
      contacts: [{email: this.state.email}]
    }
    const config = {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }
    // console.log(body, config)
    if(this.state.email !== '') {
      axios.put('https://api.sendgrid.com/v3/marketing/contacts', body, config)
          .then(res => {
            // console.log(res.data)
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
            gtag('event', 'form_submit', {
              event_category: 'engagement',
              event_label: 'Email form submitted'
            })
            ReactPixel.track('Lead', {})
          })
          .catch(err => {
            // console.log(err.response.data, err.response.status)
            this.setState({
              submitSuccess: false
            })
          })
    }
  }
  handleEmailChange(value) {
    // console.log(value)
    this.setState({email: value})
  }

  focusInput() {
    this.inputRef.current.focus()
    gtag('event', 'click', {
      event_category: 'engagement',
      event_label: 'Button clicked to focus input field'
    })
  }

  render() {
    return (
      <div className="main-body">
        <LandingNavbar onSubmit={this.handleSubmit}
                       submitStatus={this.state.submitSuccess}
                       onEmailChange={this.handleEmailChange}
                       emailValue={this.state.email}
                       focusInput={this.focusInput}
                       convertion={this.state.submitSuccess}/>
        <ReactNotifications isMobile={true} breakpoint/>
        <main className="content-container">
          <section className="top-section section">
            <div className="left-info">
              <h1>Una plataforma inmobiliaria innovadora</h1>
              <p>Registrate para ser notificado cuando puedas publicar tus propiedades.</p>
              <LandingForm onSubmit={this.handleSubmit}
                           submitStatus={this.state.submitSuccess}
                           onEmailChange={this.handleEmailChange}
                           emailValue={this.state.email}
                           inputRef={this.inputRef}/>
            </div>
            <div className="right-info">
              <img src={rightMap} alt="promotion of map based property search"/>
            </div>
          </section>
          <section className="connection-section section" id="features-section">
            <div className="connection-img">
              <img src={connectionImg} alt="promotion of contact form on website"/>
            </div>
            <div className="connection-text">
              <h1>Deja que los clientes se acerquen</h1>
              <p>Posiciónate frente a clientes potenciales que están buscando propiedades
                 y gestiona tus clientes de manera rapida y efectiva.</p>
            </div>
          </section>
          <section className="like-card-section section">
            <div className="left-info">
              <h1>Conoce la popularidad de tus propiedades</h1>
              <p>Mantente al tanto de tus propiedades guardadas y facilitale a tus clientes compartirlas.</p>
            </div>
            <div className="like-card">
              <img src={likeCard} alt="showing like feature"/>
            </div>
          </section>
          <section className="mockup-section section">
            <div className="mockup-side">
              <img src={macbookMockup} alt="showing agent dashboard"/>
            </div>
            <div className="right-info">
              <h1>Tu portafolio en un solo lugar</h1>
              <p>Maneja todo tu inventario inmobiliario con las herramientas que necesitas y comienza a conectar con clientes.</p>
            </div>
          </section>
        </main>
        <LandingFooter/>
      </div>
    )
  }
}

export default LandingPage;