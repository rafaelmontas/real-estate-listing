import React from 'react'
import ReportEditListing from '../../MyHauzzy/Listings/ReportEditListing/ReportEditListing'
import {agentContext} from '../agentContext';
import './AgentListingDetails.css'

class AgentListingDetails extends React.Component {
  componentWillUnmount() {
    console.log('unmounted 2')
  }
  render() {
    return (
      <div className="agent-listing-details-container">
        <ReportEditListing linkTo="/account/listings" id={this.context.agent.id}/>
      </div>
    )
  }
}

AgentListingDetails.contextType = agentContext
export default AgentListingDetails