import React from 'react'
import AgentProfileForms from './AgentProfileForms'
import CompletionCard from './CompletionCard'
import CircularProgressSpinner from '../../CircularProgressSpinner'
import NumberFormat from 'react-number-format';
import {agentContext} from '../agentContext';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import dateFormat from 'dateformat'
import Backdrop from '../../Backdrop'
import DeleteModal from '../../MyHauzzy/Profile/DeleteModal'
import AgentProfilePicture from './AgentProfilePicture'
import './AgentProfile.css'

class AgentProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      agent: {},
      isLoading: false,
      successMsg: '',
      errMsg: '',
      alertOpen: false,
      deleteOpen: false
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleBackdropClick = this.handleBackdropClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    this.setState({ isLoading: true })
    this.timer = setTimeout(() => {
      // Get agent profile
      const agentJwt = localStorage.getItem('agent-jwt')
      axios.get(`/agents/${this.context.agent.id}`, {headers: { 'agent-auth': agentJwt }})
            .then(agent => {
              console.log(agent.data)
              this.setState({agent: agent.data, isLoading: false})
            })
            .catch(err => console.log(err.response.data))
    }, 1000)
  }

  handleUpdate(body) {
    console.log(body)
    const agentJwt = localStorage.getItem('agent-jwt')
    axios.put(`/agents/${this.state.agent.id}`, body, {headers: {'agent-auth': agentJwt}})
        .then(res => {
          console.log(res.data.msg, res.data.updatedAgent)
          this.setState({
            agent: res.data.updatedAgent,
            successMsg: res.data.msg,
            status: res.status,
            errMsg: '',
            alertOpen: true
          })
          this.timer = setTimeout(() => {
            window.location.reload();
          }, 5000)
        })
        .catch(err => {
          console.log(err.response.data.msg)
          this.setState({
            successMsg: '',
            errMsg: err.response.data.msg,
            status: err.response.status,
            alertOpen:true
          })
        })
  }
  handleDelete() {
    const agentJwt = localStorage.getItem('agent-jwt')
    axios.delete(`/agents/${this.state.agent.id}`, {
      headers: {
        'agent-auth': agentJwt
      }
    })
        .then(() => this.context.logOut())
        .catch(err => {
          console.log(err.response.data.msg)
          this.setState({
            successMsg: '',
            errMsg: err.response.data.msg,
            status: err.response.status,
            alertOpen:true
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
  handleDeleteClick() {
    this.setState({deleteOpen: true})
  }
  handleBackdropClick() {
    this.setState({
      deleteOpen: false
    });
  }

  renderPhones() {
    if(this.state.agent.phone_number && this.state.agent.alt_phone_number) {
      return (
        <div>
          <span className="cel">
            Cel:
            <NumberFormat value={this.state.agent.phone_number} displayType={'text'} format="(###) ###-####"/>
          </span>
          <span className="cel">
            Tel. Secundario:
            <NumberFormat value={this.state.agent.alt_phone_number} displayType={'text'} format="(###) ###-####"/>
          </span>
        </div>
      )
    } else {
      return (
        <span className="cel">
          Cel:
          <NumberFormat value={this.state.agent.phone_number} displayType={'text'} format="(###) ###-####"/>
        </span>
      )
    }
  }
  
  render() {
    if(this.state.isLoading) {
      return <CircularProgressSpinner/>
    } else {
      return (
        <div className="agent-profile-component">
          <Snackbar open={this.state.alertOpen}
                    autoHideDuration={4000}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    onClose={this.handleClose}
                    style={{top: '92px'}}>
            {this.renderAlert()}
          </Snackbar>
          {this.state.deleteOpen && <Backdrop onBackdropClick={this.handleBackdropClick} backgroundColor={"rgba(0, 0, 0, 0.5)"}/>}
          {this.state.deleteOpen && <DeleteModal onCancelClick={this.handleBackdropClick} onDeleteConfirm={this.handleDelete}/>}
          <div className="agent-container">
            <main className="main-left">
              <div className="agent-header profile-cards">
                <div className="top-info">
                  <div className="top-info-left">
                    <AgentProfilePicture agentName={this.state.agent.name}
                                         profilePicture={this.state.agent['AgentProfilePicture'] ? this.state.agent['AgentProfilePicture'].location : ''}/>
                  </div>
                  <div className="top-info-right">
                    <span>Perfil público</span>
                  </div>
                </div>
                <div className="bottom-info">
                  <div className="member-since-info">
                    <span>{`Miembro desde: ${dateFormat(this.state.agent.createdAt, "dd/mm/yy")}`}</span>
                    <span>8 Propiedades</span>
                  </div>
                </div>
              </div>
              <CompletionCard/>
              <div className="agent-edits profile-cards">
                <AgentProfileForms agent={this.state.agent} handleUpdate={this.handleUpdate} onDeleteClick={this.handleDeleteClick}/>
              </div>
            </main>
            <aside className="aside-info">
              <CompletionCard/>
              <div className="profile-preview profile-cards">
                <div className="profile-preview-container">
                  <h3>Vista preliminar</h3>
                  <div className="agent-preview">
                    <img src="https://s3.amazonaws.com/real.estate.dom/agent.jpg" alt="Agent profile picture"/>
                    <div className="agent-text">
                      <h5>{this.state.agent.name}</h5>
                      {this.renderPhones()}
                      <span className="properties-listed">Propiedades (15)</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      )
    }
  }
}

AgentProfile.contextType = agentContext;
export default AgentProfile