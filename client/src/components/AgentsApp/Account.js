import React from 'react'
import Backdrop from "../Backdrop"
import SideDrawer from './SideDrawer'
import AgentNavbar from './AgentNavbar'
import Structure from './Structure'

class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sideDrawerOpen: false
    }
    this.handleSideDrawerToggleClick = this.handleSideDrawerToggleClick.bind(this)
    this.handleBackdropClick = this.handleBackdropClick.bind(this)
    this.handleSidedrawerClick = this.handleSidedrawerClick.bind(this)
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
  handleSidedrawerClick() {
    this.setState({sideDrawerOpen: false});
  }

  render() {
    return (
      <div className="agent-dashboard-container">
        {this.state.sideDrawerOpen && <Backdrop onBackdropClick={this.handleBackdropClick} backgroundColor={"rgba(0, 0, 0, 0.5)"}/>}
        <SideDrawer showClass={this.state.sideDrawerOpen} onSidedrawerClick={this.handleSideDrawerToggleClick}/>
        <AgentNavbar onSideDrawerToggleClick={this.handleSideDrawerToggleClick}/>
        <Structure/>
      </div>
    )
  }
}

export default Account;