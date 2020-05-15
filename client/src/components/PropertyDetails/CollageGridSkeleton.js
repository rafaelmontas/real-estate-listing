import React from 'react';
import Skeleton from "react-loading-skeleton";

class CollageGridSkeleton extends React.Component {
  render() {
    return (
      <div className="collage-grid">
        <Skeleton height={'100%'} width={'100%'} duration={1}/>
      </div>
    )
  }
}

export default CollageGridSkeleton;