import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect } from 'react-router-dom';
import {userContext} from './userContext';

function PrivateRoute ({component: Component, ...rest}) {
  const [loading, setLoading] = useState(true);
  const status = useContext(userContext);

  useEffect(() => {
    console.log(status.isLoggedIn, status.userLoading)
    if(!status.isLoggedIn && !status.userLoading) {
      const timer = setTimeout(() => {
        setLoading(false)
      }, 300);
      return () => clearTimeout(timer);  
    } else {
      setLoading(false)
    }
  }, [])

  return !loading ? (
    <userContext.Consumer>
      {({user, isLoggedIn, userLoading}) => (isLoggedIn && !userLoading ? <Route {...rest} render={(props) => <Component {...props}/>}/> : <Redirect to="/" />)}
    </userContext.Consumer>
  ) : (<div></div>)
}

export default PrivateRoute;