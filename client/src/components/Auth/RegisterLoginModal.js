import React from 'react';
import Register from './Register';
import Login from './Login';
import {userContext} from '../userContext';
import { withRouter } from "react-router-dom";
import './RegisterModal.css'

class RegisterLoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      referer: ''
    }
  }

  // componentDidMount() {
  //   if(this.props.location.state) {
  //     if(this.props.location.state.referer) {
  //       this.setState({referer: this.props.location.state.referer})
  //     }
  //   }
  // }
  // componentWillUnmount() {
  //   if(this.state.referer && this.context.isLoggedIn) {
  //     console.log(this.state.referer)
  //     this.props.history.push({pathname: `${this.state.referer}`, state: undefined})
  //   } else {
  //     this.props.history.push({state: undefined})
  //   }
  // }

  renderModalHeader() {
    if(this.props.modalType === 'login') {
      return (
        <div className="register-header">
          <div className="action-text">
            <h2>Inicia Sesión</h2>
            <p>Necesitas una cuenta? <span onClick={this.props.onRegisterSwitch}>Registrate</span></p>
            <a href='https://agent.hauzzy.com/login'>Inicia Sesión como agente inmobiliario</a>
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
            <a href='https://agent.hauzzy.com/signup'>Registrate como agente inmobiliario</a>
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
          {this.props.modalType === 'register' && <Register/>}
          {this.props.modalType === 'login' && <Login referer={this.state.referer}/>}
        </div>
      </div>
    )
  }
}

RegisterLoginModal.contextType = userContext;
export default withRouter(RegisterLoginModal);