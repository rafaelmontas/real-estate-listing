import React from 'react';
import './BrokerSection.css';

class BrokerSection extends React.Component {
  render() {
    return (
      <div className="broker-section">
        <div className="broker-name">
          Inmobiliaria:
          <span>Remax RD</span>
        </div>
        <div className="broker-logo">
          <img src="https://s3.amazonaws.com/real.estate.dom/remax-logo.png" alt="logo"/>
        </div>
      </div>
    )
  }
}

export default BrokerSection;