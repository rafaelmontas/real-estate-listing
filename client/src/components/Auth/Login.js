import React from 'react';
import {userContext} from '../userContext';
import ErrorMsg from './ErrorMsg';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
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
    axios.post('/user-auth', body)
          .then(res => {
            console.log(res.data)
            localStorage.setItem('user-jwt', res.data.token)
            this.context.getUser()
          })
          .catch(err => {
            console.log(err.response.data, err.response.status)
            this.setState({errorMsg: err.response.data.msg})
          })
    // fetch("/users/login", {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email: this.state.email,
    //     password: this.state.password
    //   })
    // }).then(response => {
    //   if(response.status === 200) {
    //     return response.json()
    //   } else {
    //     throw new Error(response.status)
    //   }
    // })
    //   .then(res => {
    //     localStorage.setItem('user-jwt', res)
    //     this.context.getUser()
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //     this.setState({errorMsg: true})
    //   });
  }

  render() {
    return (
      <div>
        {this.state.errorMsg && <ErrorMsg errorMsg={this.state.errorMsg}/>}
        <form className="login-form" onSubmit={this.handleSubmit}>
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
            <button type="submit">Iniciar Sesión</button>
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

Login.contextType = userContext;
export default Login;