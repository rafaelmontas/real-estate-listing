import React from 'react';
import './UpdateModal.css'

class UpdateModal extends React.Component {
  render() {
    return (
      <div className="update-modal">
        <div className="update-header">
          <span>Confirmar</span>
          <i className="far fa-times-circle" onClick={this.props.onCancelClick}></i>
        </div>
        <div className="update-body">
          <i className="fas fa-exclamation-triangle"></i>
          <span>Al actualizar la propiedad su estatus cambiará a 'Pendiente' para ser verificada nuevamente.</span>
        </div>
        <div className="update-actions">
          <div className="update-cancel" onClick={this.props.onCancelClick}>Cancelar</div>
          <div className="update-ok" onClick={this.props.onUpdateConfirm}>Actualizar</div>
        </div>
      </div>
    )
  }
}

export default UpdateModal;