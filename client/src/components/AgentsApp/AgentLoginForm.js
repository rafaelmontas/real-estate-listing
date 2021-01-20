import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ErrorMsg from '../Auth/ErrorMsg';

class AgentLoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errorMsg: false
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    const body = {email: this.state.email, password: this.state.password}
    console.log(body)
    axios.post('/agent-auth', body)
          .then(res => {
            console.log(res.data)
            localStorage.setItem('agent-jwt', res.data.token)
            // this.context.getUser()
          })
          .catch(err => {
            console.log(err.response.data, err.response.status)
            this.setState({errorMsg: err.response.data.msg})
          })
  }

  render() {
    return (
      <form className="agent-login-form" onSubmit={this.handleSubmit}>
        {this.state.errorMsg && <ErrorMsg errorMsg={this.state.errorMsg}/>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email"
                value={this.state.email}
                placeholder="Dirección de email"
                onChange={this.onInputChange}
                />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" id="password"
                value={this.state.password}
                placeholder="Constraseña"
                onChange={this.onInputChange}
                />
        </div>
        <div className="form-group">
          <button type="submit">Iniciar Sesión</button>
        </div>
        <p className="terms-privacy">
          <Link>Olvidaste tu contraseña?</Link>
        </p>
      </form>
    )
  }
}

export default AgentLoginForm