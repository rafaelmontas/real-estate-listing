import React from 'react';
import Home from './Home';
import MainSearch from './MainSearch';
import MyHauzzy from './MyHauzzy/MyHauzzy';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { createBrowserHistory } from "history";
const history = createBrowserHistory();


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    }
  }
  
  componentDidMount() {
    console.log(`${localStorage.getItem('user-jwt')}`)
    const userJwt = localStorage.getItem('user-jwt')
    fetch("/users/getUser", {
      method: 'GET',
      headers: { 'user-auth': userJwt}
    }).then(response => response.json())
      .then(res => console.log(res))
  }

  render() {
    return (
      <BrowserRouter history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/properties" component={MainSearch} />
          <Route path="/my-hauzzy" component={MyHauzzy} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;