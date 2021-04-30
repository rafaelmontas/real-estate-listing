import React from 'react';
import FavoritesList from './FavoritesList';
import {Link} from 'react-router-dom';
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
    // axios.get(`/users/${this.context.user.id}/likes`)
    // .then(res => {
    //   this.setState({favoritesProperties: likes})
    // })
    // .catch(err => {
    //   console.log(err)
    // })
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