import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../demo_img/brand-logo-vf.svg';
import AgentLoginForm from './AgentLoginForm'
import './AgentLogin.css'

class AgentLogin extends React.Component {
  render() {
    return (
      <div className="agent-login-container">
        <div className="inner-login">
          <div className="agent-login">
            <div className="login-header">
              <img src={logo} className="brand-logo"/>
              <h2>Inicia Sesión</h2>
              <p>Necesitas una cuenta? <Link to="/signup">Registrate</Link></p>
            </div>
            <AgentLoginForm/>
          </div>
        </div>
      </div>
    )
  }
}

export default AgentLogin;