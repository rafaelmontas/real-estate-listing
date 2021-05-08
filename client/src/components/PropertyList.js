import React from "react";
import PropTypes from 'prop-types';
import PropertyCard from "./PropertyCard";
import Skeleton from "react-loading-skeleton";
import CardSkeleton from "./CardSkeleton";
import EmptySearch from './EmptySearch';


class PropertyList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.userLikes)
  }

  renderSectorName() {
    if(this.props.sector === 'All') {
      return null
    } else {
      return <h2>{this.props.sector}</h2>
    }
  }
  renderSearchResultHeading() {
    if(this.props.listingCount !== 0 || this.props.status) {
      if(!this.props.detailsPage) {
        return (
          <div className="search-results-list-heading">
            <div className="heading-text">
              {this.props.status ? <Skeleton height={15} width={'50%'} duration={1}/> : <h1>Distrito Nacional, SD</h1>}
              {this.props.status ? <Skeleton height={15} width={'40%'} duration={1}/> : this.renderSectorName()}
            </div>
          </div>
        )
      }
    }
  }
  renderEmptySearch() {
    if(this.props.listingCount === 0 && !this.props.status) {
      return <EmptySearch/>
    }
  }
  
  render() {
    return (
      <div className="search-results-list-container">
        {this.renderSearchResultHeading()}
        <div className="search-results-list-grid">
          {this.props.status && <CardSkeleton/>}
          {!this.props.status && this.props.properties.map(property => {
            return <PropertyCard key={property.id}
                                property={property}
                                identifier={property.id}
                                cardSelected={this.props.cardSelected}
                                onCardHovered={this.props.onCardHovered}
                                onCardHoverOut={this.props.onCardHoverOut}
                                onLike={this.props.onLike}
                                onLikeDelete={this.props.onLikeDelete}
                                userLike={this.props.userLikes.findIndex(x => x.listing_id === property.id)}
                                userLikeId={this.props.userLikes.find(x => x.listing_id === property.id)}
                                />;
          })}
          {this.renderEmptySearch()}
        </div>
      </div>
    )
  }
}

PropertyList.propTypes = {
  status: PropTypes.bool.isRequired,
  properties: PropTypes.array.isRequired
}

export default PropertyList;