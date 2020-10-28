// import React from 'react';
import React, { useState, useEffect } from "react";
import { Route, Redirect } from 'react-router-dom';
import {userContext} from './userContext';

function PrivateRoute ({component: Component, ...rest}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 150);
    return () => clearTimeout(timer);
  }, [])

  return !loading ? (
    <userContext.Consumer>
      {({user, isLoggedIn, userLoading}) => (isLoggedIn && !userLoading ? <Route {...rest} render={(props) => <Component {...props}/>}/> : <Redirect to="/" />)}
    </userContext.Consumer>
  ) : (<div></div>)
}

export default PrivateRoute;