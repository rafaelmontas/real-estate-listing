import React from 'react';
import {Link} from 'react-router-dom';
import './pageNotFound404.css';
import notFoundImage from '../../demo_img/undraw_page_not_found_su7k.svg';

class pageNotFound404 extends React.Component {
  render() {
    return (
      <div className="not-found-page">
        <div className="not-found-text">
          <h1>Mmm, <br/>algo salió mal.</h1>
          <h2>Error 404 - Pagína no existe.</h2>
          <Link to='/properties'>Volver a Hauzzy</Link>
        </div>
        <div className="img-404">
          <img src={notFoundImage}/>
        </div>
      </div>
    )
  }
}

export default pageNotFound404;