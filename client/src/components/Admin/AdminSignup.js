import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../demo_img/brand-logo-vf.svg'
import CircularProgressSpinner from '../CircularProgressSpinner'
import axios from 'axios'
import {adminContext} from './adminContext'
import ErrorMsg from '../Auth/ErrorMsg'
import './AdminLogin.css'

class AdminSignup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      name: '',
      email: '',
      password: '',
      errorMsg: null
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      // if(this.context.isLoggedIn) {
      //   this.props.history.push('/account/dashboard')
      // }
      this.setState({loading: false})
      // console.log(this.context.isLoggedIn, this.context.agentLoading)
    }, 1000)
  }
  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    const body = {name: this.state.name, email: this.state.email, password: this.state.password}
    console.log(body)
    axios.post('/admins', body)
          .then(res => {
            console.log(res.data)
            localStorage.setItem('admin-jwt', res.data.token)
            this.context.getAdmin()
          })
          .catch(err => {
            console.log(err.response.data, err.response.status)
            this.setState({errorMsg: err.response.data.msg})
          })
  }
  
  render() {
    if(this.state.loading) {
      return <div style={{height: '100%'}}><CircularProgressSpinner/></div>
    } else {
      return (
        <div className="admin-login-container">
          <div className="inner-login">
            <div className="admin-login">
              <div className="register-header">
                <img src={logo} className="brand-logo"/>
                <h2>Administrador <Link to="/login">Inicia Sesión</Link></h2>
              </div>
              <form className="admin-login-form" onSubmit={this.handleSubmit}>
                {this.state.errorMsg && <ErrorMsg errorMsg={this.state.errorMsg}/>}
                <div className="form-group">
                  <label htmlFor="name">Nombre</label>
                  <input type="text" name="name" autoComplete="name" id="name"
                        value={this.state.name}
                        placeholder="Nombre"
                        onChange={this.onInputChange}
                        />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" autoComplete="email" id="email"
                        value={this.state.email}
                        placeholder="Dirección de email"
                        onChange={this.onInputChange}
                        />
                </div>
                <div className="form-group">
                  <div className="password-group">
                    <label htmlFor="password">Contraseña</label>
                  </div>
                  <input type="password" name="password" autoComplete="new-password" id="password"
                        value={this.state.password}
                        placeholder="Constraseña"
                        onChange={this.onInputChange}
                        />
                </div>
                <div className="form-group">
                  <button type="submit">Registarse</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    }
  }
}

AdminSignup.contextType = adminContext
export default AdminSignup