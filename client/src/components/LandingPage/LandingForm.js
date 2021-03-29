import React from 'react';
import './LandingForm.css';
import gtag from '../../utils/GaUtils';

class LandingForm extends React.Component {
  
  handleSignupClick() {
    gtag('event', 'click', {
      event_category: 'engagement',
      event_label: 'Landing Signup Click'
    })
  }
  handleLoginClick() {
    gtag('event', 'click', {
      event_category: 'engagement',
      event_label: 'Landing Login Click'
    })
  }

  render() {
    return (
      <div className="signup-login-buttons">
        <a href="http://agent.myhauzzy.com:3000/signup"
            className="signup-button"
            onClick={this.handleSignupClick}>Registrate</a>
        <a href="http://agent.myhauzzy.com:3000/login"
            className="login-button"
            onClick={this.handleLoginClick}>Iniciar Sesión</a>
      </div>
    )
  }
}

export default LandingForm;