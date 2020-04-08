import React from "react";


class Pagination extends React.Component {
	render() {
		return (
			<div className="search-results-pagination">
				<ul className="pagination-nav">
					<li className="pagination-page-link"><a className="active" href="#">1</a></li>
					<li className="pagination-page-link"><a href="#">2</a></li>
					<li className="pagination-page-link"><a href="#">3</a></li>
					<li className="pagination-page-link"><a href="#">4</a></li>
					<li className="pagination-page-link"><a href="#">5</a></li>
					<li className="pagination-next-page"><a href="#"><i className="fas fa-chevron-right"></i></a></li>
				</ul>
			</div>
		)
	}
}

export default Pagination;