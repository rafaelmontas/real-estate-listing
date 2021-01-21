import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../demo_img/brand-logo-vf.svg';
import {agentContext} from './agentContext';

class AgentNavbar extends React.Component {
  render() {
    return (
      <header id="agent-header">
        <nav className="agent-nav-container">
          <div className="agent-navbar-left">
            <span onClick={this.props.onSideDrawerToggleClick} className="toggle-bars">
              <i className="fas fa-bars"></i>
            </span>
            <a href="/">
              <img src={logo} className="brand-logo"/>
            </a>
          </div>
          <div className="agent-navbar-right">
            <div className="new-listing-link">
              <Link to="/account/new-listing"><i className="fas fa-plus"></i> Nueva Propiedad</Link>
            </div>
            <div className="agent-hover-button">
              <button type="button" className="agent-profile-button">
                <div className="inner-agent-info">
                  <i className="fas fa-user-circle"></i>
                  <div className="agent-name-email">{this.context.agent.name || this.context.agent.email}</div>
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

AgentNavbar.contextType = agentContext;
export default AgentNavbar;