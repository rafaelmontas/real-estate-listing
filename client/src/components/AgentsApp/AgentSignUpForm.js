import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import {Link} from 'react-router-dom';

class AgentSignUpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }
  render() {
    return (
      <form className="agent-register-form">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" name="name" id="name"
                value={this.state.name}
                placeholder="Nombre"
                // onChange={this.onInputChange}
                />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email"
                value={this.state.email}
                placeholder="Dirección de email"
                // onChange={this.onInputChange}
                />
        </div>
        <div className="form-group">
          <div className="password-group">
            <label htmlFor="password">Contraseña</label>
            <Tooltip title="Mínimo 6 caracteres" arrow placement="top">
                <i className="fas fa-question-circle"></i>
            </Tooltip>
          </div>
          <input type="password" name="password" id="password"
                value={this.state.password}
                placeholder="Constraseña"
                // onChange={this.onInputChange}
                />
        </div>
        <div className="form-group">
          <button type="submit">Registarse</button>
        </div>
        <p className="terms-privacy">
          Accepto los <Link>términos de uso</Link> y <Link>política de privacidad</Link> de Hauzzy.
        </p>
      </form>
    )
  }
}

export default AgentSignUpForm