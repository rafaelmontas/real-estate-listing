import React from 'react';
import NumberFormat from 'react-number-format';
import './AgentSection.css';

class AgentSection extends React.Component {
  render() {
    return (
      <div className="agent-section">
        <div className="agent-info">
          <img src="https://s3.amazonaws.com/real.estate.dom/agent.jpg" alt="agent"/>
          <div className="agent-text">
            <h5>Agent Name</h5>
            <span className="cel">
              Cel:
              <NumberFormat value={this.props.tel} displayType={'text'} format="(###) ###-####"/>
            </span>
            <span className="cel">
              Whatsapp:
              <NumberFormat value={this.props.tel} displayType={'text'} format="(###) ###-####"/>
            </span>
            <span className="properties-listed">Propiedades (15)</span>
          </div>
        </div>
        <div className="agent-cta-buttons">
          <span className="email-button" onClick={this.props.onContactClick}>Email</span>
          <span className="call-button">
            <a href={`tel:${this.props.tel}`}>Llamar</a>
          </span>
        </div>
      </div>
    )
  }
}

export default AgentSection;