import React from 'react';
import MainSearch from './MainSearch';
import Show from './Show';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={MainSearch} />
          <Route path="/properties/:id" exact component={Show} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;