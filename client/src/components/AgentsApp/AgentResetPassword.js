import React from 'react';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import gtag, { gaInit } from '../../utils/GaUtils';
import './AgentForgotPassword.css';

class AgentResetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
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
      gaInit('G-JQMJWEW91Q', { send_page_view: true, page_title: 'Agent Reset Password Page' })  
    } else {
      gaInit('G-WFH68VZSHT', { send_page_view: true, page_title: 'Agent Reset Password Page' })
    }
    gtag('config', 'G-WFH68VZSHT', {
      page_title: 'Agent Reset Password Page',
      page_path: '/reset-password/:token',
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
    axios.put(`/agent-auth/${this.props.location.pathname}`, {password: this.state.password})
         .then(res => {
          console.log(res.data)
          this.setState({success: true, msg: res.data.msg, err: '', alertOpen: true})
          this.timer = setTimeout(() => {
            this.props.history.push({pathname: '/login'})
          }, 3000)
         })
         .catch(err => {
          console.log(err.response.data, err.response.status)
          this.setState({err: err.response.data.msg, alertOpen: true, success: false, msg: ''})
         })
  }

  handleClose() {
    this.setState({alertOpen: false})
  }
  renderAlert() {
    if(this.state.success) {
      return <MuiAlert elevation={6} variant="filled" severity="success">{this.state.msg}</MuiAlert>
    } else {
      return <MuiAlert elevation={6} variant="filled" severity="error">{this.state.err}</MuiAlert>
    }
  }

  render() {
    return (
      <div className="forgot-password">
        <div className="inner-forgot">
          <div className="forgot-header">
            <h2>Actualizar Contraseña</h2>
          </div>
          <Snackbar open={this.state.alertOpen}
                    autoHideDuration={4000}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    onClose={this.handleClose}
                    style={{top: '85px'}}>
            {this.renderAlert()}
          </Snackbar>
          <form className="forgot-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">Nueva Contraseña</label>
              <input type="password" name="password" id="password" value={this.state.password}
                    placeholder="Nueva Constraseña"
                    onChange={this.onInputChange} />
            </div>
            <div className="form-group">
              <button type="submit">Actualizar Contraseña</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default AgentResetPassword;