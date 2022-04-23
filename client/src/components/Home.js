import React from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";
import {userContext} from './userContext';
import RegisterLoginModal from './Auth/RegisterLoginModal';
import Backdrop from "./Backdrop";
import "./Home.css"

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      registerLoginOpen: false,
      modalTypeOpen: null,
      sideDrawerOpen: false,
      dropDownOpen: false
    }
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleRegisterClose = this.handleRegisterClose.bind(this);
    this.handleLoginSwitch = this.handleLoginSwitch.bind(this);
    this.handleRegisterSwitch = this.handleRegisterSwitch.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.onUserHover = this.onUserHover.bind(this)
    this.onUserHoverOut = this.onUserHoverOut.bind(this)
    this.onLiClick = this.onLiClick.bind(this)
    this.onLogOutclick = this.onLogOutclick.bind(this)
    this.onFavClick = this.onFavClick.bind(this)
  }
  componentDidMount() {
    // Redirect
    // if(this.props.location.pathname === '/') {
    //   this.props.history.replace({pathname: '/properties'})
    // }
    console.log((this.context.isLoggedIn));
  }
  componentDidUpdate(prevProps) {
    if(this.props.loginStatus === true && prevProps.loginStatus === false && this.state.registerLoginOpen === true) {
      this.handleRegisterClose()
    }
  }


  handleLoginClick() {
    this.setState((prevState) => {
      return {registerLoginOpen: !prevState.registerLoginOpen, sideDrawerOpen: false, modalTypeOpen: 'login'}
    });
  }
  handleRegisterClick() {
    this.setState((prevState) => {
      return {registerLoginOpen: !prevState.registerLoginOpen, sideDrawerOpen: false, modalTypeOpen: 'register'}
    });
  }
  handleRegisterClose() {
    this.setState((prevState) => {
      return {registerLoginOpen: !prevState.registerLoginOpen, sideDrawerOpen: false, modalTypeOpen: null}
    });
  }
  handleLoginSwitch() {
    this.setState({modalTypeOpen: 'login'})
  }
  handleRegisterSwitch() {
    this.setState({modalTypeOpen: 'register'})
  }
  handleBackdropClick() {
    this.setState({
      sideDrawerOpen: false,
      loginOpen: false,
      registerLoginOpen: false,
      modalTypeOpen: null
    });
  }

  onUserHover() {
    this.setState({dropDownOpen: true})
  }
  onUserHoverOut() {
    this.setState({dropDownOpen: false})
  }
  onLiClick() {
    this.setState({dropDownOpen: false})
  }
  onLogOutclick(e) {
    e.preventDefault()
    this.setState({dropDownOpen: false})
    return this.context.logOut()
  }
  onFavClick(e) {
    e.preventDefault()
    // gtag('event', 'click', {
    //   event_category: 'engagement',
    //   event_label: 'Favorites button clicked'
    // })
    if(this.context.isLoggedIn) {
      this.props.history.push({pathname: '/my-hauzzy/favorites'})
    } else {
      // this.props.history.push({state: {referer: '/my-hauzzy/favorites'}})
      this.handleLoginClick()
    }
  }

  renderUserButton() {
    if(this.context.isLoggedIn) {
      return (
        <div className="hover-class" style={{position: 'relative'}}>
        <button type="button" className={this.state.dropDownOpen ? "user-button active" : "user-button"} onMouseEnter={this.onUserHover} onMouseLeave={this.onUserHoverOut}>
          <div className="inner-user-info">
            <i className="fas fa-user-circle"></i>
            <div className="name-email">
              {this.context.user.name.length > 0 ? this.context.user.name : this.context.user.email}
            </div>
          </div>
        </button>
        <ul className={this.state.dropDownOpen ? "button-dropdown open" : "button-dropdown"} onMouseEnter={this.onUserHover} onMouseLeave={this.onUserHoverOut}>
          <li>
            <Link to="/my-hauzzy/profile" onClick={this.onLiClick}>
              <div>
                <i className="fas fa-user-circle"></i>Perfil
              </div>
            </Link>
          </li>
          <li>
            <Link to="/my-hauzzy/favorites" onClick={this.onLiClick}>
              <div>
                <i className="far fa-heart"></i>Favoritos
              </div>
            </Link>
          </li>
          {/* <li>
            <Link to="/my-hauzzy/new-listing" onClick={this.onLiClick}>
              <div><i className="fas fa-plus">
                </i>Públicar propiedad
              </div>
            </Link>
          </li>
          <li>
            <Link to="/my-hauzzy/listings" onClick={this.onLiClick}>
              <div>
                <i className="far fa-building"></i>Mis propiedades
              </div>
            </Link>
          </li> */}
          <li>
            <Link to="/logout" onClick={this.onLogOutclick}>
              <div><i className="fas fa-sign-out-alt">
                </i>Cerrar sesión
              </div>
            </Link>
          </li>
        </ul>
        {/* <button type="button" onClick={this.context.logOut}>Cerrar Sesión</button> */}
        </div>
      )
    } else {
      return (
        <div>
          <span className="menu-item button secondary" onClick={this.handleLoginClick}>Iniciar Sesión</span>
          <span className="menu-item button primary" onClick={this.handleRegisterClick}>Registrarse</span>
        </div>
      )
    }
  }


  render() {
    let backdrop;
    if(this.state.sideDrawerOpen || this.state.loginOpen || this.state.registerLoginOpen) {
      backdrop = <Backdrop onBackdropClick={this.handleBackdropClick} backgroundColor={"rgba(0, 0, 0, 0.5)"}/>
    }
    return (
      <div>
        {backdrop}
        <Helmet>
          <title>Hauzzy: Innovadora plataforma inmobiliaria</title>
          <meta name="description" content="Busca propiedades en venta y en alquiler y conecta con profesionales."/>
          <meta property="og:title" content="Hauzzy: Innovadora plataforma inmobiliaria"/>
          <meta property="og:image" content="https://hauzzy-media-assets.s3.us-east-2.amazonaws.com/fb_post_tiny.png"/>
          <meta property="og:description" content="Busca propiedades en venta y en alquiler y conecta con profesionales."/>
          <meta property="og:url" content="https://www.hauzzy.com" />
          <meta property="og:type" content="website"/>

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@hauzzyrd" />
          <meta name="twitter:title" content="Hauzzy: Innovadora plataforma inmobiliaria" />
          <meta name="twitter:description" content="Busca propiedades en venta y en alquiler y conecta con profesionales." />
          <meta name="twitter:image" content="https://hauzzy-media-assets.s3.us-east-2.amazonaws.com/fb_post_tiny.png"/>
        </Helmet>
        <header id="header">
          <div className="nav-container">
            <nav className="nav-menu">
              <div className="side-drawer" id="side-drawer">
                <div className="top-div">
                  <a href="/properties">
                    <i className="fas fa-search"></i>
                    <span>Buscar</span>
                  </a>
                  <a href="/my-hauzzy/favorites">
                    <i className="far fa-heart"></i>
                    <span>Favoritos</span>
                  </a>
                  <span></span>
                  <a href="https://agent.hauzzy.com/account/new-listing">
                    <i className="fas fa-plus"></i>
                    <span>Publicar Propiedad</span>
                  </a>
                </div>
              </div>
              <span className="toggle bars" id="burger-menu">
                <i className="fas fa-bars"></i>
              </span>
              <div className="main-logo">
                <a href="/">
                  <img src="/media/brand-logo-vf.svg" className="brand-logo"/>
                </a>
              </div>
              <a href="/" className="nav-link">Comprar</a>
              <a href="/" className="nav-link">Alquilar</a>
              {/* <!-- <a href="/" className="nav-link">Agentes</a> --> */}
            </nav>
            <div className="action-menu">
              <a href="https://agent.hauzzy.com/account/new-listing"
                className="action-link nav-link"
                target="_blank">
                <i className="fas fa-plus"></i>
                Publicar
              </a>
              <div className="auth-container">
                <div className="user-login-button">
                  {!this.context.userLoading && this.renderUserButton()}
                </div>
              </div>
            </div>
          </div>
        </header>
        <main>
          {this.state.registerLoginOpen && <RegisterLoginModal modalType={this.state.modalTypeOpen} onCloseClick={this.handleRegisterClose} onLoginSwitch={this.handleLoginSwitch} onRegisterSwitch={this.handleRegisterSwitch}/>}
          <section className="home-page-hero">
            <div className="hero-image"></div>
            <div className='hero-overlay'></div>
          </section>
        </main>
      </div>
    )
  }
}

Home.contextType = userContext;
export default Home;