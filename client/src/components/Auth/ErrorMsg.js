import React from 'react';

const styles = {
  padding: '10px',
  borderRadius: '4px',
  backgroundColor: '#FDECEA',
  maxWidth: '400px',
  margin: '0 auto',
  textAlign: 'left',
  display: 'flex',
  alignItems: 'center'
}
const iconStyles = {
  marginRight: '15px',
  marginLeft: '10px',
  color: '#f94b4b',
  fontSize: '18px'
}
const msgStyles = {
  color: '#7B3C37',
  fontSize: '14px'
}

class ErrorMsg extends React.Component {
  render() {
    return (
      <div className="error-msg" style={styles}>
        <i className="fas fa-exclamation-circle" style={iconStyles}></i>
        <span style={msgStyles}>{this.props.errorMsg}</span>
      </div>
    )
  }
}

export default ErrorMsg;