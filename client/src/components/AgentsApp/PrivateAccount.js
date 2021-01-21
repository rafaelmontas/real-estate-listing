import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect } from 'react-router-dom';
import {agentContext} from './agentContext';

function PrivateAccount ({component: Component, ...rest}) {
  const [loading, setLoading] = useState(true);
  const status = useContext(agentContext);

  useEffect(() => {
    console.log(status.isLoggedIn, status.agentLoading)
    if(!status.isLoggedIn && !status.agentLoading) {
      const timer = setTimeout(() => {
        setLoading(false)
      }, 500);
      return () => clearTimeout(timer);  
    } else {
      setLoading(false)
    }
  }, [])

  return !loading ? (
    <agentContext.Consumer>
      {({agent, isLoggedIn, agentLoading}) => (isLoggedIn && !agentLoading ? <Route {...rest} render={(props) => <Component {...props}/>}/> : <Redirect to="/login" />)}
    </agentContext.Consumer>
  ) : (<div></div>)
}

export default PrivateAccount;