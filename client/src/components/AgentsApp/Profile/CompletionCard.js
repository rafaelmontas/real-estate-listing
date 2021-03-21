import React from 'react'
import LinearProgress from '../../LinearProgress'

class CompletionCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      completion: 0
    }
  }

  componentDidMount() {
    const arr = [this.props.hasListings, this.props.hasPicture, this.props.hasNumber]
    const count = arr.filter(Boolean).length
    // console.log(count)

    if(count === 1) {
      this.setState({completion: 33})
    } else if(count === 2) {
      this.setState({completion: 66})
    } else if (count === 3) {
      this.setState({completion: 100})
    }
  }


  render() {
    return (
      <div className="agent-profile-completion profile-cards">
        <div className="completion-container">
          <h3>Completa tu perfil</h3>
          <div className="completion-bar">
            <span>{`${this.state.completion}%`}</span>
            <LinearProgress completion={this.state.completion}/>
          </div>
          <div className={this.props.hasPicture ? "task-to-complete task-completed" : "task-to-complete"}>
            <i className={this.props.hasPicture ? "fas fa-check-circle" : "far fa-circle"}></i>
            <span>Agregar foto de perfil</span>
          </div>
          <div className={this.props.hasNumber ? "task-to-complete task-completed" : "task-to-complete"}>
            <i className={this.props.hasNumber ? "fas fa-check-circle" : "far fa-circle"}></i>
            <span>Agregar número de teléfono</span>
          </div>
          <div className={this.props.hasListings ? "task-to-complete task-completed" : "task-to-complete"}>
            <i className={this.props.hasListings ? "fas fa-check-circle" : "far fa-circle"}></i>
            <span>Publicar propiedad</span>
          </div>
        </div>
      </div>
    )
  }
}

export default CompletionCard