import React from 'react'
import axios from 'axios'
import NumberFormat from 'react-number-format'
import dateFormat from 'dateformat'

class AdminListingDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      listing: {}
    }
  }

  componentDidMount() {
    // window.scrollTo(0, 0);
    axios.get(`/api/listings/${this.props.match.params.id}`)
    .then(listing => {
      console.log(listing)
      this.setState({listing: listing.data.listing, isLoading: false});
    })
    .catch(err => {
      console.log(err.response.data, err.response.status)
    })
  }

  // Render Agent Photo
  renderAgentImg() {
    if(!this.state.isLoading && this.state.listing.agent['AgentProfilePicture']) {
      return <img src={this.state.listing.agent['AgentProfilePicture'][0].location} alt="Agent photo"/>
    } else {
      return <img src="https://agents-profile-pictures.s3.us-east-2.amazonaws.com/profile-avatar.png"
                  alt="Agent profile picture"/>
    }
  }
  
  render() {
    return (
      <div className="admin-listing-details-container">
        <div className="agent-info">
          <div className="agent-info-left">
            {this.renderAgentImg()}
          </div>
          <div className="agent-info-right">
            {/* <img src={}/> */}
          </div>
        </div>
        <div className="">

        </div>
      </div>
    )
  }
}

export default AdminListingDetails