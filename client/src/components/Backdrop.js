import React from "react";
import PropTypes from 'prop-types';
import "./Backdrop.css"


class Backdrop extends React.Component {
  
  // Toggle body to not scroll
  componentDidMount() {
    document.body.classList.toggle("noscroll")
  }
  componentWillUnmount() {
    document.body.classList.toggle("noscroll")
  }
  
  render() {
    return <div  onClick={this.props.onBackdropClick} className="backdrop"></div>
  }
}

Backdrop.propTypes = {
  onBackdropClick: PropTypes.func.isRequired
}

export default Backdrop;