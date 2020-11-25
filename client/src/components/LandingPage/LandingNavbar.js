import React from 'react';
import logo from '../../demo_img/brand-logo-vf.svg';
import LandingForm from './LandingForm';
import './LandingNavbar.css';

class LandingNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scrolled: false
    }
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }
  componentDidUpdate() {
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  
  handleScroll() {
    const offset = window.scrollY;
    if(offset > 500) {
      this.setState({scrolled: true})
    } else {
      this.setState({scrolled: false})
    }
  }
  
  
  render() {
    if(this.state.scrolled) {
      return (
        <nav id="header" className={this.state.scrolled && "scrolled" }>
          <div className="nav-container">
            <LandingForm/>
          </div>
        </nav>
      )
    } else {
      return (
        <nav id="header" className={this.state.scrolled && "scrolled" }>
          <div className="nav-container">
            <div className="nav-logo-menu">
              <img src={logo} className="brand-logo"/>
              <span>Caracteristicas <i className="fas fa-angle-down"></i></span>
            </div>
            <div className="contact-button">
              <span>Contactanos</span>
            </div>
          </div>
        </nav>
      )
    }
  }
}

export default LandingNavbar;