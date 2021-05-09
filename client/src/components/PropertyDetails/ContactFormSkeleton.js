import React from 'react';
import Skeleton from "react-loading-skeleton";

class ContactFormSkeleton extends React.Component {
  render() {
    return (
      <div>
        <form className="form-wraper">
          <Skeleton height={'15px'} width={'160px'} duration={1}/>
          <div style={{display: "flex", justifyContent: "space-between", margin: "10px 0"}}>
            <Skeleton height={'40px'} width={'155px'} duration={1}/>
            <Skeleton height={'40px'} width={'155px'} duration={1}/>
          </div>
          <div style={{marginBottom: "10px"}}>
            <Skeleton height={'40px'} width={'320px'} duration={1}/>
          </div>
          <div style={{marginBottom: "10px"}}>
            <Skeleton height={'74px'} width={'320px'} duration={1}/>
          </div>
          <div>
            <Skeleton height={'40px'} width={'320px'} duration={1}/>
          </div>
        </form>
        <div className="agent-section-skeleton">
          <Skeleton height={'110px'} width={'360px'} duration={1}/>
        </div>
      </div>
    )
  }
}

export default ContactFormSkeleton;