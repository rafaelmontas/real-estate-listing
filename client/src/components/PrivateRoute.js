import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {userContext} from './userContext';

function PrivateRoute ({component: Component, ...rest}) {
  return (
    // <userContext.Consumer>
    //   {(value) => <Route {...rest}
    //                      render={props =>
    //                         value ? (
    //                           <Component {...props}/>
    //                         ) : (
    //                           <Redirect to="/" />
    //                         )}
      
    //   />}
    // </userContext.Consumer>
    <userContext.Consumer>
      {({user, isLoggedIn}) => (isLoggedIn ? <Route {...rest} render={(props) => <Component {...props}/>}/> : <Redirect to="/" />)}
    </userContext.Consumer>
    // <Route {...rest} render={(props) => (
    //   <Component {...props}/>
    // )}/>
  )
}

export default PrivateRoute;