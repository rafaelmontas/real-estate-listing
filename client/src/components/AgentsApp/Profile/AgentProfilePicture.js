import React from 'react'
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import './AgentProfilePicture.css'

class AgentProfilePicture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profilePicture: null,
      file: '',
      successMsg: '',
      errMsg: '',
      status: null,
      alertOpen: false,
      isLoading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleChange(e) {
    console.log(e.target.files[0])
    this.setState({profilePicture: e.target.files[0], isLoading: true}, () => {
      const formData = new FormData()
      formData.append('profileImg', this.state.profilePicture)
      axios.post('/agents/1/profile-pictures', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
            .then(res => {
              console.log(res.data)
              this.setState({
                file: res.data.file,
                successMsg: res.data.msg,
                status: res.status,
                errMsg: '',
                alertOpen: true,
                isLoading: false
              })
            })
            .catch(err => {
              console.log(err.response.data.msg)
              this.setState({
                successMsg: '',
                status: err.response.status,
                errMsg: err.response.data.msg,
                alertOpen: true,
                isLoading: false
              })
            })
    })
  }

  handleClose() {
    this.setState({alertOpen: false})
  }
  renderAlert() {
    if(this.state.status === 200) {
      return <MuiAlert elevation={6} variant="filled" severity="success">{this.state.successMsg}</MuiAlert>
    } else {
      return <MuiAlert elevation={6} variant="filled" severity="error">{this.state.errMsg}</MuiAlert>
    }
  }

  renderImg() {
    if(this.state.file) {
      return <img src={this.state.file} alt="Agent profile picture"/>
    } else {
      return <img src="https://agents-profile-pictures.s3.us-east-2.amazonaws.com/profile-avatar.png"
                  alt="Agent profile picture"/>
    }
  }
  
  render() {
    return (
      <div className="agent-info-text">
        <Snackbar open={this.state.alertOpen}
                  autoHideDuration={4000}
                  anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                  onClose={this.handleClose}
                  style={{top: '92px'}}>
          {this.renderAlert()}
        </Snackbar>
        {this.renderImg()}
        <div className="agent-info-right">
          <h3>{this.props.agentName}</h3>
          <span>Agente Inmobiliario</span>
          <form className="agent-profile-picture-form">
            <input type="file" id="agent-profile-picture"
                  onChange={this.handleChange}
                  accept="image/*" />
            <label htmlFor="agent-profile-picture">{this.state.isLoading ? 'Cargando...' : 'Editar foto'}</label>
          </form>
        </div>
      </div>
    )
  }
}

export default AgentProfilePicture