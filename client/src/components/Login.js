import React from 'react';
import './Login.css'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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
    console.log(this.state.email, this.state.password)
    fetch("/users/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    }).then(response => response.json())
      .then(res => localStorage.setItem('user-jwt', res))
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  render() {
    return (
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
        <div className="forgot-pss">
          <a href="/">Olvidaste tu contraseña?</a>
        </div>
        {/* Social login */}
        <div className="other-methods" style={{display: "none"}}>
          <span>Continúa con:</span>
          <div className="social-logins">

          </div>
        </div>
      </form>
    )
  }
}

export default Login;