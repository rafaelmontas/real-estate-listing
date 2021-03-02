import React from "react";
import CircularProgressSpinner from '../../CircularProgressSpinner'
import './LoadingBackdrop.css'

class LoadingBackdrop extends React.Component {

  // Toggle body to not scroll
  componentDidMount() {
    document.body.classList.toggle("noscroll")
  }
  componentWillUnmount() {
    document.body.classList.toggle("noscroll")
  }

  render() {
    return (
      <div className="loading-backdrop" style={{background: `${this.props.backgroundColor}`}}>
        <CircularProgressSpinner/>
      </div>
    )
  }
}

export default LoadingBackdrop