import React from "react";
import PropertyCard from "./PropertyCard";
import Skeleton from "react-loading-skeleton";
import CardSkeleton from "./CardSkeleton";


class PropertyList extends React.Component {
  render() {
    let card = Array(10).fill(<CardSkeleton/>);
    return (
      <div className="search-results-list-container">
        <div className="search-results-list-heading">
          <div className="heading-text">
            {this.props.status ? <Skeleton height={15} width={'50%'} duration={1}/> : <h1>Distrito Nacional, SD</h1>}
            {this.props.status ? <Skeleton height={15} width={'40%'} duration={1}/> : <h2>Naco</h2>}
          </div>
        </div>
        <div className="search-results-list-grid">
          {this.props.status && card.map(() => <CardSkeleton/>)}
          {!this.props.status && this.props.properties.map(property => {
            return <PropertyCard key={property.id} property={property} />;
          })}
        </div>
      </div>
    )
  }
}

export default PropertyList;