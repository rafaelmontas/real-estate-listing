import React from 'react';
import Login from './Login';
import './LoginModal.css'

class LoginModal extends React.Component {
  render() {
    return (
      <div className="login-modal">
        <div className="container">
          <div className="login-header">
            <div className="action-text">
              <h2>Inicia Sesión</h2>
              <p>Necesitas una cuenta? <span>Registrate</span></p>
            </div>
            <span className="close-button" onClick={this.props.onCloseClick}>
              <i className="far fa-times-circle"></i>
            </span>
          </div>
          <Login/>
        </div>
      </div>
    )
  }
}

export default LoginModal;