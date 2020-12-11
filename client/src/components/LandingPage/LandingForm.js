import React from 'react';
import './LandingForm.css';
import LandingShare from './LandingShare';
import gtag from '../../utils/GaUtils';

class LandingForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      submitSuccess: null
    }
  }
  renderButton() {
    if(this.props.submitStatus) {
      return <button className="submit-success"><i className="far fa-check-circle"></i></button>
    } else {
      return <button type="submit">Enviar <i className="fas fa-arrow-right"></i></button>
    }
  }
  handleFocus() {
    gtag('event', 'click', {
      event_category: 'engagement',
      event_label: 'Input field focused'
    })
  }

  render() {
    if(this.props.submitStatus) {
      return (
        <LandingShare/>
      )
    } else {
      return (
        <form className="landing-email-form" onSubmit={this.props.onSubmit}>
          <input type="email"
                 placeholder="Correo electrónico"
                 value={this.props.emailValue} onChange={(e) => this.props.onEmailChange(e.target.value)}
                 ref={this.props.inputRef}
                 onFocus={this.handleFocus}/>
          <button type="submit">Enviar <i className="fas fa-arrow-right"></i></button>
        </form>
      )
    }
  }
}

export default LandingForm;