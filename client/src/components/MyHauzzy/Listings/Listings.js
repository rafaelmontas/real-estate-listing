import React from 'react';
import ListingsList from './ListingsList';
import {Link, withRouter} from 'react-router-dom';
import './Listings.css'

class Listings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabSelected: 'tab-1'
    }
    this.handleTabClick = this.handleTabClick.bind(this)
  }

  componentDidMount() {
    if(this.props.location.search === '') {
      this.props.history.push({
        search: '?status=active'
      })
    } else if(this.props.location.search === '?status=pending') {
      this.setState({tabSelected: 'tab-2'})
    } else if(this.props.location.search === '?status=closed') {
      this.setState({tabSelected: 'tab-3'})
    }
  }
  componentDidUpdate(prevProps) {
    // Handle back button update
    if(prevProps.location.search !== this.props.location.search) {
      if (this.props.location.search === '?status=active') {
        this.setState({tabSelected: 'tab-1'})
      } else if (this.props.location.search === '?status=pending') {
        this.setState({tabSelected: 'tab-2'})
      } else if (this.props.location.search === '?status=closed') {
        this.setState({tabSelected: 'tab-3'})
      }
    }
  }
  
  handleTabClick(e) {
    this.setState({tabSelected: e.currentTarget.id}, () => {
      if(this.state.tabSelected === 'tab-1') {
        this.props.history.push({
          search: '?status=active'
        })
      } else if (this.state.tabSelected === 'tab-2') {
        this.props.history.push({
          search: '?status=pending'
        })
      } else if (this.state.tabSelected === 'tab-3') {
        this.props.history.push({
          search: '?status=closed'
        })
      }
    })
    console.log(e.currentTarget.id)
  }
  
  render() {
    if(this.props.listings.length === 0) {
      return (
        <div className="empty-listings">
          <div className="listings-header">
            <h1>Mis propiedades</h1>
            <Link to={this.props.linkToNew}>
              <span className="new-lsiting-button">Publicar <span>propiedad </span><i className="fas fa-plus-circle"></i></span>
            </Link>
          </div>
          <div className="listings">No tienes propiedades publicadas.</div>
        </div>
      )
    } else {
      return (
        <div className="show-listings">
          <div className="listings-header">
            <h1>Mis propiedades</h1>
            <Link to={this.props.linkToNew}>
              <span className="new-lsiting-button">Publicar <span>propiedad </span><i className="fas fa-plus-circle"></i></span>
            </Link>
          </div>
          <div className="listings-tabs">
            <a className={this.state.tabSelected === 'tab-1' ? 'tabs selected' : 'tabs'} id="tab-1" onClick={this.handleTabClick}>Publicadas (3)</a>
            <a className={this.state.tabSelected === 'tab-2' ? 'tabs selected' : 'tabs'} id="tab-2" onClick={this.handleTabClick}>Pendientes (0)</a>
            <a className={this.state.tabSelected === 'tab-3' ? 'tabs selected' : 'tabs'} id="tab-3" onClick={this.handleTabClick}>Cerradas (0)</a>
          </div>
          <div className="listing-type-container">
            <ListingsList listings={this.props.listings} linkTo={this.props.linkTo}/>
          </div>
        </div>
      )
    }
  }
}

export default withRouter(Listings);