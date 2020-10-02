import React from 'react';
import {Link} from 'react-router-dom';
import './Listings.css'

class Listings extends React.Component {
  render() {
    if(this.props.listings.length === 0) {
      return (
        <div className="empty-listings">
          <div className="listings-header">
            <h1>Mis propiedades</h1>
            <Link to="/my-hauzzy/new-listing">
              <span className="new-lsiting-button">Públicar <span>propiedad </span><i className="fas fa-plus-circle"></i></span>
            </Link>
          </div>
          <div className="listings">No tienes propiedades públicadas.</div>
        </div>
      )
    } else {
      return <h1>ok</h1>
    }
  }
}

export default Listings;