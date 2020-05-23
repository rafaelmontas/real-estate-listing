import React from 'react';
import { TextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import AgentSection from './AgentSection';
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
                         size={this.props.size}
                         error={false}
                         helperText=""/>
              <NumberFormat customInput={TextField}
                            format="(###) ###-####"
                            label="Teléfono"
                            mask="_"
                            type="tel"
                            variant="outlined"
                            size={this.props.size}/>
            </div>
            <TextField id="standard-basic"
                       label="Email"
                       type="email"
                       fullWidth
                       style={inputStyles}
                       variant="outlined"
                       size={this.props.size}
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
          <AgentSection tel={"8296483530"}/>
        </div>
      )
    }
  }
}

export default ContactForm;