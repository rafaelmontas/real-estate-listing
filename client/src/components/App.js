import React from 'react';
import LandingPage from './LandingPage/LandingPage';
import Home from './Home';
import MainSearch from './MainSearch';
import MyHauzzy from './MyHauzzy/MyHauzzy';
import PrivateRoute from './PrivateRoute';
import {userContext} from './userContext';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { createBrowserHistory } from "history";
import axios from 'axios';
import InternalServerError500 from './ErrorPages/InternalServerError500';
import pageNotFound404 from './ErrorPages/pageNotFound404';
import TermsAndConditions from './TermsAndConditions';
import PrivacyPolicy from './PrivacyPolicy';
import { hotjar } from 'react-hotjar';
import publicIp from "public-ip";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { v4 as uuidv4 } from 'uuid';
// const history = createBrowserHistory();


class App extends React.Component {
  static propTypes = {cookies: instanceOf(Cookies).isRequired};
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      _haid: cookies.get('_haid'),
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
  
  async componentDidMount() {
    // Check token and load user
    this.handleSetCookie()
    this.getUser()
    // Init hotjar
    try {
      if(await publicIp.v4() !== '186.150.167.185' && process.env.NODE_ENV === 'production') return hotjar.initialize(2147929, 6)
    } catch(err) {
      console.log(err)
    }
  }

  getUser() {
    console.log('getUser called!!!')
    console.log(`${localStorage.getItem('user-jwt')}`)
    const userJwt = localStorage.getItem('user-jwt')
    this.setState({userLoading: true})
    axios({method: 'get', url: '/user-auth/user/', headers: {'user-auth': userJwt}})
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

  handleSetCookie = () => {
    const { cookies } = this.props;
    if(!cookies.get("_haid")) {
      cookies.set("_haid", uuidv4(), { path: "/", maxAge: 31536000 }); // set the cookie
      this.setState({ _haid: cookies.get("_haid") });
    }
  };

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
        {/* history={history} */}
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/properties" render={(props) => <MainSearch {...props} loginStatus={this.state.isLoggedIn}/>} />
            <PrivateRoute path="/my-hauzzy" component={MyHauzzy}/>
            <Route path="/terms-and-conditions" exact component={TermsAndConditions}/>
            <Route path="/privacy-policy" exact component={PrivacyPolicy}/>
            <Route path="/error/500" component={InternalServerError500}/>
            <Route component={pageNotFound404}/>
          </Switch>
        </BrowserRouter>
      </userContext.Provider>
    )
  }
}

export default withCookies(App);