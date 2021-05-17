import React from 'react';
import {Link} from 'react-router-dom';

class Home extends React.Component {
  componentDidMount() {
    // Redirect
    if(this.props.location.pathname === '/') {
      this.props.history.replace({pathname: '/properties'})
    }
  }
  render() {
    return <div></div>
  }
}

export default Home;