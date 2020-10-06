import React from 'react';
import ListingCard from './ListingCard';
import './ListingsList.css'
import PropertyCard from '../../PropertyCard';

class ListingsList extends React.Component {
  render() {
    if(false) {
      return (
        <div className="empty-list-container" style={{padding: '15px 0'}}>
          <p>No tienes propiedades en esta categoría.</p>
        </div>
      )
    } else {
      return (
        <div className="listings-list">
          <div className="list-header">
            <div className="address-header">
              <h5>Dirección</h5>
            </div>
            <div className="right-header">  
              <div className="status-header">
                <h5>Estatus</h5>
              </div>
              <div className="date-header">
                <h5>Fecha</h5>
              </div>
              <div className="property-type-header">
                <h5>Propiedad</h5>
              </div>
              <div className="type-header">
                <h5>Categoría</h5>
              </div>
              <div className="visits-header">
                <h5>Visitas</h5>
              </div>
              <div className="action-header">
                <h5>Editar</h5>
              </div>
            </div>
          </div>
          {this.props.listings.map(listing => {
            return <ListingCard key={listing.id} listing={listing}/>
          })}
        </div>
      )
    }
  }
}

export default ListingsList;