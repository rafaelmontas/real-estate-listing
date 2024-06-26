import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import {agentContext} from './agentContext';
import axios from 'axios'
import ErrorMsg from '../Auth/ErrorMsg';
import gtag, { gaInit } from '../../utils/GaUtils';
import ReactPixel from 'react-facebook-pixel';

class AgentSignUpForm extends React.Component {
  constructor(props) {
    super(props)
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
    // console.log(body)
    axios.post('/agents', body)
          .then(res => {
            // console.log(res.data)
            localStorage.setItem('agent-jwt', res.data.token)
            gtag('event', 'sign_up', {
              event_category: 'engagement',
              event_label: 'Agent Registered'
            })
            ReactPixel.track('CompleteRegistration', {content_name: '/signup'})
          })
          .then(() => {
            let listId;
            let apiKey;
            if(process.env.NODE_ENV === 'production') {
              listId = process.env.REACT_APP_SENDGRID_REGISTERED_AGENTS_LIST_ID;
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
          .then(() => {
            this.context.getAgent()
          })
          .catch(err => {
            // console.log(err.response.data, err.response.status)
            this.setState({errorMsg: err.response.data.msg})
          })
  }

  render() {
    return (
      <form className="agent-register-form" onSubmit={this.handleSubmit}>
        {this.state.errorMsg && <ErrorMsg errorMsg={this.state.errorMsg}/>}
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" name="name" autoComplete="name" id="name"
                value={this.state.name}
                placeholder="Nombre"
                onChange={this.onInputChange}
                />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" autoComplete="email" id="email"
                value={this.state.email}
                placeholder="Dirección de email"
                onChange={this.onInputChange}
                />
        </div>
        <div className="form-group">
          <div className="password-group">
            <label htmlFor="password">Contraseña</label>
            <Tooltip title="Mínimo 6 caracteres" arrow placement="top">
                <i className="fas fa-question-circle"></i>
            </Tooltip>
          </div>
          <input type="password" name="password" autoComplete="new-password" id="password"
                value={this.state.password}
                placeholder="Constraseña"
                onChange={this.onInputChange}
                />
        </div>
        <div className="form-group">
          <button type="submit">Registarse</button>
        </div>
        <p className="terms-privacy">
          Acepto los <a href="https://www.hauzzy.com/terms-and-conditions" target="_blank">términos de uso</a> y <a href="https://www.hauzzy.com/privacy-policy" target="_blank">política de privacidad</a> de Hauzzy.
        </p>
      </form>
    )
  }
}

AgentSignUpForm.contextType = agentContext;
export default AgentSignUpForm