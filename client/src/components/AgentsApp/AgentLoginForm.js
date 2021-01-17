import React from 'react';
import {Link} from 'react-router-dom';

class AgentLoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }
  render() {
    return (
      <form className="agent-login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email"
                value={this.state.email}
                placeholder="Dirección de email"
                // onChange={this.onInputChange}
                />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" id="password"
                value={this.state.password}
                placeholder="Constraseña"
                // onChange={this.onInputChange}
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