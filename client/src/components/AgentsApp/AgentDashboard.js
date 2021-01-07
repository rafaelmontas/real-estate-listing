import React from 'react';
import KpiCards from './Dashboard/KpiCards'
import axios from 'axios';
import {Link} from 'react-router-dom';
import ListingCard from '../MyHauzzy/Listings/ListingCard'
import './AgentDashboard.css'

class AgentDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topListings: []
    }
  }
  componentDidMount() {
    axios.get('/api/properties')
        .then(topListings => {
          console.log(topListings.data)
          this.setState({topListings: topListings.data.properties})
        })
        .catch(err => {
          console.log(err.response.data, err.response.status)
          if(err.response.status === 500) {
            this.props.history.replace('/error/500')
          }
        })
  }
  renderBottomDiv() {
    if(this.state.topListings.length === 0) {
      return (
        <div className="empty-list-container">
          <span className="text">No tienes propiedades publicadas.</span>
          <Link to="/account/new-listing">Publicar propiedad<i className="fas fa-plus-circle"></i></Link>
        </div>
      )
    } else {
      return (
        <div className="top-listings-list">
          {this.state.topListings.slice(0, 3).map(listing => {
            return <ListingCard key={listing.id} listing={listing} linkTo='/account/listings'/>
          })}
        </div>
      )
    }
  }

  render() {
    return (
      <div className="dashboard-content-right">
        <div className="top-dash-container">
          <KpiCards/>
        </div>
        <div className="bottom-top-listings">
          <div className="top-listings-header">
            <h1>Top Propiedades</h1>
            <div className="top-listings-sub-headers">
              <span className="listing-status">Estatus</span>
              <span className="listing-date">Fecha</span>
              <span>Propiedad</span>
              <span>Categoría</span>
              <span>Visitas</span>
              {/* <span >Editar</span> */}
            </div>
          </div>
          {this.renderBottomDiv()}
        </div>
      </div>
    )
  }
}

export default AgentDashboard;