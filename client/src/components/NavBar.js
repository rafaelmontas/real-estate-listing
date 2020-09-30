import React from "react";
import PropTypes from 'prop-types';
import MapToggleMobile from './MapToggleMobile';
import {Link} from 'react-router-dom';
import AutoCompleteText from './SearchBar/AutoCompleteText';
import SecondNav from './MyHauzzy/SecondNav';

class NavBar extends React.Component {
  
  renderTopRightButton() {
    if(this.props.path === '/properties') {
      return <MapToggleMobile mapOpen={this.props.mapOpen} onMapToggleClick={this.props.onMapToggleClick} />
    } else {
      return null
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
            <span className="menu-item button secondary" onClick={this.props.onLoginClick}>Iniciar Sesión</span>
            {/* <a href="/" className="menu-item button secondary">Iniciar Sesión</a> */}
            <a href="/" className="menu-item button primary">Registrarse</a>
          </div>
        </div>
        {this.props.path !== '/properties' ? <SecondNav path={this.props.path}/> : null}
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

export default NavBar;