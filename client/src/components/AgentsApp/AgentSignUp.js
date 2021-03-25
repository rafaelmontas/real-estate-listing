import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../demo_img/brand-logo-vf.svg';
import AgentSignUpForm from './AgentSignUpForm'
import {agentContext} from './agentContext';
import CircularProgressSpinner from '../CircularProgressSpinner'
import gtag, { gaInit } from '../../utils/GaUtils';
import ReactPixel from 'react-facebook-pixel';
import publicIp from "public-ip";
import './AgentSignUp.css'

class AgentSignUp extends React.Component {
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
      gaInit('G-JQMJWEW91Q', { send_page_view: true, page_title: 'Agent Signup Page' })  
    } else {
      gaInit('G-WFH68VZSHT', { send_page_view: true, page_title: 'Agent Signup Page' })
    }
    gtag('config', 'G-WFH68VZSHT', {
      page_title: 'Agent Signup Page',
      page_path: '/signup',
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
        <div className="agent-signup-container">
          <div className="inner-signup">
            <div className="agent-register">
              <div className="register-header">
                <img src={logo} className="brand-logo"/>
                <h2>Crea una cuenta de Hauzzy</h2>
                <p>Tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
              </div>
              <AgentSignUpForm/>
            </div>
          </div>
        </div>
      )
    }
  }
}

AgentSignUp.contextType = agentContext;
export default AgentSignUp;