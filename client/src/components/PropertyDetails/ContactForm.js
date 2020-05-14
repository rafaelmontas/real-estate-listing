import React from 'react';
import { TextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import './ContactForm.css'

const inputStyles = {
  marginBottom: "10px"
}

class ContactForm extends React.Component {
  render() {
    return (
      <div className="contact-container">
        
        <form className="form-wraper">
          <h5>Solicitar Información</h5>
          <div className="top-inputs">
            <TextField id="standard-basic" label="Nombre" style={{marginRight: "10px"}}/>
            <NumberFormat customInput={TextField} format="(###) ###-####"
                        label="Teléfono"
                        mask="_"
                        type="tel"/>
          </div>
          <TextField id="standard-basic" label="Email" type="email" fullWidth style={{marginBottom: "30px"}}/>
          <TextField id="outlined-basic" label="Mensaje" variant="outlined" type="text" fullWidth multiline
                    defaultValue="Hola, Me interesa. Quisiera más información sobre esta propiedad. Gracias!"
                    style={inputStyles}
                    maxLength={40}/>
          <span className="send-button">
            Enviar
            <i className="far fa-paper-plane"></i>
          </span>
        </form>
        <div className="broker-info">
          <h5>Inmobiliaria</h5>
        </div>
      </div>
    )
  }
}

export default ContactForm;