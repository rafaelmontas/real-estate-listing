import React from 'react'
import axios from 'axios'
import CircularProgressSpinner from '../../CircularProgressSpinner'
import ListingCard from './ListingCard'
import './AdminListings.css'

class AdminListings extends React.Component {
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
      axios.get(`/api/listings`)
      .then(listings => {
        console.log(listings.data)
        this.setState({listings: listings.data.properties, isLoading: false})
      })
      .catch(err => {
        // console.log(err.response.data, err.response.status)
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
        <div className="admin-listings-container">
          <div className="admin-listings-list">
            {this.state.listings.map(listing => {
              return <ListingCard key={listing.id} listing={listing}/>
            })}
          </div>
        </div>
      )
    }
  }
}

export default AdminListings