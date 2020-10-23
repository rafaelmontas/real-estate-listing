import React from 'react';
import './RegisterModal.css'

class RegisterLoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: 'login'
    }
  }

  // componentDidMount() {
  //   this.setState({modalType: this.props.modalType})
  // }

  renderModalHeader() {
    if(this.props.modalType === 'login') {
      return (
        <div className="register-header">
          <div className="action-text">
            <h2>Inicia Sesión</h2>
            <p>Necesitas una cuenta? <span onClick={this.props.onRegisterSwitch}>Registrate</span></p>
          </div>
          <span className="close-button" onClick={this.props.onCloseClick}>
            <i className="far fa-times-circle"></i>
          </span>
        </div>
      )
    } else {
      return (
        <div className="register-header">
          <div className="action-text">
            <h2>Registrate</h2>
            <p>Tienes una cuenta? <span onClick={this.props.onLoginSwitch}>Inicia Sesión</span></p>
          </div>
          <span className="close-button" onClick={this.props.onCloseClick}>
            <i className="far fa-times-circle"></i>
          </span>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="register-modal">
        <div className="container">
          {this.renderModalHeader()}
          {/* Register Component */}
        </div>
      </div>
    )
  }
}

export default RegisterLoginModal;