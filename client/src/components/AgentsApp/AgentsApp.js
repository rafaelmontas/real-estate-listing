import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Account from './Account';
import AgentSignUp from './AgentSignUp'
import AgentLogin from './AgentLogin';
import { withRouter } from "react-router";
import './AgentsApp.css'

class AgentsApp extends React.Component {
  componentDidMount() {
    if(this.props.location.pathname === '/') {
      this.props.history.replace({pathname: '/account/dashboard'})
    }
  }
  render() {
    return (
        <Switch>
          <Route path="/account" component={Account}/>
          <Route path="/signup" exact component={AgentSignUp}/>
          <Route path="/login" exact component={AgentLogin}/>
          {/* <Route path="/solutions" exact component={AgentLogin}/> */}
        </Switch>
    )
  }
}

export default withRouter(AgentsApp);