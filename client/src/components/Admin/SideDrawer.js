import React from 'react'
import AdminMenuItems from './AdminMenuItems'
import '../SideDrawer.css'

class SideDrawer extends React.Component {
  render() {
    let drawerClasses = "side-drawer";
    if(this.props.showClass) {
      drawerClasses = "side-drawer open";
    }
    return (
      <div className={drawerClasses}>
        <AdminMenuItems onSidedrawerClick={this.props.onSidedrawerClick}/>
      </div>
    )
  }
}

export default SideDrawer