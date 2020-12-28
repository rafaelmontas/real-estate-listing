import React from 'react';
import AgentNavbar from './AgentNavbar';

class AgentDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sideDrawerOpen: false
    }
    this.handleSideDrawerToggleClick = this.handleSideDrawerToggleClick.bind(this)
  }

  handleSideDrawerToggleClick() {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  }

  render() {
    return (
      // <div className="agent-dashboard-container">
      //   <AgentNavbar 
      //     onSideDrawerToggleClick={this.handleSideDrawerToggleClick}
      //   />
      // </div>
      <div>
        dashoard
      </div>
    )
  }
}

export default AgentDashboard;