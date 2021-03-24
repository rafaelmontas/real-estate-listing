import React from 'react';
import KpiCards from './Dashboard/KpiCards'
import axios from 'axios';
import {Link} from 'react-router-dom';
import ListingCard from '../MyHauzzy/Listings/ListingCard'
import CircularProgressSpinner from '../CircularProgressSpinner'
import {agentContext} from './agentContext';
import gtag, { gaInit } from '../../utils/GaUtils';
import ReactPixel from 'react-facebook-pixel';
import publicIp from "public-ip";
import './AgentDashboard.css'

class AgentDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      topListings: [],
      listingCount: 0
    }
  }
  async componentDidMount() {
    this.setState({ isLoading: true })
    this.timer = setTimeout(() => {
      axios.get(`/agents/${this.context.agent.id}/properties`)
      .then(topListings => {
        // console.log(topListings.data)
        this.setState({
          // topListings: topListings.data.properties,
          listingCount: topListings.data.count,
          isLoading: false
        })
        
      })
      .catch(err => {
        // console.log(err.response.data, err.response.status)
        if(err.response.status === 500) {
          this.props.history.replace('/error/500')
        }
      })
      this.setState({isLoading: false})
    }, 1000)
    // Track page views GA
    if(process.env.NODE_ENV === 'production') {
      gaInit('G-JQMJWEW91Q', { send_page_view: true, page_title: 'Agent Main Dashboard', user_id: this.context.agent.id })  
    } else {
      gaInit('G-WFH68VZSHT', { send_page_view: true, page_title: 'Agent Main Dashboard', user_id: this.context.agent.id })
    }
    gtag('config', 'G-WFH68VZSHT', {
      page_title: 'Agent Main Dashboard',
      page_path: '/account/dashboard',
      send_page_view: false,
      user_id: this.context.agent.id
    })
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
  renderBottomDiv() {
    if(this.state.topListings.length === 0) {
      return (
        <div className="empty-list-container">
          <span className="text">No tienes propiedades con visitas.</span>
          <Link to="/account/new-listing">Nueva propiedad<i className="fas fa-plus-circle"></i></Link>
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
    if(this.state.isLoading) {
      return <CircularProgressSpinner/>
    } else {
      return (
        <div className="dashboard-content-right">
          <div className="top-dash-container">
            <KpiCards listingCount={this.state.listingCount}/>
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
}

AgentDashboard.contextType = agentContext;
export default AgentDashboard;