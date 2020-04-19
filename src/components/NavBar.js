import React from "react";
import PropTypes from 'prop-types';

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar-fixed-top">
        <div className="nav-container">
          <div className="navbar-menu-form">
            <span onClick={this.props.onSideDrawerToggleClick} className="toggle bars">
              <i className="fas fa-bars"></i>
            </span>
            <span className="logo-img"><i className="fas fa-home"></i></span>
            <span className="brand-logo-name">NewApp</span>
            <form action="">
              <input type="text"/>
              <button><i className="fas fa-search"></i></button>
            </form>
          </div>
          <div className="navbar-menu-right">
            <span className="map button">Mapa</span>
            <a href="/" className="menu-item first"><i className="far fa-heart"></i>Favoritos</a>
            <a href="/" className="menu-item second"><i className="far fa-building"></i>Publicar</a>
            <a href="/" className="menu-item button secondary">Iniciar Sesión</a>
            <a href="/" className="menu-item button primary">Registrarse</a>
          </div>
        </div>
      </nav>
    )
  }
}

NavBar.propTypes = {
  onSideDrawerToggleClick: PropTypes.func.isRequired
}

export default NavBar;