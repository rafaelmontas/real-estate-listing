import React from 'react'
import {Link} from 'react-router-dom';
import './MenuItems.css'

class MenuItems extends React.Component {
  render() {
    return (
      <div className="menu-items">
        <div className="top-div">
          <ul>
            <li className="dashboard-button button">
              <Link to="/account/dashboard" onClick={this.props.onSidedrawerClick}>
                <div>
                  <i className="fas fa-tachometer-alt"></i>
                  <span>Dashboard</span>
                </div>
              </Link>
            </li>
            <li className="listings-button button">
              <Link to="/account/listings" onClick={this.props.onSidedrawerClick}>
                <div>
                  <i className="far fa-building"></i>
                  <span>Mis Propiedades</span>
                </div>
              </Link>
            </li>
            <li className="performance-button button">
              <Link to="/account/performance" onClick={this.props.onSidedrawerClick}>
                <div>
                  <i className="fas fa-chart-line"></i>
                  <span>Desempeño</span>
                </div>
              </Link>
            </li>
            <li className="new-listing-button button">
              <Link to="/account/new-listing" onClick={this.props.onSidedrawerClick}>
                <div>
                  <i className="fas fa-plus"></i>
                  <span>Nueva Propiedad</span>
                </div>
              </Link>
            </li>
            <li className="profile-button button">
              <Link to="/account/profile" onClick={this.props.onSidedrawerClick}>
                <div>
                  <i className="fas fa-user-circle"></i>
                  <span>Mi Perfil</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="bottom-div">
          <ul>
            {/* <div className="hauzzy-button button"> */}
              <Link to="//hauzzy.com" target="_blank" className="button">
                <i className="fas fa-external-link-alt"></i>
                <span>Ir a hauzzy.com</span>
              </Link>
            {/* </div> */}
            <div className="logout-button button">
              <i className="fas fa-sign-out-alt"></i>
              <span>Cerrar Sesión</span>
            </div>
          </ul>
        </div>
      </div>
    )
  }
}

export default MenuItems