import React from 'react';
import Home from './Home';
import MainSearch from './MainSearch';
import MyHauzzy from './MyHauzzy/MyHauzzy';
import PrivateRoute from './PrivateRoute';
import {userContext} from './userContext';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { createBrowserHistory } from "history";
import axios from 'axios';
const history = createBrowserHistory();


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: null,
      error: {
        msg: '',
        status: null
      }
    }
    this.getUser = this.getUser.bind(this);
  }
  
  componentDidMount() {
    // Check token and load user
    console.log(`${localStorage.getItem('user-jwt')}`)
    const userJwt = localStorage.getItem('user-jwt')
    
    axios({method: 'get', url: '/user-auth/user', headers: {'user-auth': userJwt}})
        .then(user => {
          console.log(user.data)
          this.setState({
            user: user.data,
            isLoggedIn: true,
            error: {msg: '', status: null}
          })
        })
        .catch(err => {
          console.log(err.response.data, err.response.status)
          localStorage.removeItem('user-jwt')
          this.setState({
            user: null,
            isLoggedIn: false,
            error: {msg: err.response.data.msg, status: err.response.status}
          })
        })
    
    // fetch("/user-auth/user", {
    //   method: 'GET',
    //   headers: { 'user-auth': userJwt}
    // }).then(response => {
    //   if(response.status === 200) {
    //     return response.json()
    //   } else {
    //     throw Error(response.statusText)
    //   }
    // })
    //   .then(user => {
    //     console.log(user)
    //     this.setState({user, isLoggedIn: true})
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     localStorage.removeItem('user-jwt')
    //     this.setState({user: {}, isLoggedIn: false})
    //   }) 
  }

  getUser() {
    const userJwt = localStorage.getItem('user-jwt')
    fetch("/users/getUser", {
      method: 'GET',
      headers: { 'user-auth': userJwt}
    }).then(response => response.json())
      .then(user => {
        console.log(user)
        this.setState({user, isLoggedIn: true})
      })
  }

  render() {
    const value = {
      user: this.state.user,
      getUser: this.getUser,
      isLoggedIn: this.state.isLoggedIn
    }
    return (
      <userContext.Provider value={value}>
        <BrowserRouter history={history}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/properties" render={(props) => <MainSearch {...props} loginStatus={this.state.isLoggedIn}/>} />
            <PrivateRoute path="/my-hauzzy" component={MyHauzzy}/>
            {/* <Route path="/my-hauzzy" component={MyHauzzy} /> */}
          </Switch>
        </BrowserRouter>
      </userContext.Provider>
    )
  }
}

export default App;