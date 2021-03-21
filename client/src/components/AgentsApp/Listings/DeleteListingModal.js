import React from 'react'
import './DeleteListingModal.css'

class DeleteListingModal extends React.Component {
  render() {
    return (
      <div className="delete-modal">
        <div className="delete-header">
          <span>Confirmar</span>
          <i className="far fa-times-circle" onClick={this.props.onCancelClick}></i>
        </div>
        <div className="delete-body">
          <i className="fas fa-exclamation-triangle"></i>
          <span>Seguro que desea eliminar la propiedad?<br/>Esta acción no se puede deshacer.</span>
        </div>
        <div className="delete-actions">
          <div className="delete-cancel" onClick={this.props.onCancelClick}>Cancelar</div>
          <div className="delete-ok" onClick={this.props.onDeleteConfirm}>Eliminar</div>
        </div>
      </div>
    )
  }
}

export default DeleteListingModal