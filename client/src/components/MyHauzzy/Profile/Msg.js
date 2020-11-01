import React from 'react';

const errorStyles = {
  padding: '15px 20px',
  borderRadius: '4px',
  backgroundColor: '#FDECEA',
  maxWidth: '400px',
  margin: '0 auto 20px',
  textAlign: 'left',
  display: 'flex',
  alignItems: 'center'
}

const iconErrorStyles = {
  marginRight: '15px',
  marginLeft: '10px',
  color: '#f94b4b',
  fontSize: '18px'
}
const msgErrorStyles = {
  color: '#7B3C37',
  fontSize: '14px'
}

// Success styles
const successStyles = {
  padding: '15px 20px',
  borderRadius: '4px',
  backgroundColor: '#EDF7ED',
  maxWidth: '400px',
  margin: '0 auto 20px',
  textAlign: 'left',
  display: 'flex',
  alignItems: 'center'
}

const iconSuccessStyles = {
  marginRight: '15px',
  marginLeft: '10px',
  color: '#5CB660',
  fontSize: '18px'
}
const msgSuccessStyles = {
  color: '#1F4722',
  fontSize: '14px'
}

class Msg extends React.Component {
  render() {
    return (
      <div className="message" style={this.props.status === 200 ? successStyles : errorStyles}>
        {this.props.status === 200 ? <i className="far fa-check-circle" style={iconSuccessStyles}></i> : <i className="fas fa-exclamation-circle" style={iconErrorStyles}></i>}
        <span style={this.props.status === 200 ? msgSuccessStyles : msgErrorStyles}>{this.props.msg}</span>
      </div>
    )
  }
}

export default Msg;