import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../demo_img/brand-logo-vf.svg';
import AgentLoginForm from './AgentLoginForm'
import {agentContext} from './agentContext';
import CircularProgressSpinner from '../CircularProgressSpinner'
import './AgentLogin.css'

class AgentLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    // console.log(this.context.isLoggedIn, this.context.agentLoading)
    this.timer = setTimeout(() => {
      if(this.context.isLoggedIn) {
        this.props.history.push('/account/dashboard')
      }
      this.setState({loading: false})
      // console.log(this.context.isLoggedIn, this.context.agentLoading)
    }, 1000)
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