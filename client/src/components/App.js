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
import pageNotFound404 from './ErrorPages/pageNotFound404';
import TermsAndConditions from './TermsAndConditions';
import PrivacyPolicy from './PrivacyPolicy';
import { hotjar } from 'react-hotjar';
import publicIp from "public-ip";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { v4 as uuidv4 } from 'uuid';
import gtag, { gaInit } from '../utils/GaUtils';
import ReactPixel from 'react-facebook-pixel';
import UserForgotPassword from './Auth/UserForgotPassword';
import UserResetPassword from './Auth/UserResetPassword';
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
      userLoading: true
    }
    this.getUser = this.getUser.bind(this);
    this.logOut = this.logOut.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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
    // Init Facebook Pixel
    if(process.env.NODE_ENV === 'production') {
      ReactPixel.init('824704561474532')
    } else {
      ReactPixel.init('248636197019006')
    }
  }

  getUser() {
    console.log('getUser called!!!')
    console.log(`${localStorage.getItem('user-jwt')}`)
    const userJwt = localStorage.getItem('user-jwt')
    // this.setState({userLoading: true})
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
    const { cookies } = this.props;
    cookies.remove('userJwt')
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

  handleSearch(province, sector, listing_type, min_price, max_price, bedrooms, bathrooms, property_type) {
    const body = {
      province,sector,
      listing_type,
      min_price,
      max_price,
      bedrooms,
      bathrooms,
      property_type: Array.isArray(property_type) ? property_type.join() : property_type,
      ha_id: this.state._haid,
      user_id: this.state.user && this.state.user.id
    }
    console.log('search....', body)
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      axios.post("/api/searches", body)
      .then(res => {
        console.log("Search Saved!", res.status)
        gtag('event', 'search', {
          event_category: 'engagement',
          event_label: 'User Search'
        })
        ReactPixel.track('Search')
      })
      .catch(err => {
        console.log(err)
      })
    }, 12000)
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
        {/* history={history} */}
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/properties" render={(props) => !this.state.userLoading && <MainSearch {...props} loginStatus={this.state.isLoggedIn} saveSearch={this.handleSearch}/>} />
            <PrivateRoute path="/my-hauzzy" component={MyHauzzy}/>
            <Route path="/terms-and-conditions" exact component={TermsAndConditions}/>
            <Route path="/privacy-policy" exact component={PrivacyPolicy}/>
            <Route path="/forgot-password" exact component={UserForgotPassword}/>
            <Route path="/reset-password/:token" exact component={UserResetPassword}/>
            <Route path="/error/500" component={InternalServerError500}/>
            <Route component={pageNotFound404}/>
          </Switch>
        </BrowserRouter>
      </userContext.Provider>
    )
  }
}

export default withCookies(App);