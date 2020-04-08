import React from "react";
import PropertyCard from "./PropertyCard";


class PropertyList extends React.Component {
	render() {
		return (
			<div className="search-results-list-container">
				<div className="search-results-list-heading">
					<div className="heading-text">
						<h1>Distrito Nacional, SD</h1>
						<h2>Naco</h2>
					</div>
				</div>
				<div className="search-results-list-grid">
					<PropertyCard/>
				</div>
			</div>
		)
	}
}

export default PropertyList;