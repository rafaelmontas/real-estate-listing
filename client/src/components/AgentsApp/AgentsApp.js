import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Account from './Account';
import AgentLogin from './AgentLogin'
import './AgentsApp.css'
import { withRouter } from "react-router";

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
          {/* <Route path="/login" exact component={AgentLogin}/> */}
          {/* <Route path="/solutions" exact component={AgentLogin}/> */}
        </Switch>
    )
  }
}

export default withRouter(AgentsApp);