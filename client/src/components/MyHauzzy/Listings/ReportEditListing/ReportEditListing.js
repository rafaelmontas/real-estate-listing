import React from 'react';
import NumberFormat from 'react-number-format';
import image from "../../../../demo_img/house1.png"
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import axios from 'axios';
import ListingEditForm from './ListingEditForm'
import './ReportEditListing.css'

class ReportEditListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      listing: {}
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    axios.get(`/agents/${this.props.id}/properties/${this.props.match.params.id}`)
    .then(listing => {
      console.log(listing)
      this.setState({listing: listing.data.listing, isLoading: false});
    })
    .catch(err => {
      console.log(err.response.data, err.response.status)
    })
  }

  render() {
    return (
      <div className="report-edit-container">
        <div className="re-header">
          <div className="back-button">
            <Link to={this.props.linkTo}><i className="fas fa-angle-left"></i>Lista de propiedades</Link>
          </div>
          {/* <div className="share-button">
            <span><i className="far fa-share-square"></i>Compartir</span>
          </div> */}
        </div>
        <div className="re-listing-container">
          <div className="listing-left">
            <div className="listing-info">
              <div className="listing-photo">
                <img src={image}/>
                <div className="listing-details-over">
                  <div className="listing-details-top">
                    <span className="street-info">{this.state.listing.listing_address}</span>
                    {/* <span className="sector-province">{`${this.state.listing.sector}, ${this.state.listing.province}`}</span> */}
                  </div>
                  <div className="listing-details-bottom">
                    <span className="price-info listing-stats">
                      <NumberFormat value={this.state.listing.listing_price} displayType={'text'} thousandSeparator={true} prefix={'US$'} />
                    </span>
                    <div className="stats-wrapper">
                      <span className="listing-stats">{`${this.state.listing.bedrooms} hab`}</span>
                      <span className="listing-stats">{`${this.state.listing.bathrooms} ${this.state.listing.bathrooms > 1 ? 'baños' : 'baño'}`}</span>
                      <span className="listing-stats">{`${this.state.listing.parking_spaces} parq`}</span>
                      <span className="listing-stats">{`${this.state.listing.square_meters} Mts2`}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="performance-preview">
                <div className="performance">
                  <span>Visitas<i className="far fa-eye"></i></span>
                  <span>0</span>
                </div>
                <div className="preview">
                  <span>Status: {this.state.listing.listing_active ? "Active" : "Pendiente"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="listing-right">
            {!this.state.isLoading && <ListingEditForm listing={this.state.listing}/>}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ReportEditListing);