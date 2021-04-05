import React from 'react';
import logo from '../../demo_img/brand-logo-vf.svg';
import { Link, animateScroll as scroll } from "react-scroll";
import LandingForm from './LandingForm';
import './LandingNavbar.css';
import gtag from '../../utils/GaUtils';
import {Link as LinkTo} from 'react-router-dom';

class LandingNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scrolled: false
    }
    this.handleScroll = this.handleScroll.bind(this)
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
  handleFeaturesClick() {
    gtag('event', 'click', {
      event_category: 'engagement',
      event_label: 'Features button clicked'
    })
  }

  
  render() {
    if(this.state.scrolled) {
      return (
        <nav id="header" className={this.state.scrolled ? "scrolled" : null}>
          <div className="nav-container">
            <LandingForm/>
          </div>
        </nav>
      )
    } else {
      return (
        <nav id="header" className={this.state.scrolled ? "scrolled" : null}>
          <div className="nav-container">
            <div className="nav-logo-menu">
              <img src={logo} className="brand-logo"/>
              <Link to="features-section" smooth={true} offset={-38} onClick={this.handleFeaturesClick}>
                <span>Caracteristicas <i className="fas fa-angle-down"></i></span>
              </Link>
            </div>
            <div className="signup-login-buttons">
              <a href="http://agent.hauzzy.com/signup" className="signup-button">Registrate</a>
              <a href="http://agent.hauzzy.com/login" className="login-button">Iniciar Sesión</a>
            </div>
          </div>
        </nav>
      )
    }
  }
}

export default LandingNavbar;