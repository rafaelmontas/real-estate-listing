import React from 'react'
import MenuItems from './MenuItems'
import AgentDashboard from './AgentDashboard'
import AgentListings from './Listings/AgentListings'
import AgentListingDetails from './Listings/AgentListingDetails'
import { Route } from 'react-router-dom'
import './AgentsApp'

class Structure extends React.Component {
  render() {
    return (
      <section className="structure-container">
        <div className="structure">
          <div className="left-side-structure">
            <div className="left-menu-structure">
              <MenuItems/>
            </div>
          </div>
          <div className="right-side-structure">
            <Route path="/account/dashboard" component={AgentDashboard}/>
            <Route path="/account/listings" exact component={AgentListings}/>
            <Route path="/account/listings/:id" component={AgentListingDetails}/>
          </div>
        </div>
      </section>
    )
  }
}

export default Structure