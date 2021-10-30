import React from 'react'
import MenuItems from './MenuItems'
import AgentDashboard from './AgentDashboard'
import AgentListings from './Listings/AgentListings'
import AgentListingDetails from './Listings/AgentListingDetails'
import ListingForm from './NewListing/ListingForm'
import AgentProfile from './Profile/AgentProfile'
import { Route } from 'react-router-dom'
import tawkTo from "tawkto-react"
import './AgentsApp.css'

class Structure extends React.Component {
  componentDidMount() {
    tawkTo('60c61dec65b7290ac635b7ab', '1f82u9p06')
  }

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
            <Route path="/account/new-listing" component={ListingForm}/>
            <Route path="/account/profile" component={AgentProfile}/>
          </div>
        </div>
      </section>
    )
  }
}

export default Structure