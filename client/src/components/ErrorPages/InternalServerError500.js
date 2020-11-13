import React from 'react';

const divStyle = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}


class InternalServerError500 extends React.Component {
  render() {
    return (
      <div style={divStyle}>
        <h1 style={{color: 'grey', fontSize: '70px'}}>500 
          <span style={{color: '#105dd2ba'}}> Server Error</span>
        </h1>
      </div>
    )
  }
}

export default InternalServerError500;