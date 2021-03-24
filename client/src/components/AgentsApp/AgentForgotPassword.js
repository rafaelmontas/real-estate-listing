import React from 'react';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import gtag, { gaInit } from '../../utils/GaUtils';
import './AgentForgotPassword.css';

class AgentForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      success: false, 
      msg: '',
      err: '',
      alertOpen: false
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    // Track page views GA
    if(process.env.NODE_ENV === 'production') {
      gaInit('G-JQMJWEW91Q', { send_page_view: true, page_title: 'Agent Forgot Password Page' })  
    } else {
      gaInit('G-WFH68VZSHT', { send_page_view: true, page_title: 'Agent Forgot Password Page' })
    }
    gtag('config', 'G-WFH68VZSHT', {
      page_title: 'Agent Forgot Password Page',
      page_path: '/forgot-password',
      send_page_view: false
    })
  }

  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    axios.put('/agent-auth/forgot-password', {email: this.state.email})
         .then(res => {
          console.log(res.data)
          this.setState({success: true, msg: res.data.msg})
         })
         .catch(err => {
          console.log(err.response.data, err.response.status)
          this.setState({err: err.response.data.msg, alertOpen: true})
         })
  }

  handleClose() {
    this.setState({alertOpen: false})
  }

  render() {
    if(this.state.success) {
      return (
        <div className="forgot-password">
          <div className="inner-forgot success">
            <i className="far fa-check-circle"></i>
            <h3>{this.state.msg}</h3>
          </div>
        </div>
      )
    } else {
      return (
        <div className="forgot-password">
          <div className="inner-forgot">
            <div className="forgot-header">
              <h2>Olvidaste tu contraseña?</h2>
              <p>Ingresa tu correro electrónico para enviarte un link y puedas actualizarla</p>
            </div>
            <Snackbar open={this.state.alertOpen}
                    autoHideDuration={4000}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    onClose={this.handleClose}
                    style={{top: '85px'}}>
            <MuiAlert elevation={6} variant="filled" severity="error">{this.state.err}</MuiAlert>
          </Snackbar>
            <form className="forgot-form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" autoComplete="email" id="email"
                        value={this.state.email}
                        placeholder="Correo electrónico"
                        onChange={this.onInputChange}
                        />
              </div>
              <div className="form-group">
                <button type="submit">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      )
    }
  }
}

export default AgentForgotPassword;