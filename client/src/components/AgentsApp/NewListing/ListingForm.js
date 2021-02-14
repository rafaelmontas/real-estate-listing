import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import BasicInfo from './BasicInfo'
import './ListingForm.css'


class ListingForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
      propertyAddress: '',
      propertyType: '',
      email: 'ddef'
    }
    this.nextStep = this.nextStep.bind(this)
    this.prevStep = this.prevStep.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  // Proceed to next stap
  nextStep = () => {
    this.setState({activeStep: this.state.activeStep + 1})
  }

  // Go back to prev step
  prevStep = () => {
    this.setState({activeStep: this.state.activeStep - 1})
  }
  
  // Handle fields change
  handleChange = input => e => {
    console.log([input], e.target.value)
    this.setState({[input]: e.target.value})
  }

  getStepContent() {
    switch(this.state.activeStep) {
      case 0:
        return <BasicInfo
                  handleChange={this.handleChange}
                  propertyAddress={this.state.propertyAddress}
                  propertyType={this.state.propertyType}/>
      case 1:
        return <h1>Detalles</h1>
      case 2:
        return <h1>Fotos</h1>
      case 3:
        return <h1>confirm</h1>
    }
  }

  render() {
    return (
      <div className="new-listing-container">
        <Stepper activeStep={this.state.activeStep} alternativeLabel>
          <Step key='Información basica'>
            <StepLabel>Información basica</StepLabel>
          </Step>
          <Step key='Detalles'>
            <StepLabel>Detalles</StepLabel>
          </Step>
          <Step key='Fotos'>
            <StepLabel>Fotos</StepLabel>
          </Step>
          <Step key='Confirmar'>
            <StepLabel>Confirmar</StepLabel>
          </Step>
        </Stepper>
        <div className="step-content">
          {this.getStepContent()}
        </div>
        <div className="action-buttons">
          <Button
            disabled={this.state.activeStep === 0}
            onClick={this.prevStep}
            className={'classes.backButton'}>
            Atras
          </Button>
          <Button variant="contained" color="primary" onClick={this.nextStep}>
            {this.state.activeStep ===  2 ? 'Enviar' : 'Siguiente'}
          </Button>
        </div>
      </div>
    )
  }
}

export default ListingForm;