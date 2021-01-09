import React from 'react'
import ReportEditListing from '../../MyHauzzy/Listings/ReportEditListing/ReportEditListing'
// import { withRouter } from "react-router";
import './AgentListingDetails.css'

class AgentListingDetails extends React.Component {
  componentWillUnmount() {
    console.log('unmounted 2')
  }
  render() {
    return (
      <div className="agent-listing-details-container">
        <ReportEditListing linkTo="/account/listings"/>
      </div>
    )
  }
}

export default AgentListingDetails