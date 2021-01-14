import React from 'react'
import AgentProfileForms from './AgentProfileForms'
import CompletionCard from './CompletionCard'
import CircularProgressSpinner from '../../CircularProgressSpinner'
import NumberFormat from 'react-number-format';
import './AgentProfile.css'
// import Profile from '../../MyHauzzy/Profile/Profile'

class AgentProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }
  componentDidMount() {
    this.setState({ isLoading: true })
    this.timer = setTimeout(() => {
      this.setState({ isLoading: false })
    }, 1000)
  }

  
  render() {
    if(this.state.isLoading) {
      return <CircularProgressSpinner/>
    } else {
      return (
        <div className="agent-profile-component">
          <div className="agent-container">
            <main className="main-left">
              <div className="agent-header profile-cards">
                <div className="top-info">
                  <div className="top-info-left">
                    <div className="agent-img">
  
                    </div>
                    <div className="agent-info-text">
                      <h3>Rafael Montas</h3>
                      <span>Agente Inmobiliario</span>
                    </div>
                  </div>
                  <div className="top-info-right">
                    <span>Perfil público</span>
                  </div>
                </div>
                <div className="bottom-info">
                  <div className="member-since-info">
                    <span>Miembro desde: 12/01/2021</span>
                    <span>8 Propiedades</span>
                  </div>
                </div>
              </div>
              <CompletionCard/>
              <div className="agent-edits profile-cards">
                <AgentProfileForms/>
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
                      <h5>Rafael Montas</h5>
                      <span className="cel">
                        Cel:
                        <NumberFormat value={8296483530} displayType={'text'} format="(###) ###-####"/>
                      </span>
                      {/* <span className="cel">
                        Whatsapp:
                        <NumberFormat value={this.props.tel} displayType={'text'} format="(###) ###-####"/>
                      </span> */}
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

export default AgentProfile