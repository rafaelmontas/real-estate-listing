import React from 'react'
import MenuItems from './MenuItems'
import AgentDashboard from './AgentDashboard'
import AgentListings from './Listings/AgentListings'
import AgentListingDetails from './Listings/AgentListingDetails'
import ListingForm from './NewListing/ListingForm'
import AgentProfile from './Profile/AgentProfile'
import {agentContext} from './agentContext';
import { Route } from 'react-router-dom'
import Intercom from 'react-intercom';

import './AgentsApp.css'

class Structure extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.user = {
      user_id: this.context.agent.id,
      email: this.context.agent.email,
      name: this.context.agent.name
    }
  }
  
  // componentDidMount() {
  //   insertScript()
  // }

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
            <Intercom appID="xq74edvp" { ...this.user } />
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

function intercom(app_id, user_id, name, email, created_at) {

}

function insertScript() {
  const {head} = document
  const script = document.createElement('script')
  script.id = 'newListingTag'
  script.type = 'text/javascript'
  script.async = true
  script.src = `https://survey.survicate.com/workspaces/de7bad5c0a5f47614be2f53b36b09535/web_surveys.js`
  head.appendChild(script)
}


Structure.contextType = agentContext;
export default Structure