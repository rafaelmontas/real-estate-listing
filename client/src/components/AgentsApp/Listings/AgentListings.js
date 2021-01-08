import React from 'react'
import Listings from '../../MyHauzzy/Listings/Listings'
import axios from 'axios';
import CircularProgressSpinner from '../../CircularProgressSpinner'
import './AgentListings.css'

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
      axios.get('/api/properties')
      .then(listings => {
        console.log(listings.data)
        this.setState({listings: listings.data.properties, isLoading: false})
      })
      .catch(err => {
        console.log(err.response.data, err.response.status)
        if(err.response.status === 500) {
          this.props.history.replace('/error/500')
        }
      })
    }, 1000)
  }
  render() {
    if(this.state.isLoading) {
      return <CircularProgressSpinner/>
    } else {
      return (
        <div className="listings-content-right">
          <Listings listings={this.state.listings} linkTo="/account/listings" linkToNew="/account/new-listing"/>
        </div>
      )
    }
  }
}

export default AgentListings