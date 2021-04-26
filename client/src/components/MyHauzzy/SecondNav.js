import React from 'react';
import {Link} from 'react-router-dom';
import './SecondNav.css'

class SecondNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemSelected: 0
    }
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  componentDidMount() {
    // set selected nav item
    if(this.props.path === "/my-hauzzy/listings") {
      this.setState({itemSelected: 1})
    } else if(this.props.path === "/my-hauzzy/favorites") {
      this.setState({itemSelected: 2})
    } else if(this.props.path === "/my-hauzzy/profile") {
      this.setState({itemSelected: 3})
    } else if(this.props.path === "/my-hauzzy/new-listing") {
      this.setState({itemSelected: 4})
    }
  }
  componentDidUpdate(prevProps) {
    if(prevProps.path !== this.props.path) {
      // set selected nav item
      if(this.props.path === "/my-hauzzy/listings") {
        this.setState({itemSelected: 1})
      } else if(this.props.path === "/my-hauzzy/favorites") {
        this.setState({itemSelected: 2})
      } else if(this.props.path === "/my-hauzzy/profile") {
        this.setState({itemSelected: 3})
      } else if(this.props.path === "/my-hauzzy/new-listing") {
        this.setState({itemSelected: 4})
      }
    }
  }

  handleItemClick(e) {
    this.setState({itemSelected: parseInt(e.currentTarget.id)})
    console.log(`tab clicked #${parseInt(e.currentTarget.id)}`)
  }

  render() {
    return (
      <div className="secondary-nav">
        <div className="nav-options">
          <ul className="nav-list">
            {/* <li className={this.state.itemSelected === 1 ? "nav-item selected" : "nav-item"}
                id={1}
                onClick={this.handleItemClick}>
              <Link to="/my-hauzzy/listings">Mis Propiedades<span>0</span></Link>
            </li> */}
            <li className={this.state.itemSelected === 2 ? "nav-item selected" : "nav-item"}
                id={2}
                onClick={this.handleItemClick}>
                <Link to="/my-hauzzy/favorites">Favoritos<span>{this.props.favCount}</span></Link>
            </li>
            <li className={this.state.itemSelected === 3 ? "nav-item selected" : "nav-item"}
                id={3}
                onClick={this.handleItemClick}>
              <Link to="/my-hauzzy/profile">Mi Perfil</Link>
            </li>
            {/* <li className={this.state.itemSelected === 4 ? "nav-item selected" : "nav-item"}
                id={4}
                onClick={this.handleItemClick}>
              <Link to="/my-hauzzy/new-listing">Públicar Propiedad</Link>
            </li> */}
            <li></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default SecondNav;