import React from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";
import {userContext} from './userContext';
import RegisterLoginModal from './Auth/RegisterLoginModal';
import Backdrop from "./Backdrop";
import SideDrawer from "./SideDrawer";
import queryString from 'query-string'
import AutoCompleteMobile from './SearchBar/AutoCompleteMobile';
import AutoCompleteText from './SearchBar/AutoCompleteText';
import appStoreApple from "../demo_img/appstoreblack.svg";
import appStoreAndroid from "../demo_img/google-play-badge.png";
import Footer from "./Footer";
import "./Home.css"

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      registerLoginOpen: false,
      modalTypeOpen: null,
      sideDrawerOpen: false,
      dropDownOpen: false,
      mobileSearchOpen: false,
      isLoading: false
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
    this.handleSideDrawerToggleClick = this.handleSideDrawerToggleClick.bind(this)
    this.handleMobileSearchClick = this.handleMobileSearchClick.bind(this);
    this.handleCloseMobileSearchClick = this.handleCloseMobileSearchClick.bind(this);
    this.searchProperties = this.searchProperties.bind(this)
  }
  componentDidMount() {
    // Redirect
    // if(this.props.location.pathname === '/') {
    //   this.props.history.replace({pathname: '/properties'})
    // }
    console.log(this.context.isLoggedIn);
    console.log(this.props)
  }
  componentDidUpdate(prevProps) {
    if(this.props.loginStatus === true && prevProps.loginStatus === false && this.state.registerLoginOpen === true) {
      this.handleRegisterClose()
    }
    if(this.props.loginStatus === false && prevProps.loginStatus === true && this.state.sideDrawerOpen === true) {
      this.setState({sideDrawerOpen: false})
    }
  }

  handleSideDrawerToggleClick() {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  }
  handleMobileSearchClick() {
    if(this.state.mobileSearchOpen !== true && window.innerWidth <= 770) {
      this.setState({mobileSearchOpen: true, sideDrawerOpen: false});
    }
  }
  handleCloseMobileSearchClick() {
    this.setState({mobileSearchOpen: false})
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

  searchProperties(province, sector, listingType, minPrice, maxPrice, bedrooms, bathrooms, propertyType) {
    this.props.history.push({
      pathname: "/properties",
      search: `?province=${province}&sector=${sector}&listing_type=${listingType}&minPrice=${minPrice}&maxPrice=${maxPrice}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&property_type=${propertyType}`
    })
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
              {this.state.mobileSearchOpen && <AutoCompleteMobile onCloseMobileSearchClick={this.handleCloseMobileSearchClick} initialStateSearch={queryString.parse(this.props.location.search)} search={this.searchProperties}/>}
              <SideDrawer show={this.state.sideDrawerOpen}
                  onMobileSearchClick={this.handleMobileSearchClick}
                  onLoginClick={this.handleLoginClick}
                  onRegisterClick={this.handleRegisterClick} />
              {/* side */}
              {/* <div className="side-drawer" id="side-drawer">
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
              </div> */}
              <span className="toggle bars" id="burger-menu" onClick={this.handleSideDrawerToggleClick}>
                <i className="fas fa-bars"></i>
              </span>
              <div className="main-logo">
                <a href="/">
                  <img src="https://hauzzy-media-assets.s3.us-east-2.amazonaws.com/brand-logo-vf.svg" className="brand-logo"/>
                </a>
              </div>
              <Link to="/properties" className="nav-link">Comprar</Link>
              <Link to="/properties?province=All&sector=All&listing_type=rent&minPrice=0&maxPrice=2000000&bedrooms=0&bathrooms=0&property_type=apartment,house,villa,penthouse" className="nav-link">Alquilar</Link>
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
            <div className='hero-search-wrapper'>
              <div className='search-centered  navbar-menu-form'>
                <h1>Descubre Tu Próxima Propiedad</h1>
                <div className='search-bar'>
                  <AutoCompleteText search={this.searchProperties}
                                    initialStateSearch={queryString.parse(this.props.location.search)}
                                    // loadingStatus={this.props.loadingStatus}
                                    onMobileSearchClick={this.handleMobileSearchClick}/>
                </div>
              </div>
            </div>
          </section>
          <section className='homepage-feature'>
              <h1>Explora inmuebles públicados</h1>
              <div className='city-cards'>
                <div className='city-card-container'>
                  <Link to='properties?province=Distrito%20Nacional&sector=Evaristo%20Morales&listing_type=sale&minPrice=0&maxPrice=2000000&bedrooms=0&bathrooms=0&property_type=apartment,house,villa,penthouse'>
                    <div className='city-card'>
                      <div className='image-back'>
                        <div className='card-text'>
                          <h4>Evaristo Morales, DN</h4>
                          <div className='action-button'>
                            <h5>Ver Propiedades</h5>
                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                          </div>
                        </div>
                        <img src='https://hauzzy-media-assets.s3.us-east-2.amazonaws.com/dn.jpeg'/>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='city-card-container'>
                  <Link to='/properties?province=La%20Altagracia&sector=Bávaro,%20Punta%20Cana&listing_type=sale&minPrice=0&maxPrice=2000000&bedrooms=0&bathrooms=0&property_type=apartment,house,villa,penthouse'>
                    <div className='city-card'>
                      <div className='image-back'>
                        <div className='card-text'>
                          <h4>Bávaro, Punta Cana</h4>
                          <div className='action-button'>
                            <h5>Ver Propiedades</h5>
                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                          </div>
                        </div>
                        <img src='https://hauzzy-media-assets.s3.us-east-2.amazonaws.com/pc.jpeg'/>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='city-card-container'>
                  <Link to='/properties?province=Samaná&sector=Las%20Terrenas&listing_type=sale&minPrice=0&maxPrice=2000000&bedrooms=0&bathrooms=0&property_type=apartment,house,villa,penthouse'>
                    <div className='city-card'>
                      <div className='image-back'>
                        <div className='card-text'>
                          <h4>Las Terrenas, Samaná</h4>
                          <div className='action-button'>
                            <h5>Ver Propiedades</h5>
                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                          </div>
                        </div>
                        <img src='https://hauzzy-media-assets.s3.us-east-2.amazonaws.com/sm.jpeg'/>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
          </section>
          <section className='mobile-app'>
            <div className='mobile-left'>
              <div className='mobile-left-header'>
                <img src='https://hauzzy-media-assets.s3.us-east-2.amazonaws.com/app-logo.svg'/>
                <div className='header-text'>
                  <h3>Hauzzy: Encuentra tu hogar</h3>
                  <p>Utiliza las mejores herramientas para comprar, vender o alquilar una propiedad. Todo en la palma de tu mano.</p>
                </div>
              </div>
              <div className='appstores'>
                <h4>Descarga la app</h4>
                <div className='icons'>
                  <a href="https://apps.apple.com/us/app/hauzzy-find-your-home/id1581286386" target="_blank">
                    <img className="apple" src={appStoreApple} alt="Apple Store Badge"/>
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.hauzzyapp" target="_blank">
                    <img className="android" src={appStoreAndroid} alt="Google Play Store Badge"/>
                  </a>
                </div>
              </div>
            </div>
            <div className='mobile-right'>
              <img src='https://hauzzy-media-assets.s3.us-east-2.amazonaws.com/hauzzy-app.png'/>
            </div>
          </section>
        </main>
        <Footer/>
      </div>
    )
  }
}

Home.contextType = userContext;
export default Home;