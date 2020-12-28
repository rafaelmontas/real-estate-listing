import React from 'react'
import MenuItems from './MenuItems'
import '../SideDrawer.css'

class SideDrawer extends React.Component {
  render() {
    let drawerClasses = "side-drawer";
    if(this.props.showClass) {
      drawerClasses = "side-drawer open";
    }
    return (
      <div className={drawerClasses}>
        <MenuItems/>
      </div>
    )
  }
}

export default SideDrawer