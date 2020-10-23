import React from "react";
import PropTypes from 'prop-types';
import MapToggleMobile from './MapToggleMobile';
import {Link} from 'react-router-dom';
import AutoCompleteText from './SearchBar/AutoCompleteText';
import {userContext} from './userContext';

class NavBar extends React.Component {
  
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
        <button type="button">
          <div className="inner-user-info">
            <i className="fas fa-user-circle"></i>
            <div className="name-email">
              {this.context.user.name.length > 0 ? this.context.user.name : this.context.user.email}
            </div>
          </div>
        </button>
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
            <span className="logo-img"><i className="fas fa-home"></i></span>
            <Link to="/"><span className="brand-logo-name">hauzzy</span></Link>
            <AutoCompleteText search={this.props.search}
                              initialStateSearch={this.props.initialStateSearch}
                              loadingStatus={this.props.loadingStatus}
                              onMobileSearchClick={this.props.onMobileSearchClick}/>
          </div>
          <div className="navbar-menu-right">
            {this.renderTopRightButton()}
            <Link to="/my-hauzzy/favorites" className="menu-item first"><i className="far fa-heart"></i>Favoritos</Link>
            <a href="/" className="menu-item second"><i className="far fa-building"></i>Publicar</a>
            <div className="user-login-button">
              {this.renderUserButton()}
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
export default NavBar;