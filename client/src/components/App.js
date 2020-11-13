import React from 'react';
import Home from './Home';
import MainSearch from './MainSearch';
import MyHauzzy from './MyHauzzy/MyHauzzy';
import PrivateRoute from './PrivateRoute';
import {userContext} from './userContext';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { createBrowserHistory } from "history";
import axios from 'axios';
import InternalServerError500 from './ErrorPages/InternalServerError500';
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
      },
      userLoading: false
    }
    this.getUser = this.getUser.bind(this);
    this.logOut = this.logOut.bind(this);
  }
  
  componentDidMount() {
    // Check token and load user
    this.getUser()
  }

  getUser() {
    console.log('getUser called!!!')
    console.log(`${localStorage.getItem('user-jwt')}`)
    const userJwt = localStorage.getItem('user-jwt')
    this.setState({userLoading: true})
    axios({method: 'get', url: '/user-auth/user', headers: {'user-auth': userJwt}})
        .then(user => {
          console.log(user.data)
          this.setState({
            user: user.data,
            isLoggedIn: true,
            error: {msg: '', status: null},
            userLoading: false
          })
        })
        .catch(err => {
          console.log(err.response.data, err.response.status)
          localStorage.removeItem('user-jwt')
          this.setState({
            user: null,
            isLoggedIn: false,
            error: {msg: err.response.data.msg, status: err.response.status},
            userLoading: false
          })
        })
  }
  logOut() {
    localStorage.removeItem('user-jwt');
    this.setState({
      isLoggedIn: false,
      user: null,
      error: {msg: '', status: null}
    })
  }

  render() {
    const value = {
      user: this.state.user,
      getUser: this.getUser,
      isLoggedIn: this.state.isLoggedIn,
      logOut: this.logOut,
      userLoading: this.state.userLoading
    }
    return (
      <userContext.Provider value={value}>
        <BrowserRouter history={history}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/properties" render={(props) => <MainSearch {...props} loginStatus={this.state.isLoggedIn}/>} />
            <PrivateRoute path="/my-hauzzy" component={MyHauzzy}/>
            <Route path="/error/500" component={InternalServerError500}/>
          </Switch>
        </BrowserRouter>
      </userContext.Provider>
    )
  }
}

export default App;