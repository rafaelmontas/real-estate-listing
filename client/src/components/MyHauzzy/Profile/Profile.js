import React from 'react';
import NumberFormat from 'react-number-format';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Msg from './Msg';
import Backdrop from '../../Backdrop';
import DeleteModal from './DeleteModal'
import {userContext} from '../../userContext';
import gtag, { gaInit } from '../../../utils/GaUtils';
import ReactPixel from 'react-facebook-pixel';
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
      status: null,
      deleteOpen: false
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleBackdropClick = this.handleBackdropClick.bind(this)
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
    // Google Analytics
    let initBody;
    if(this.context.isLoggedIn) {
      initBody = {send_page_view: true, page_title: 'Profile Page', user_id: this.context.user.id}
    } else {
      initBody = {send_page_view: true, page_title: 'Profile Page'}
    }
    let configBody;
    if(this.context.isLoggedIn) {
      configBody = {page_title: 'Profile Page', page_path: '/my-hauzzy/profile', send_page_view: false, user_id: this.context.user.id}
    } else {
      configBody = {page_title: 'Profile Page', page_path: '/my-hauzzy/profile', send_page_view: false}
    }
    if(process.env.NODE_ENV === 'production') {
      gaInit('G-7TW72RB4M9', initBody)
      gtag('config', 'G-7TW72RB4M9', configBody)
    } else {
      gaInit('G-D570FDN0FX', initBody)
      gtag('config', 'G-D570FDN0FX', configBody)
    }
    // Send Page View FB
    ReactPixel.pageView(); // For tracking page view
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

  handleDeleteClick() {
    this.setState({deleteOpen: true})
  }
  handleDelete() {
    // const body = {password: this.state.password}
    // console.log(body)
    const userJwt = localStorage.getItem('user-jwt')
    axios.delete(`/users/${this.props.user.id}`, {
      headers: {
        'user-auth': userJwt
      }
    })
        .then(() => this.context.logOut())
        .catch(err => {
          console.log(err.response.data.msg)
          this.setState({
            successMsg: '',
            errMsg: err.response.data.msg,
            status: err.response.status
          })
        })

  }

  handleBackdropClick() {
    this.setState({
      deleteOpen: false
    });
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
          {this.state.deleteOpen && <Backdrop onBackdropClick={this.handleBackdropClick} backgroundColor={"rgba(0, 0, 0, 0.5)"}/>}
          {this.state.deleteOpen && <DeleteModal onCancelClick={this.handleBackdropClick} onDeleteConfirm={this.handleDelete}/>}
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
                                isNumericString={true}
                                value={this.state.phone}
                                onValueChange={(values) => {
                                  const {formattedValue, value} = values;
                                  this.setState({phone: value})
                                }}
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
                  <span className="delete-button" onClick={this.handleDeleteClick}>Eliminar cuenta?</span>
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

Profile.contextType = userContext;
export default Profile;