import React from 'react';
import ContactForm from './ContactForm';
import './ContactFormModal.css'

class ContactFormModal extends React.Component {
  
  componentDidMount() {
    document.body.classList.toggle("noscroll")
  }
  componentWillUnmount() {
    document.body.classList.toggle("noscroll")
  }

  render() {
    return (
      <div className="contact-modal">
        <div className="contact-header">
          <span onClick={this.props.onCloseClick}>
            <i className="fas fa-times"></i>
          </span>
        </div>
        <ContactForm size={this.props.size}
                     agentInfo={this.props.agentInfo}
                     userInfo={this.props.userInfo}
                     onLead={this.props.onLead}
                     listing_id={this.props.listing_id}/>
      </div>
    )
  }
}
export default ContactFormModal;