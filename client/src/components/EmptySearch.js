import React from "react";
import './EmptySearch.css';
import SearchIllustration from '../demo_img/undraw_house_searching_n8mp.svg';

class EmptySearch extends React.Component {
  render() {
    return (
      <div className="search-result-empty">
        <div className="search-empty-header">
          Oops! Al parecer no hay propiedades que coincidan con esta busqueda.
          Intenta cambiando los filtros!
        </div>
        <div className="search-empty-body">
          <img src={SearchIllustration}/>
        </div>
      </div>
    )
  }
}

export default EmptySearch;