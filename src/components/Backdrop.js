import React from "react";
import "./Backdrop.css"


class Backdrop extends React.Component {
  render() {
    return <div  onClick={this.props.onBackdropClick} className="backdrop"></div>
  }
};

export default Backdrop;