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
    console.log(this.state.listing.agent)
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
    if(this.state.isLoading) {
      return <div></div>
    } else {
      return (
        <div className="admin-listing-details-container">
          <div className="agent-info">
            <div className="agent-info-left">
              {this.renderAgentImg()}
              <div className="agent-info-text">
                <h4>{this.state.listing.agent.name}</h4>
                <span>{this.state.listing.agent.email}</span>
                <span>{this.state.listing.agent.phone_number}</span>
                <span>{dateFormat(this.state.listing.agent.createdAt, "dd/mm/yy")}</span>
              </div>
            </div>
            <div className="agent-info-right">
              <h4>{this.state.listing.agent.brokerage_name}</h4>
            </div>
          </div>
          <div className="listing-details-container">
            <div className="listing-details-left">
              <span>{`Tipo de Propiedad: ${this.state.listing.property_type}`}</span>
              <span>{`Tipo de Publicación: ${this.state.listing.listing_type}`}</span>
              <span>{`Habitaciones: ${this.state.listing.bedrooms}`}</span>
              <span>{`Baños: ${this.state.listing.bathrooms}`}</span>
              <span>{`Medio Baños: ${this.state.listing.half_bathrooms}`}</span>
              <span>{`Parqueos: ${this.state.listing.parking_spaces}`}</span>
              <span>{`Metros Cuadrados: ${this.state.listing.square_meters}`}</span>
              <span>{`Precio: ${this.state.listing.listing_price}`}</span>
              <span>{`Descripción: ${this.state.listing.description}`}</span>
              <span>{`Estatus: ${this.state.listing.listing_active}`}</span>
            </div>
            <div className="listing-details-right">

            </div>
          </div>
        </div>
      )
    }
  }
}

export default AdminListingDetails