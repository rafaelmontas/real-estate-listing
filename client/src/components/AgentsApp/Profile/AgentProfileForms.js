import React from 'react'
import NumberFormat from 'react-number-format';

class AgentProfileForms extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      newPassword: ''
    }
    this.onInputChange = this.onInputChange.bind(this)
  }

  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <form className="agent-edit-forms">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" name="name" id="name" value={this.state.name}
                placeholder="Nombre"
                onChange={this.onInputChange}
                />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" name="email" id="email" value={this.state.email}
                placeholder="Email"
                onChange={this.onInputChange}
                />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <NumberFormat 
                        format="(###) ###-####"
                        mask="_"
                        type="tel"
                        placeholder="(___)___-___"
                        name="phoneNumber"
                        id="phone"
                        isNumericString={true}
                        // onChange={this.onInputChange}
                        value={this.state.phoneNumber}
                        onValueChange={(values) => {
                          const {formattedValue, value} = values;
                          this.setState({phoneNumber: value})
                        }}
                        />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña Actual</label>
          <input type="password" name="password" id="password" value={this.state.password}
                placeholder="Constraseña"
                onChange={this.onInputChange}
                />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">Nueva Contraseña</label>
          <input type="password" name="newPassword" id="newPassword" value={this.state.newPassword}
                placeholder="Ingresar nueva constraseña"
                onChange={this.onInputChange}
                />
        </div>
        <div className="profile-actions">
          <button type="submit" className="update-profile">Actualizar Perfil</button>
          <span className="delete-button"
          // onClick={this.handleDeleteClick}
          >Eliminar cuenta?</span>
        </div>
      </form>
    )
  }
}

export default AgentProfileForms