import React from "react";

class FixedFilters extends React.Component {
	render() {
		return (
			<div className="fixed-filters">
				<div className="search-results-filter-section">
					<div className="filter-section-left">
						<span className="buy-sell filters">Comprar</span>
						<span className="price filters">US$ 100k - US$ 150k</span>
						<span className="beds-baths filters">Hab. & Baños</span>
						<span className="type filters">Tipo de propiedad</span>
					</div>
					<div className="filter-section-button-right">
						<span className="filter-button">Filtros<i className="fas fa-angle-down"></i></span>
						<span className="map-button">Mapa</span>
					</div>
				</div>
			</div>
		)
	}
}

export default FixedFilters;