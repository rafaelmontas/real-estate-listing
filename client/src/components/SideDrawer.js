import React from "react";
import {Link} from 'react-router-dom';
import {userContext} from './userContext';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import "./SideDrawer.css";


class SideDrawer extends React.Component {
  constructor(props) {
    super(props);
    
    this.onFavClick = this.onFavClick.bind(this)
    this.onNewClick = this.onNewClick.bind(this)
    this.onMyPropertiesClick = this.onMyPropertiesClick.bind(this)
    this.onLogOutclick = this.onLogOutclick.bind(this)
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
  onMyPropertiesClick(e) {
    e.preventDefault()
    if(this.context.isLoggedIn) {
      this.props.history.push({pathname: '/my-hauzzy/listings'})
    } else {
      this.props.history.push({state: {referer: '/my-hauzzy/listings'}})
      this.props.onLoginClick()
    }
  }
  
  onLogOutclick(e) {
    e.preventDefault()
    return this.context.logOut()
  }
  
  renderUserInfo() {
    if(this.context.isLoggedIn) {
      return (
        <div>
          <div className="user-button button" onClick={this.props.onLoginClick}>
            <Link to="/my-hauzzy/profile">
              <i className="fas fa-user-circle"></i>
              {this.context.user.name.length > 0 ? this.context.user.name : this.context.user.email}
            </Link>
          </div>
          <div className="logout-button button">
            <Link to="/logout" onClick={this.onLogOutclick}>
              <i className="fas fa-sign-out-alt"></i>
              Cerrar sesión
            </Link>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="login-button button" onClick={this.props.onLoginClick}>
            <i className="far fa-arrow-alt-circle-right"></i>
            Iniciar Sesión
          </div>
          <div className="register-button button" onClick={this.props.onRegisterClick}>
          <i className="fas fa-user-plus"></i>
            Registrarse
          </div>
        </div>
      )
    }
  }

  
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
              <Link to="/my-hauzzy/favorites" onClick={this.onFavClick}>
                <div>
                  <i className="far fa-heart"></i>
                  <span>Favoritos</span>
                </div>
              </Link>
            </li>
            {/* <li className="saved-search-button button">
              <div>
                <i className="far fa-bell"></i>
                <span>Alertas</span>
              </div>
            </li> */}
            <li className="separator"></li>
            <li className="manage-property-button button">
              <Link to="/my-hauzzy/listings" onClick={this.onMyPropertiesClick}>
                <div>
                  <i className="far fa-building"></i>
                  <span>Mis propiedades</span>
                </div>
              </Link>
            </li>
            <li className="post-property-button button">
              <Link to="/my-hauzzy/new-listing" onClick={this.onNewClick}>
                <div>
                  <i className="fas fa-plus"></i>
                  <span>Públicar Propiedad</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="bottom-div">
          {this.renderUserInfo()}
        </div>
        
      </div>
    )
  }
}

SideDrawer.propTypes = {
  show: PropTypes.bool.isRequired,
  onLoginClick: PropTypes.func
}

SideDrawer.contextType = userContext;
export default withRouter(SideDrawer);