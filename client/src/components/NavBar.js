import React from "react";
import PropTypes from 'prop-types';
import MapToggleMobile from './MapToggleMobile';
import {Link} from 'react-router-dom';
import AutoCompleteText from './SearchBar/AutoCompleteText';
import {userContext} from './userContext';
import { withRouter } from "react-router-dom";
import logo from '../demo_img/0eb86999-974c-4800-aa96-e72345e58e00_200x200.png';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownOpen: false
    }
    
    this.onUserHover = this.onUserHover.bind(this)
    this.onUserHoverOut = this.onUserHoverOut.bind(this)
    this.onLiClick = this.onLiClick.bind(this)
    this.onLogOutclick = this.onLogOutclick.bind(this)
    this.onFavClick = this.onFavClick.bind(this)
    this.onNewClick = this.onNewClick.bind(this)
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
    if(this.context.isLoggedIn) {
      this.props.history.push({pathname: '/my-hauzzy/favorites'})
    } else {
      this.props.history.push({state: {referer: '/my-hauzzy/favorites'}})
      this.props.onLoginClick()
    }
  }
  onNewClick(e) {
    e.preventDefault()
    if(this.context.isLoggedIn) {
      this.props.history.push({pathname: '/my-hauzzy/new-listing'})
    } else {
      this.props.history.push({state: {referer: '/my-hauzzy/new-listing'}})
      this.props.onLoginClick()
    }
  }

  renderTopRightButton() {
    if(this.props.path === '/properties') {
      return <MapToggleMobile mapOpen={this.props.mapOpen} onMapToggleClick={this.props.onMapToggleClick} />
    } else {
      return null
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
                <i className="fas fa-user-circle"></i>Perfíl
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
          <li>
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
          </li>
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
          <span className="menu-item button secondary" onClick={this.props.onLoginClick}>Iniciar Sesión</span>
          <span href="/" className="menu-item button primary" onClick={this.props.onRegisterClick}>Registrarse</span>
        </div>
      )
    }
  }

  render() {
    return (
      <nav className="navbar-fixed-top">
        <div className="nav-container">
          <div className="navbar-menu-form">
            <span onClick={this.props.onSideDrawerToggleClick} className="toggle bars">
              <i className="fas fa-bars"></i>
            </span>
            <img src={logo} className="brand-logo"/>
            <AutoCompleteText search={this.props.search}
                              initialStateSearch={this.props.initialStateSearch}
                              loadingStatus={this.props.loadingStatus}
                              onMobileSearchClick={this.props.onMobileSearchClick}/>
          </div>
          <div className="navbar-menu-right">
            {this.renderTopRightButton()}
            <Link to="/my-hauzzy/favorites" onClick={this.onFavClick} className="menu-item first"><i className="far fa-heart"></i>Favoritos</Link>
            <Link to="/my-hauzzy/new-listing" onClick={this.onNewClick} className="menu-item second"><i className="fas fa-plus"></i>Publicar</Link>
            {/* <a href="/" className="menu-item second"><i className="fas fa-plus"></i>Publicar</a> */}
            <div className="user-login-button">
              {!this.context.userLoading && this.renderUserButton()}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

NavBar.propTypes = {
  onSideDrawerToggleClick: PropTypes.func.isRequired,
  mapOpen: PropTypes.bool,
  onMapToggleClick: PropTypes.func,
  onLoginClick: PropTypes.func
}

NavBar.contextType = userContext;
export default withRouter(NavBar);