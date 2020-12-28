import React from 'react'
import Backdrop from "../Backdrop"
import SideDrawer from './SideDrawer'
import AgentNavbar from './AgentNavbar'
import AgentDashboard from './AgentDashboard'
import { Route } from 'react-router-dom'

class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sideDrawerOpen: false
    }
    this.handleSideDrawerToggleClick = this.handleSideDrawerToggleClick.bind(this)
    this.handleBackdropClick = this.handleBackdropClick.bind(this)
  }

  componentDidMount() {
    if(this.props.location.pathname === '/account' || this.props.location.pathname === '/account/') {
      this.props.history.replace({pathname: '/account/dashboard'})
    }
  }

  handleSideDrawerToggleClick() {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  }
  handleBackdropClick() {
    this.setState({sideDrawerOpen: false});
  }

  render() {
    return (
      <div className="agent-dashboard-container">
        {this.state.sideDrawerOpen && <Backdrop onBackdropClick={this.handleBackdropClick} backgroundColor={"rgba(0, 0, 0, 0.5)"}/>}
        <SideDrawer showClass={this.state.sideDrawerOpen}/>
        <AgentNavbar onSideDrawerToggleClick={this.handleSideDrawerToggleClick}/>
        <Route path="/account/dashboard" exact component={AgentDashboard}/>
      </div>
    )
  }
}

export default Account;