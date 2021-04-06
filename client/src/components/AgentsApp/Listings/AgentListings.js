import React from 'react'
import Listings from '../../MyHauzzy/Listings/Listings'
// import AgentListingDetails from './AgentListingDetails'
import {agentContext} from '../agentContext';
import axios from 'axios';
import CircularProgressSpinner from '../../CircularProgressSpinner'
import './AgentListings.css'
import { Route } from 'react-router-dom';
import gtag, { gaInit } from '../../../utils/GaUtils';
import ReactPixel from 'react-facebook-pixel';
import publicIp from "public-ip";

class AgentListings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      listings: []
    }
  }
  async componentDidMount() {
    this.setState({ isLoading: true })
    this.timer = setTimeout(() => {
      axios.get(`/agents/${this.context.agent.id}/properties`)
      .then(listings => {
        // console.log(listings.data)
        this.setState({listings: listings.data.listings, isLoading: false})
        // // Track page views GA
        if(process.env.NODE_ENV === 'production') {
          gaInit('G-JQMJWEW91Q', { send_page_view: true, page_title: 'Agent Listings Page', user_id: this.context.agent.id })
          gtag('config', 'G-JQMJWEW91Q', {
            page_title: 'Agent Listings Page',
            page_path: '/account/listings',
            send_page_view: false,
            user_id: this.context.agent.id
          })
        } else {
          gaInit('G-WFH68VZSHT', { send_page_view: true, page_title: 'Agent Listings Page', user_id: this.context.agent.id })
          gtag('config', 'G-WFH68VZSHT', {
            page_title: 'Agent Listings Page',
            page_path: '/account/listings',
            send_page_view: false,
            user_id: this.context.agent.id
          })
        }
      })
      .catch(err => {
        // console.log(err.response.data, err.response.status)
        if(err.response.status === 500) {
          this.props.history.replace('/error/500')
        }
      })
    }, 1000)
    // Init Facebook Pixel
    if(await publicIp.v4() === '186.150.167.185' && process.env.NODE_ENV === 'production') {
      console.log('Internal IP')
      return null
    } else if(await publicIp.v4() !== '186.150.167.185' && process.env.NODE_ENV === 'production') {
      ReactPixel.init('689804211678157')
    } else {
      ReactPixel.init('587601035409958')
    }
    ReactPixel.pageView(); // For tracking page view
  }
  componentWillUnmount() {
    // console.log('unmounted 1')
  }
  render() {
    if(this.state.isLoading) {
      return <CircularProgressSpinner/>
    } else {
      return (
          <Route path={this.props.match.url} exact>
            <div className="listings-content-right">
              <Listings listings={this.state.listings} linkTo="/account/listings" linkToNew="/account/new-listing"/>
            </div>
          </Route>
      )
    }
  }
}

AgentListings.contextType = agentContext;
export default AgentListings