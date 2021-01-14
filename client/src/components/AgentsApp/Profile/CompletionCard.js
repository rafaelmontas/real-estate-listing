import React from 'react'
import LinearProgress from '../../LinearProgress'

class CompletionCard extends React.Component {
  render() {
    return (
      <div className="agent-profile-completion profile-cards">
        <div className="completion-container">
          <h3>Completa tu perfil</h3>
          <div className="completion-bar">
            <span>45%</span>
            <LinearProgress/>
          </div>
          <div className="task-to-complete">
            <i className="far fa-circle"></i>
            <span>Agregar foto de perfil</span>
          </div>
          <div className="task-to-complete task-completed">
            <i className="fas fa-check-circle"></i>
            <span>Agregar número de teléfono</span>
          </div>
          <div className="task-to-complete">
            <i className="far fa-circle"></i>
            <span>Publicar propiedad</span>
          </div>
        </div>
      </div>
    )
  }
}

export default CompletionCard