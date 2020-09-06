import React from "react";
import './Marker.css';

class Marker extends React.Component {
  render() {
    return (
      <div className={this.props.cardHovered === this.props.propertyId ? "main-marker property-hovered" : "main-marker"} onClick={() => this.props.handleClick(this.props.propertyId)}></div>
    )
  }
}

export default Marker;