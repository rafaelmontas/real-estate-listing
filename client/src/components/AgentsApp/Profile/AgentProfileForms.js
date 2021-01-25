import React from 'react'
import NumberFormat from 'react-number-format';

class AgentProfileForms extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.agent.name,
      email: this.props.agent.email,
      phoneNumber: this.props.agent.phone_number,
      altPhoneNumber: this.props.agent.alt_phone_number,
      agentLicense: this.props.agent.agent_license,
      brokerageName: this.props.agent.brokerage_name,
      password: '',
      newPassword: ''
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
    const body = {
      name: this.state.name,
      email: this.state.email,
      phone_number: this.state.phoneNumber,
      alt_phone_number: this.state.altPhoneNumber,
      agent_license: this.state.agentLicense,
      brokerage_name: this.state.brokerageName,
      password: this.state.password,
      new_password: this.state.newPassword
    }
    this.props.handleUpdate(body)
    this.setState({password: '', newPassword: ''})
  }

  render() {
    return (
      <form className="agent-edit-forms" onSubmit={this.handleSubmit}>
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
          <label htmlFor="alt-phone">Teléfono Secundario</label>
          <NumberFormat 
                        format="(###) ###-####"
                        mask="_"
                        type="tel"
                        placeholder="(___)___-___"
                        name="altPhoneNumber"
                        id="alt-phone"
                        isNumericString={true}
                        // onChange={this.onInputChange}
                        value={this.state.altPhoneNumber}
                        onValueChange={(values) => {
                          const {formattedValue, value} = values;
                          this.setState({altPhoneNumber: value})
                        }}
                        />
        </div>
        <div className="form-group">
          <label htmlFor="brokerageName">Broker Inmobiliario</label>
          <input type="text" name="brokerageName" id="brokerageName" value={this.state.brokerageName}
                placeholder="Broker Inmobiliario"
                onChange={this.onInputChange}
                />
        </div>
        <div className="form-group">
          <label htmlFor="agentLicense">Licencia de agente inmobiliario</label>
          <input type="text" name="agentLicense" id="agentLicense" value={this.state.agentLicense}
                placeholder="# Licencia de agente inmobiliario"
                onChange={this.onInputChange}
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