import React from 'react';
import FavoritesList from './FavoritesList';
import {Link} from 'react-router-dom';
import gtag, { gaInit } from '../../utils/GaUtils';
import ReactPixel from 'react-facebook-pixel';
import './Favorites.css'

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesProperties: []
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    // Google Analytics
    let initBody;
    if(this.context.isLoggedIn) {
      initBody = {send_page_view: true, page_title: 'Favorites Page', user_id: this.context.user.id}
    } else {
      initBody = {send_page_view: true, page_title: 'Favorites Page'}
    }
    let configBody;
    if(this.context.isLoggedIn) {
      configBody = {page_title: 'Favorites Page', page_path: '/my-hauzzy/favorites', send_page_view: false, user_id: this.context.user.id}
    } else {
      configBody = {page_title: 'Favorites Page', page_path: '/my-hauzzy/favorites', send_page_view: false}
    }
    if(process.env.NODE_ENV === 'production') {
      gaInit('G-7TW72RB4M9', initBody)
      gtag('config', 'G-7TW72RB4M9', configBody)
    } else {
      gaInit('G-D570FDN0FX', initBody)
      gtag('config', 'G-D570FDN0FX', configBody)
    }
    // Send Page View FB
    if(process.env.NODE_ENV === 'production') {
      ReactPixel.init('824704561474532')
    } else {
      ReactPixel.init('248636197019006')
    }
    ReactPixel.pageView(); // For tracking page view
  }

  render() {
    if(this.props.favorites.length === 0) {
      return (
        <div className="empty-favorites">
          <h1>Guarda propiedades como favoritos</h1>
          <span className="empty-favorites-text">Puedes guardar propiedades en favorios haciendo click en el <i className="far fa-heart"></i></span>
          <Link to="/properties"><span className="search-button">Buscar propiedades <i className="fas fa-search"></i></span></Link>
        </div>
      )
    } else {
      return (
        <div className="favorites-container">
          <h1>Favoritos</h1>
          <FavoritesList properties={this.props.favorites}
                         onLike={this.props.onLike}
                         onLikeDelete={this.props.onLikeDelete}
                         userLikes={this.props.userLikes}/>
        </div>
      )
    }
  }
}

// Favorites.propTypes = {
//   history: PropTypes.object.isRequired
// }

export default Favorites;