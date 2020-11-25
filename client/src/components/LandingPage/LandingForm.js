import React from 'react';
import './LandingForm.css';

class LandingForm extends React.Component {
  render() {
    return (
      <form className="landing-email-form">
        <input type="email" placeholder="Correo electrónico"/>
        <button type="submit">Enviar <i className="fas fa-arrow-right"></i></button>
      </form>
    )
  }
}

export default LandingForm;