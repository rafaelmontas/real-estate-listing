import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect } from 'react-router-dom';
import {adminContext} from './adminContext';

function PrivateAccount ({component: Component, ...rest}) {
  const [loading, setLoading] = useState(true);
  const status = useContext(adminContext);

  useEffect(() => {
    // console.log(status.isLoggedIn, status.agentLoading)
    if(!status.isLoggedIn && !status.adminLoading) {
      const timer = setTimeout(() => {
        setLoading(false)
      }, 500);
      return () => clearTimeout(timer);  
    } else {
      setLoading(false)
    }
  }, [])

  return !loading ? (
    <adminContext.Consumer>
      {({admin, isLoggedIn, adminLoading}) => (isLoggedIn && !adminLoading ? <Route {...rest} render={(props) => <Component {...props}/>}/> : <Redirect to="/login" />)}
    </adminContext.Consumer>
  ) : (<div></div>)
}

export default PrivateAccount;