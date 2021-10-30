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
import gtag, { gaInit } from '../../../utils/GaUtils';
import ReactPixel from 'react-facebook-pixel';
import publicIp from "public-ip";
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
  async componentDidMount() {
    this.setState({ isLoading: true })
    this.timer = setTimeout(() => {
      // Get agent profile
      const agentJwt = localStorage.getItem('agent-jwt')
      axios.get(`/agents/${this.context.agent.id}`, {headers: { 'agent-auth': agentJwt }})
            .then(agent => {
              // console.log(agent.data)
              this.setState({agent: agent.data, isLoading: false})
            })
            .catch(err => console.log(err.response.data))
    }, 1000)
    // Track page views GA
    if(process.env.NODE_ENV === 'production') {
      gaInit('G-JQMJWEW91Q', { send_page_view: true, page_title: 'Agent Profile Page', user_id: this.context.agent.id })
      gtag('config', 'G-JQMJWEW91Q', {
        page_title: 'Agent Profile Page',
        page_path: '/account/profile',
        send_page_view: false,
        user_id: this.context.agent.id
      })
    } else {
      gaInit('G-WFH68VZSHT', { send_page_view: true, page_title: 'Agent Profile Page', user_id: this.context.agent.id })
      gtag('config', 'G-WFH68VZSHT', {
        page_title: 'Agent Profile Page',
        page_path: '/account/profile',
        send_page_view: false,
        user_id: this.context.agent.id
      })
    }
    // Init Facebook Pixel
    if(process.env.NODE_ENV === 'production') {
      ReactPixel.init('689804211678157')
    } else {
      ReactPixel.init('587601035409958')
    }
    ReactPixel.pageView(); // For tracking page view
  }

  handleUpdate(body) {
    console.log(body)
    const agentJwt = localStorage.getItem('agent-jwt')
    axios.put(`/agents/${this.state.agent.id}`, body, {headers: {'agent-auth': agentJwt}})
        .then(res => {
          // console.log(res.data.msg, res.data.updatedAgent)
          this.setState({
            agent: res.data.updatedAgent,
            successMsg: res.data.msg,
            status: res.status,
            errMsg: '',
            alertOpen: true
          })
        })
        .then(() => {
          let listId;
          let apiKey;
          if(process.env.NODE_ENV === 'production') {
            listId = process.env.REACT_APP_SENDGRID_REGISTERED_AGENTS_LIST_ID;
            apiKey = process.env.REACT_APP_SENDGRID_PROD_API_KEY
          } else {
            listId = process.env.REACT_APP_SENDGRID_TEST_LIST_ID;
            apiKey = process.env.REACT_APP_SENDGRID_DEV_API_KEY
          }
          const body = {
            list_ids: [`${listId}`],
            contacts: [
              {
                email: this.state.agent.email,
                phone_number: this.state.agent.phone_number,
                custom_fields: {"e1_T": this.state.agent.name, "e3_T": this.state.agent.alt_phone_number}
              }
            ]
          }
          const config = {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            }
          }
          // return axios.put('https://api.sendgrid.com/v3/marketing/contacts', body, config)
        })
        .then(() => {
          this.timer = setTimeout(() => {
            window.location.reload();
          }, 5000)
        })
        .catch(err => {
          // console.log(err.response.data.msg)
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
          // console.log(err.response.data.msg)
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
                                         agentId={this.state.agent.id}
                                         profilePicture={this.state.agent['AgentProfilePicture'] ? this.state.agent['AgentProfilePicture'].location : ''}/>
                  </div>
                  {/* <div className="top-info-right">
                    <span>Perfil público</span>
                  </div> */}
                </div>
                <div className="bottom-info">
                  <div className="member-since-info">
                    <span>{`Miembro desde: ${dateFormat(this.state.agent.createdAt, "dd/mm/yy")}`}</span>
                    {/* <span>8 Propiedades</span> */}
                  </div>
                </div>
              </div>
              <CompletionCard
                hasPicture={Boolean(this.state.agent['AgentProfilePicture'])}
                hasNumber={Boolean(this.state.agent.phone_number)}
                hasListings={Boolean(this.state.agent.properties && this.state.agent.properties.length)}
                />
              <div className="agent-edits profile-cards">
                <AgentProfileForms agent={this.state.agent} handleUpdate={this.handleUpdate} onDeleteClick={this.handleDeleteClick}/>
              </div>
            </main>
            <aside className="aside-info">
              <CompletionCard
                hasPicture={Boolean(this.state.agent['AgentProfilePicture'])}
                hasNumber={Boolean(this.state.agent.phone_number)}
                hasListings={Boolean(this.state.agent.properties && this.state.agent.properties.length)}
                />
            </aside>
          </div>
        </div>
      )
    }
  }
}

AgentProfile.contextType = agentContext;
export default AgentProfile