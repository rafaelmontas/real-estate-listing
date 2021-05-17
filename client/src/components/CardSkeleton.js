import React from 'react'
import Skeleton from "react-loading-skeleton";


class CardSkeleton extends React.Component {

  renderSkeleton() {
    return (
      <div className="home-card-container">
        <div className="home-card" style={{boxShadow: 'none'}}>
          <a href="/">
            <div className="property-card-media">
              <div className="photo-container">
                <Skeleton height={150} width={'100%'} duration={1}/>
              </div>
            </div>
            <div className="property-card-info" style={{paddingLeft: '0'}}>
              <span className="home-card-price"><Skeleton height={20} width={'50%'} duration={1}/></span>
              <div className="home-card-stats" style={{display: 'block'}}>
                <Skeleton height={15} width={'40%'} duration={1}/>
              </div>
              <div className="home-card-address"><Skeleton height={12} width={'80%'} duration={1}/></div>
            </div>
          </a>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div style={{width: '100%', display: 'flex', flexWrap: 'wrap'}}>
        {this.renderSkeleton()}
        {this.renderSkeleton()}
        {this.renderSkeleton()}
        {this.renderSkeleton()}
        {this.renderSkeleton()}
        {this.renderSkeleton()}
        {this.renderSkeleton()}
        {this.renderSkeleton()}
        {this.renderSkeleton()}
        {this.renderSkeleton()}
      </div>
    )
  }
}

export default CardSkeleton;
