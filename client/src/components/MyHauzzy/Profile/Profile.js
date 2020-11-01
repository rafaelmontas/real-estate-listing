import React from 'react';
import NumberFormat from 'react-number-format';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Msg from './Msg';
import './Profile.css'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      newPassword: '',
      successMsg: '',
      errMsg: '',
      status: null
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    console.log(this.props.user)
    if(this.props.user) {
      this.setState({
        name: this.props.user.name,
        email: this.props.user.email,
        phone: this.props.user.phone_number ? this.props.user.phone_number : ''
      })
    }
  }
  componentDidUpdate(prevProps) {
    if(prevProps.user !== this.props.user) {
      this.setState({
        name: this.props.user.name,
        email: this.props.user.email,
        phone: this.props.user.phone_number ? this.props.user.phone_number : ''
      })
    }
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
      phone_number: this.state.phone,
      password: this.state.password,
      new_password: this.state.newPassword
    }
    console.log(body)
    const userJwt = localStorage.getItem('user-jwt')
    axios.put(`/users/${this.props.user.id}`, body, {headers: {'user-auth': userJwt}})
        .then(res => {
          console.log(res.data.msg)
          this.setState({
            successMsg: res.data.msg,
            status: res.status,
            password: '',
            newPassword: '',
            errMsg: ''
          })
        })
        .catch(err => {
          console.log(err.response.data.msg)
          this.setState({
            successMsg: '',
            errMsg: err.response.data.msg,
            status: err.response.status
          })
        })
  }
  renderMessage() {
    if(this.state.successMsg || this.state.errMsg) {
      if(this.state.successMsg) {
        return <Msg msg={this.state.successMsg} status={this.state.status}/>
      } else {
        return <Msg msg={this.state.errMsg} status={this.state.status}/>
      }
    }
  }

  render() {
    if(this.props.user) {
      return (
        <div className="profile-page">
          {this.renderMessage()}
          <h1 className="profile-header">Editar perfil</h1>
          <div className="profile-info">
            <form className="profile-form" onSubmit={this.handleSubmit}>
              <div className="form-left">
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
                                name="phone"
                                id="phone"
                                onChange={this.onInputChange}
                                value={this.state.phone}
                                />
                </div>
              </div>
              <div className="form-right">
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
                  {/* <Link to="/my-hauzzy/profile/update"> */}
                    <button type="submit" className="update-profile">Actualizar Perfil</button>
                  {/* </Link> */}
                  <span className="delete-button">Eliminar cuenta?</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

export default Profile;