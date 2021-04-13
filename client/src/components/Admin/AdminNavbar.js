import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../demo_img/brand-logo-vf.svg';
import './AdminNavbar.css'
// import {agentContext} from './agentContext';

class AdminNavbar extends React.Component {
  render() {
    return (
      <header id="admin-header">
        <nav className="admin-nav-container">
          <div className="admin-navbar-left">
            <span onClick={this.props.onSideDrawerToggleClick} className="toggle-bars">
              <i className="fas fa-bars"></i>
            </span>
            <a href="/">
              <img src={logo} className="brand-logo"/>
            </a>
          </div>
          <div className="admin-navbar-right">
            <div className="new-listing-link">
              {/* <Link to="/account/new-listing"><i className="fas fa-plus"></i> Nueva Propiedad</Link> */}
            </div>
            <div className="admin-hover-button">
              <button type="button" className="admin-profile-button">
                <div className="inner-admin-info">
                  <i className="fas fa-user-circle"></i>
                  <div className="admin-name-email">Rafael Montas</div>
                  {/* <div className="admin-name-email">{this.context.admin.name || this.context.admin.email}</div> */}
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

// AgentNavbar.contextType = agentContext;
export default AdminNavbar;