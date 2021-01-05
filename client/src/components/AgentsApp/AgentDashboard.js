import React from 'react';
import KpiCards from './Dashboard/KpiCards'
import './AgentDashboard.css'

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
      <div className="dashboard-content-right">
        <div className="top-dash-container">
          <KpiCards/>
        </div>
      </div>
    )
  }
}

export default AgentDashboard;