import React from 'react';
import { TextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import AgentSection from './AgentSection';
import ContactFormSkeleton from './ContactFormSkeleton';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import './ContactForm.css'

const inputStyles = {
  marginBottom: "10px"
}

class ContactForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      userEmail: '',
      userPhoneNumber: '',
      userText: "Hola, quisiera más información sobre esta propiedad.",
      leadStatus: null,
      alertOpen: false,
      msg: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleLead = this.handleLead.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    if(this.props.userInfo.isLoggedIn) {
      this.setState({
        userName: this.props.userInfo.user.name,
        userEmail: this.props.userInfo.user.email
      })
    }
  }
  componentDidUpdate(prevProps) {
    if(this.props.userInfo.isLoggedIn && !prevProps.userInfo.isLoggedIn) {
      this.setState({
        userName: this.props.userInfo.user.name,
        userEmail: this.props.userInfo.user.email
      })
    } else if(!this.props.userInfo.isLoggedIn && prevProps.userInfo.isLoggedIn) {
      this.setState({userName: '', userEmail: ''})
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleLead(e) {
    e.preventDefault()
    if(!this.props.userInfo.isLoggedIn) {
      console.log('not logged in')
      this.props.onLead()
    } else {
      const body = {
        user_id: this.props.userInfo.user.id,
        agent_id: this.props.agentInfo.id,
        listing_id: this.props.listing_id,
        initial_request: this.state.userText
      }
      axios.post(`/agents/${this.props.agentInfo.id}/leads`, body)
      .then(res => {
        console.log(res)
        this.setState({leadStatus: res.status, msg: res.data.msg, alertOpen: true})
      })
      .catch(err => {
        console.log(err)
        this.setState({leadStatus: err.response.status, msg: err.response.data.msg, alertOpen: true})
      })
    }
  }

  renderAlert() {
    if(this.state.leadStatus === 201) {
      return <MuiAlert elevation={6} variant="filled" severity="success">{this.state.msg}</MuiAlert>
    } else {
      return <MuiAlert elevation={6} variant="filled" severity="error">{this.state.msg}</MuiAlert>
    }
  }
  handleClose() {
    this.setState({alertOpen: false})
  }

  render() {
    if (this.props.loadingStatus) {
      return <ContactFormSkeleton/>
    } else {
      return (
        <div className="contact-container">
          <Snackbar open={this.state.alertOpen}
                    autoHideDuration={4000}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    onClose={this.handleClose}
                    style={{top: '92px'}}>
            {this.renderAlert()}
          </Snackbar>
          <form className="form-wraper" onSubmit={this.handleLead}>
            <h5>Solicitar Información</h5>
            <div className="top-inputs">
              <TextField id="standard-basic"
                         label="Nombre"
                         name="userName"
                         style={{marginRight: "10px"}}
                         variant="outlined"
                         size={this.props.size}
                         error={false}
                         helperText=""
                         value={this.state.userName}
                         onChange={this.handleChange}/>
              <NumberFormat customInput={TextField}
                            format="(###) ###-####"
                            label="Teléfono"
                            name="userPhoneNumber"
                            mask="_"
                            type="tel"
                            variant="outlined"
                            size={this.props.size}
                            value={this.state.userPhoneNumber}
                            onChange={this.handleChange}/>
            </div>
            <TextField id="standard-basic"
                       label="Email"
                       name="userEmail"
                       type="email"
                       fullWidth
                       style={inputStyles}
                       variant="outlined"
                       size={this.props.size}
                       error={false}
                       helperText=""
                       value={this.state.userEmail}
                       onChange={this.handleChange}/>
            <TextField id="outlined-basic"
                       label="Mensaje"
                       name="userText"
                       variant="outlined"
                       type="text"
                       fullWidth
                       multiline
                       style={inputStyles}
                       maxLength={40}
                       value={this.state.userText}
                       onChange={this.handleChange}/>
            <button className="send-button" type="submit">
              Solicitar Información
              {/* <i className="far fa-paper-plane"></i> */}
            </button>
          </form>
          <AgentSection agentInfo={this.props.agentInfo}/>
        </div>
      )
    }
  }
}

export default ContactForm;