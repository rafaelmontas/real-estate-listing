import React from 'react'
import {Link} from 'react-router-dom';

class Confirm extends React.Component {
  render() {
    return (
      <div className="confirmation-container">
        <i className="far fa-check-circle"></i>
        <h1>Propiedad Publicada!</h1>
        <p>Estarás recibiendo un correo electrónico una vez la publicación sea verificada.</p>
        <Link to="/account/listings">Ir a mis propiedades</Link>
      </div>
    )
  }
}

export default Confirm