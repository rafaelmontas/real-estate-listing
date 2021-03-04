import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../demo_img/brand-logo-vf.svg';
import AgentSignUpForm from './AgentSignUpForm'
import {agentContext} from './agentContext';
import CircularProgressSpinner from '../CircularProgressSpinner'
import './AgentSignUp.css'

class AgentSignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    console.log(this.context.isLoggedIn, this.context.agentLoading)
    this.timer = setTimeout(() => {
      if(this.context.isLoggedIn) {
        this.props.history.push('/account/dashboard')
      }
      this.setState({loading: false})
      console.log(this.context.isLoggedIn, this.context.agentLoading)
    }, 1000)
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