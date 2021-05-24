import React from 'react';
import {userContext} from '../userContext';
import ErrorMsg from './ErrorMsg';
import axios from 'axios';
import gtag, { gaInit } from '../../utils/GaUtils';
import ReactPixel from 'react-facebook-pixel';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      errorMsg: null
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    const body = {name: this.state.name, email: this.state.email, password: this.state.password}
    console.log(body)
    axios.post('/users', body)
          .then(res => {
            console.log(res.data)
            localStorage.setItem('user-jwt', res.data.token)
            gtag('event', 'sign_up', {
              event_category: 'engagement',
              event_label: 'User Registered'
            })
            ReactPixel.track('CompleteRegistration')
            this.context.getUser()
          })
          .then(() => {
            let listId;
            let apiKey;
            if(process.env.NODE_ENV === 'production') {
              listId = process.env.REACT_APP_SENDGRID_REGISTERED_USERS_LIST_ID;
              apiKey = process.env.REACT_APP_SENDGRID_PROD_API_KEY
            } else {
              listId = process.env.REACT_APP_SENDGRID_TEST_LIST_ID;
              apiKey = process.env.REACT_APP_SENDGRID_DEV_API_KEY
            }
            const body = {
              list_ids: [`${listId}`],
              contacts: [{email: this.state.email, custom_fields: {"e1_T": this.state.name}}]
            }
            const config = {
              headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
              }
            }
            return axios.put('https://api.sendgrid.com/v3/marketing/contacts', body, config)
          })
          .catch(err => {
            console.log(err.response.data, err.response.status)
            this.setState({errorMsg: err.response.data.msg})
          })
  }

  render() {
    return (
      <div>
        {this.state.errorMsg && <ErrorMsg errorMsg={this.state.errorMsg}/>}
        <form className="register-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" id="name" value={this.state.name}
                  placeholder="Nombre"
                  onChange={this.onInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={this.state.email}
                  placeholder="Dirección de email"
                  onChange={this.onInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" id="password" value={this.state.password}
                  placeholder="Constraseña"
                  onChange={this.onInputChange} />
          </div>
          <div className="form-group">
            <button type="submit">Registarse</button>
          </div>
          {/* <div className="forgot-pss">
            <a href="/">Olvidaste tu contraseña?</a>
          </div> */}
          {/* Social login */}
          <div className="other-methods" style={{display: "none"}}>
            <span>Continúa con:</span>
            <div className="social-logins">

            </div>
          </div>
        </form>
      </div>
    )
  }
}

Register.contextType = userContext;
export default Register;