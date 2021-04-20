import React from 'react'
import { withRouter, matchPath } from "react-router";
import {Link} from 'react-router-dom';
import {adminContext} from './adminContext';
import './AdminMenuItems.css'

class AdminMenuItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navSelected: 0
    }
    this.handleNavLinkSelection = this.handleNavLinkSelection.bind(this)
    this.onLogOutclick = this.onLogOutclick.bind(this)
  }

  componentDidMount() {
    // set selected nav item
    this.handleNavLinkSelection()
  }
  componentDidUpdate(prevProps) {
    // set selected nav item
    if(prevProps.location.pathname !== this.props.location.pathname) {
      // console.log('url changed')
      this.handleNavLinkSelection()
    }
  }

  handleNavLinkSelection() {
    const match = matchPath(this.props.location.pathname, {
      path: "/listings/:id",
      exact: false,
      strict: false
    });
    // console.log(match)
    if(this.props.location.pathname === "/dashboard" || this.props.location.pathname === "/dashboard/") {
      this.setState({navSelected: 1})
    } else if(this.props.location.pathname == "/listings" || this.props.location.pathname == "/listings/") {
      this.setState({navSelected: 2})
    } else if(match) {
      this.setState({navSelected: 2})
    } else if(this.props.location.pathname === "/performance" || this.props.location.pathname === "/performance/") {
      this.setState({navSelected: 3})
    } else if(this.props.location.pathname === "/new-listing" || this.props.location.pathname === "/new-listing/") {
      this.setState({navSelected: 4})
    } else if(this.props.location.pathname === "/profile" || this.props.location.pathname === "/profile/") {
      this.setState({navSelected: 5})
    }
  }
  onLogOutclick() {
    return this.context.logOut()
  }


  render() {
    return (
      <div className="menu-items">
        <div className="top-div">
          <ul>
            <li className="dashboard-button button">
              <Link to="/dashboard"
                    className={this.state.navSelected === 1 ? "nav-link selected" : "nav-link"}
                    onClick={this.props.onSidedrawerClick}>
                <div>
                  <i className="fas fa-tachometer-alt"></i>
                  <span>Dashboard</span>
                </div>
              </Link>
            </li>
            <li className="listings-button button">
              <Link to="/listings"
                    className={this.state.navSelected === 2 ? "nav-link selected" : "nav-link"}
                    onClick={this.props.onSidedrawerClick}>
                <div>
                  <i className="far fa-building"></i>
                  <span>Propiedades</span>
                </div>
              </Link>
            </li>
            {/* <li className="profile-button button">
              <Link to="/profile"
                    className={this.state.navSelected === 5 ? "nav-link selected" : "nav-link"}
                    onClick={this.props.onSidedrawerClick}>
                <div>
                  <i className="fas fa-user-circle"></i>
                  <span>Mi Perfil</span>
                </div>
              </Link>
            </li> */}
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
            <div className="logout-button button" onClick={this.onLogOutclick}>
              <i className="fas fa-sign-out-alt"></i>
              <span>Cerrar Sesión</span>
            </div>
          </ul>
        </div>
      </div>
    )
  }
}

AdminMenuItems.contextType = adminContext;
export default withRouter(AdminMenuItems)