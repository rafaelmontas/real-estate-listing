import React from 'react';
import './LandingForm.css';
import gtag from '../../utils/GaUtils';
import { Link } from 'react-router-dom';

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
        <Link to="/signup"
            className="signup-button"
            onClick={this.handleSignupClick}>Registrate</Link>
        <Link to="/login"
            className="login-button"
            onClick={this.handleLoginClick}>Iniciar Sesión</Link>
      </div>
    )
  }
}

export default LandingForm;