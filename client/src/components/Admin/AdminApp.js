import React from 'react';
import Account from './Account';
import {Switch, Route} from 'react-router-dom';

class AdminApp extends React.Component {
  render() {
    return (
      <Switch>
        {/* <PrivateAccount path="/account" component={Account}/> */}
        <Route path="/" component={Account}/>
        {/* <Route path="/login" exact component={AgentLogin}/>
        <Route path="/forgot-password" exact component={AgentForgotPassword}/>
        <Route path="/reset-password/:token" exact component={AgentResetPassword}/> */}
      </Switch>
    )
  }
}

export default AdminApp;