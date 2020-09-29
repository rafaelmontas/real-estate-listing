import React from "react";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import "./SideDrawer.css";


class SideDrawer extends React.Component {
  render() {
    let drawerClasses = "side-drawer";
    if(this.props.show) {
      drawerClasses = "side-drawer open";
    }

    return (
      <div className={drawerClasses}>
        <div className="top-div">
          <ul>
            <li className="search-button button" onClick={this.props.onMobileSearchClick}>
              <div>
                <i className="fas fa-search"></i>
                <span>Buscar</span>
              </div>
            </li>
            <li className="favorite-button button">
              <Link to="/my-hauzzy/favorites">
                <div>
                  <i className="far fa-heart"></i>
                  <span>Favoritos</span>
                </div>
              </Link>
            </li>
            <li className="saved-search-button button">
              <div>
                <i className="far fa-bell"></i>
                <span>Alertas</span>
              </div>
            </li>
            <li className="separator"></li>
            <li className="manage-property-button button">
              <div>
                <i className="fas fa-house-user"></i>
                <span>Adm. tus Propiedades</span>
              </div>
            </li>
            <li className="post-property-button button">
              <div>
              <i className="far fa-building"></i>
                <span>Públicar Propiedad</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="bottom-div">
          <div className="login-button button" onClick={this.props.onLoginClick}>
            <i className="far fa-arrow-alt-circle-right"></i>
            Iniciar Sesión
          </div>
          <div className="download-app button">
            <i className="fas fa-mobile-alt"></i>
            Descarga la App
          </div>
        </div>
        
      </div>
    )
  }
}

SideDrawer.propTypes = {
  show: PropTypes.bool.isRequired,
  onLoginClick: PropTypes.func
}

export default SideDrawer;