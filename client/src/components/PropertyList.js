import React from "react";
import PropTypes from 'prop-types';
import PropertyCard from "./PropertyCard";
import Skeleton from "react-loading-skeleton";
import CardSkeleton from "./CardSkeleton";


class PropertyList extends React.Component {
  
  renderSectorName() {
    if(this.props.sector === 'All') {
      return null
    } else {
      return <h2>{this.props.sector}</h2>
    }
  }
  
  render() {
    let count = 1;
    let cards = Array(10).fill(<CardSkeleton/>);
    return (
      <div className="search-results-list-container">
        <div className="search-results-list-heading">
          <div className="heading-text">
            {this.props.status ? <Skeleton height={15} width={'50%'} duration={1}/> : <h1>Distrito Nacional, SD</h1>}
            {this.props.status ? <Skeleton height={15} width={'40%'} duration={1}/> : this.renderSectorName()}
          </div>
        </div>
        <div className="search-results-list-grid">
          {this.props.status && cards.map(() => <CardSkeleton key={count++}/>)}
          {!this.props.status && this.props.properties.map(property => {
            return <PropertyCard key={property.id}
                                 property={property}
                                 identifier={property.id}
                                 cardSelected={this.props.cardSelected}
                                 onCardHovered={this.props.onCardHovered}
                                 onCardHoverOut={this.props.onCardHoverOut}/>;
          })}
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