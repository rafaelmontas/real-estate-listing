import React from "react";
import "./SideDrawer.css";


class SideDrawer extends React.Component {
  render() {
    let drawerClasses = "side-drawer";
    if(this.props.show) {
      drawerClasses = "side-drawer open";
    }

    return (
      <div className={drawerClasses}>
        <ul>
          <li><a href="/">Buscar</a></li>
          <li><a href="/">Favoritos</a></li>
        </ul>
      </div>
    )
  }
}

export default SideDrawer;