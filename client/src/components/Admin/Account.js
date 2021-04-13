import React from 'react'
import Backdrop from "../Backdrop"
import SideDrawer from './SideDrawer'
import AdminNavbar from './AdminNavbar'
import AdminMenuItems from './AdminMenuItems'
import './Account.css'

class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sideDrawerOpen: false
    }
    this.handleSideDrawerToggleClick = this.handleSideDrawerToggleClick.bind(this)
    this.handleBackdropClick = this.handleBackdropClick.bind(this)
    this.handleSidedrawerClick = this.handleSidedrawerClick.bind(this)
  }

  componentDidMount() {
    if(this.props.location.pathname === '/') {
      this.props.history.replace({pathname: '/dashboard'})
    }
  }

  handleSideDrawerToggleClick() {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  }
  handleBackdropClick() {
    this.setState({sideDrawerOpen: false});
  }
  handleSidedrawerClick() {
    this.setState({sideDrawerOpen: false});
  }


  render() {
    return (
      <div className="admin-dashboard-container">
        {this.state.sideDrawerOpen && <Backdrop onBackdropClick={this.handleBackdropClick} backgroundColor={"rgba(0, 0, 0, 0.5)"}/>}
        <SideDrawer showClass={this.state.sideDrawerOpen} onSidedrawerClick={this.handleSideDrawerToggleClick}/>
        <AdminNavbar onSideDrawerToggleClick={this.handleSideDrawerToggleClick}/>
        <section className="structure-container">
          <div className="structure">
            <div className="left-side-structure">
              <div className="left-menu-structure">
                <AdminMenuItems/>
              </div>
            </div>
            <div className="right-side-structure">
              account
              {/* <Route path="/account/dashboard" component={AgentDashboard}/>
              <Route path="/account/listings" exact component={AgentListings}/>
              <Route path="/account/listings/:id" component={AgentListingDetails}/>
              <Route path="/account/new-listing" component={ListingForm}/>
              <Route path="/account/profile" component={AgentProfile}/> */}
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Account;