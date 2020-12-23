import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AgentDashboard from './AgentDashboard';
import AgentLogin from './AgentLogin'
import './AgentsApp.css'

class AgentsApp extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard" exact component={AgentDashboard}/>
          {/* <Route path="/agent/login" exact component={AgentLogin}/> */}
          {/* <Route path="/solutions" exact component={AgentLogin}/> */}
        </Switch>
      </BrowserRouter>
    )
  }
}

export default AgentsApp;