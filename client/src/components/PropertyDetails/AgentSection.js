import React from 'react';
import NumberFormat from 'react-number-format';
import './AgentSection.css';

class AgentSection extends React.Component {
  constructor(props) {
    super(props)
  }

  renderImg() {
    if(this.props.agentInfo['AgentProfilePicture'] === null) {
      return <img src="https://agents-profile-pictures.s3.us-east-2.amazonaws.com/profile-avatar.png"
                  alt="Agent profile picture"/>
    } else {
      return <img src={this.props.agentInfo['AgentProfilePicture'].location} alt="agent"/>
    }
  }

  renderPhones() {
    if(this.props.agentInfo.phone_number && this.props.agentInfo.alt_phone_number) {
      return (
        <div>
          <span className="cel">
            Cel:
            <NumberFormat value={this.props.agentInfo.phone_number} displayType={'text'} format="(###) ###-####"/>
          </span>
          <span className="cel">
            Alt. Cel:
            <NumberFormat value={this.props.agentInfo.alt_phone_number} displayType={'text'} format="(###) ###-####"/>
          </span>
        </div>
      )
    } else if(this.props.agentInfo.phone_number && !this.props.agentInfo.alt_phone_number) {
      return (
        <span className="cel">
          Cel:
          <NumberFormat value={this.props.agentInfo.phone_number} displayType={'text'} format="(###) ###-####"/>
        </span>
      )
    } else if(!this.props.agentInfo.phone_number && !this.props.agentInfo.alt_phone_number) {
      return <div></div>
    }
  }

  render() {
    return (
      <div className="agent-section">
        <div className="agent-info">
          {this.renderImg()}
          <div className="agent-text">
            <h5>{this.props.agentInfo.name}</h5>
            {this.renderPhones()}
            <span className="properties-listed">{`Propiedades (${this.props.agentInfo.n_listings})`}</span>
          </div>
        </div>
        <div className="agent-cta-buttons">
          <span className="email-button" onClick={this.props.onContactClick}>Email</span>
          <span className="call-button">
            <a href={`tel:${this.props.agentInfo.phone_number}`}>Llamar</a>
          </span>
        </div>
      </div>
    )
  }
}

export default AgentSection;