import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../demo_img/brand-logo-vf.svg';
import AgentSignUpForm from './AgentSignUpForm'
import './AgentSignUp.css'

class AgentSignUp extends React.Component {
  render() {
    return (
      <div className="agent-signup-container">
        <div className="inner-signup">
          <div className="agent-register">
            <div className="register-header">
              <img src={logo} className="brand-logo"/>
              <h2>Crea una cuenta de Hauzzy</h2>
              <p>Tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
            </div>
            <AgentSignUpForm/>
          </div>
        </div>
      </div>
    )
  }
}

export default AgentSignUp;