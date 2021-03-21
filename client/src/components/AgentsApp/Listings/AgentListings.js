import React from 'react'
import Listings from '../../MyHauzzy/Listings/Listings'
// import AgentListingDetails from './AgentListingDetails'
import {agentContext} from '../agentContext';
import axios from 'axios';
import CircularProgressSpinner from '../../CircularProgressSpinner'
import './AgentListings.css'
import { Route } from 'react-router-dom';

class AgentListings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      listings: []
    }
  }
  componentDidMount() {
    this.setState({ isLoading: true })
    this.timer = setTimeout(() => {
      axios.get(`/agents/${this.context.agent.id}/properties`)
      .then(listings => {
        // console.log(listings.data)
        this.setState({listings: listings.data.listings, isLoading: false})
      })
      .catch(err => {
        // console.log(err.response.data, err.response.status)
        if(err.response.status === 500) {
          this.props.history.replace('/error/500')
        }
      })
    }, 1000)
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