import React from 'react'
import './AgentsApp'

class Structure extends React.Component {
  render() {
    return (
      <section className="structure-container">
        <div className="structure">
          <div className="left-side-structure">
            <div className="left-menu-structure">
              {this.props.children}
            </div>
          </div>
          <div className="right-side-structure">
            right
          </div>
        </div>
      </section>
    )
  }
}

export default Structure