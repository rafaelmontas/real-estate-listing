import React from 'react';
import Home from './Home';
import MainSearch from './MainSearch';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/properties" component={MainSearch} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;