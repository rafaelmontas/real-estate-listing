import React from 'react'
import ReportEditListing from '../../MyHauzzy/Listings/ReportEditListing/ReportEditListing'
import {agentContext} from '../agentContext';
import gtag, { gaInit } from '../../../utils/GaUtils';
import ReactPixel from 'react-facebook-pixel';
import publicIp from "public-ip";
import './AgentListingDetails.css'

class AgentListingDetails extends React.Component {
  async componentDidMount() {
    // Track page views GA
    if(process.env.NODE_ENV === 'production') {
      gaInit('G-JQMJWEW91Q', { send_page_view: true, page_title: 'Agent Listing Details Page', user_id: this.context.agent.id })
      gtag('config', 'G-JQMJWEW91Q', {
        page_title: 'Agent Listing Details Page',
        page_path: '/account/listings/:id',
        send_page_view: false,
        user_id: this.context.agent.id
      })
    } else {
      gaInit('G-WFH68VZSHT', { send_page_view: true, page_title: 'Agent Listing Details Page', user_id: this.context.agent.id })
      gtag('config', 'G-WFH68VZSHT', {
        page_title: 'Agent Listing Details Page',
        page_path: '/account/listings/:id',
        send_page_view: false,
        user_id: this.context.agent.id
      })
    }
    // Init Facebook Pixel
    if(process.env.NODE_ENV === 'production') {
      ReactPixel.init('689804211678157')
    } else {
      ReactPixel.init('587601035409958')
    }
    ReactPixel.pageView(); // For tracking page view
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