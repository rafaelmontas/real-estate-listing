import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Account from './Account';
import AgentSignUp from './AgentSignUp'
import AgentLogin from './AgentLogin';
import { withRouter } from "react-router";
import axios from 'axios';
import {agentContext} from './agentContext';
import './AgentsApp.css'

class AgentsApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      agent: null,
      error: {
        msg: '',
        status: null
      },
      agentLoading: false
    }
    this.getAgent = this.getAgent.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    this.getAgent()
    if(this.props.location.pathname === '/') {
      this.props.history.replace({pathname: '/account/dashboard'})
    }
  }

  getAgent() {
    console.log('getAgent called!!!')
    console.log(`${localStorage.getItem('agent-jwt')}`)
    const agentJwt = localStorage.getItem('agent-jwt')
    this.setState({agentLoading: true})
    axios({method: 'get', url: '/agent-auth/agent', headers: {'agent-auth': agentJwt}})
        .then(agent => {
          console.log(agent.data)
          this.setState({
            agent: agent.data,
            isLoggedIn: true,
            error: {msg: '', status: null},
            agentLoading: false
          })
        })
        .catch(err => {
          console.log(err.response.data, err.response.status)
          localStorage.removeItem('agent-jwt')
          this.setState({
            agent: null,
            isLoggedIn: false,
            error: {msg: err.response.data.msg, status: err.response.status},
            agentLoading: false
          })
        })
  }
  logOut() {
    localStorage.removeItem('agent-jwt');
    this.setState({
      isLoggedIn: false,
      agent: null,
      error: {msg: '', status: null}
    })
  }

  render() {
    const value = {
      agent: this.state.agent,
      getAgent: this.getAgent,
      isLoggedIn: this.state.isLoggedIn,
      logOut: this.logOut,
      agentLoading: this.state.agentLoading
    }
    return (
      <agentContext.Provider value={value}>
        <Switch>
          <Route path="/account" component={Account}/>
          <Route path="/signup" exact component={AgentSignUp}/>
          <Route path="/login" exact component={AgentLogin}/>
          {/* <Route path="/solutions" exact component={AgentLogin}/> */}
        </Switch>
      </agentContext.Provider>
    )
  }
}

export default withRouter(AgentsApp);