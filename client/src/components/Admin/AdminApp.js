import React from 'react'
import Account from './Account'
import {adminContext} from './adminContext'
import axios from 'axios'
import AdminLogin from './AdminLogin'
import AdminSignup from './AdminSignup'
import {Switch, Route} from 'react-router-dom'
import PrivateAccount from './PrivateAccount'
import { withRouter } from "react-router";

class AdminApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      admin: null,
      error: {
        msg: '',
        status: null
      },
      adminLoading: false
    }
    this.getAdmin = this.getAdmin.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    // Get agent info
    this.getAdmin()
    // Add background color to body
    document.body.classList.toggle("background")
    // Redirect
    if(this.props.location.pathname === '/') {
      this.props.history.replace({pathname: '/dashboard'})
    }
  }

  getAdmin() {
    // console.log('getAgent called!!!')
    // console.log(`${localStorage.getItem('admin-jwt')}`)
    const adminJwt = localStorage.getItem('admin-jwt')
    this.setState({adminLoading: true})
    axios({method: 'get', url: '/admin-auth/admin/', headers: {'admin-auth': adminJwt}})
        .then(admin => {
          // console.log(admin.data)
          this.setState({
            admin: admin.data,
            isLoggedIn: true,
            error: {msg: '', status: null},
            adminLoading: false
          })
          if(this.props.location.pathname.includes('/login') || this.props.location.pathname.includes('/signup')) {
            this.props.history.push('/dashboard')
          }
        })
        .catch(err => {
          // console.log(err.response.data, err.response.status)
          localStorage.removeItem('admin-jwt')
          this.setState({
            admin: null,
            isLoggedIn: false,
            error: {msg: err.response.data.msg, status: err.response.status},
            adminLoading: false
          })
        })
  }
  logOut() {
    localStorage.removeItem('admin-jwt');
    this.setState({
      isLoggedIn: false,
      admin: null,
      error: {msg: '', status: null}
    })
  }

  render() {
    const value = {
      admin: this.state.admin,
      getAdmin: this.getAdmin,
      isLoggedIn: this.state.isLoggedIn,
      logOut: this.logOut,
      adminLoading: this.state.adminLoading
    }
    return (
      <adminContext.Provider value={value}>
        <Switch>
          <Route path="/login" exact component={AdminLogin}/>
          <Route path="/signup" exact component={AdminSignup}/>
          <PrivateAccount path="/" component={Account}/>
          {/* <Route path="/forgot-password" exact component={AgentForgotPassword}/>
          <Route path="/reset-password/:token" exact component={AgentResetPassword}/> */}
        </Switch>
      </adminContext.Provider>
    )
  }
}

export default withRouter(AdminApp)