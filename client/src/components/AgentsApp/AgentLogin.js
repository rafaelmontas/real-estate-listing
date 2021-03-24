import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../demo_img/brand-logo-vf.svg';
import AgentLoginForm from './AgentLoginForm'
import {agentContext} from './agentContext';
import CircularProgressSpinner from '../CircularProgressSpinner'
import gtag, { gaInit } from '../../utils/GaUtils';
import ReactPixel from 'react-facebook-pixel';
import publicIp from "public-ip";
import './AgentLogin.css'

class AgentLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }
  async componentDidMount() {
    // console.log(this.context.isLoggedIn, this.context.agentLoading)
    this.timer = setTimeout(() => {
      if(this.context.isLoggedIn) {
        this.props.history.push('/account/dashboard')
      }
      this.setState({loading: false})
      // console.log(this.context.isLoggedIn, this.context.agentLoading)
      
    }, 1000)
    // Track page views GA
    if(process.env.NODE_ENV === 'production') {
      gaInit('G-JQMJWEW91Q', { send_page_view: true, page_title: 'Agent Login Page' })  
    } else {
      gaInit('G-WFH68VZSHT', { send_page_view: true, page_title: 'Agent Login Page' })
    }
    gtag('config', 'G-WFH68VZSHT', {
      page_title: 'Agent Login Page',
      page_path: '/login',
      send_page_view: false
    })
    // Init Facebook Pixel
    if(await publicIp.v4() === '186.150.167.185' && process.env.NODE_ENV === 'production') {
      console.log('Internal IP')
      return null
    } else if(await publicIp.v4() !== '186.150.167.185' && process.env.NODE_ENV === 'production') {
      ReactPixel.init('689804211678157')
    } else {
      ReactPixel.init('587601035409958')
    }
    ReactPixel.pageView(); // For tracking page view
  }

  render() {
    if(this.state.loading) {
      return <div style={{height: '100%'}}><CircularProgressSpinner/></div>
    } else {
      return (
        <div className="agent-login-container">
          <div className="inner-login">
            <div className="agent-login">
              <div className="login-header">
                <img src={logo} className="brand-logo"/>
                <h2>Inicia Sesión</h2>
                <p>Necesitas una cuenta? <Link to="/signup">Registrate</Link></p>
              </div>
              <AgentLoginForm/>
            </div>
          </div>
        </div>
      )
    }
  }
}

AgentLogin.contextType = agentContext;
export default AgentLogin;