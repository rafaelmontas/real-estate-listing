import React from 'react';
import { TextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import ContactFormSkeleton from './ContactFormSkeleton';
import './ContactForm.css'

const inputStyles = {
  marginBottom: "10px"
}

class ContactForm extends React.Component {
  render() {
    if (this.props.loadingStatus) {
      return <ContactFormSkeleton/>
    } else {
      return (
        <div className="contact-container">
          <form className="form-wraper">
            <h5>Solicitar Información</h5>
            <div className="top-inputs">
              <TextField id="standard-basic"
                         label="Nombre"
                         style={{marginRight: "10px"}}
                         variant="outlined"
                         size="small"
                         error={false}
                         helperText=""/>
              <NumberFormat customInput={TextField}
                            format="(###) ###-####"
                            label="Teléfono"
                            mask="_"
                            type="tel"
                            variant="outlined"
                            size="small"/>
            </div>
            <TextField id="standard-basic"
                       label="Email"
                       type="email"
                       fullWidth
                       style={inputStyles}
                       variant="outlined"
                       size="small"
                       error={false}
                       helperText=""/>
            <TextField id="outlined-basic"
                       label="Mensaje"
                       variant="outlined"
                       type="text"
                       fullWidth
                       multiline
                       defaultValue="Hola, Me interesa. Quisiera más información sobre esta propiedad. 
                                     Gracias!"
                       style={inputStyles}
                       maxLength={40}/>
            <span className="send-button">
              Enviar
              <i className="far fa-paper-plane"></i>
            </span>
          </form>
          <div className="broker-info">
            <div className="agent-info">
              <img src="https://s3.amazonaws.com/real.estate.dom/agent.jpg" alt="agent"/>
              <div className="agent-text">
                <h5>Agent Name</h5>
                <span className="cel">
                  Cel:
                  <NumberFormat value={8296483530} displayType={'text'} format="(###) ###-####"/>
                </span>
                <span className="cel">
                  Whatsapp:
                  <NumberFormat value={8296483530} displayType={'text'} format="(###) ###-####"/>
                </span>
                <span className="properties-listed">Propiedades (15)</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default ContactForm;