import React from 'react';
import {Link} from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <Link to="/properties">Link to Properties Search</Link>
      </div>
    )
  }
}

export default Home;