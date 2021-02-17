import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import CircularProgressSpinner from '../../CircularProgressSpinner'
import BasicInfo from './BasicInfo'
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import './ListingForm.css'


class ListingForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      activeStep: 0,
      // Step 0
      propertyAddress: '',
      lat: null,
      lng: null,
      propertyType: '',
      listingType: ''
    }
    this.nextStep = this.nextStep.bind(this)
    this.prevStep = this.prevStep.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleAddressSelect = this.handleAddressSelect.bind(this)
  }

  componentDidMount() {
    if(!window.google) {
      insertScript()
      this.timer = setTimeout(() => {
        this.setState({isLoading: false})
        console.log('places api mounted')
      }, 2000)
    } else {
      this.timer = setTimeout(() => {
        this.setState({isLoading: false})
        console.log('places api already mounted')
      }, 1000)
    }
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
  handleAddressChange = address => {
    this.setState({propertyAddress: address})
  }
  handleAddressSelect = async value => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    this.setState({propertyAddress: value,lat: latLng.lat, lng: latLng.lng})
    console.log(value, latLng)
  }

  getStepContent() {
    switch(this.state.activeStep) {
      case 0:
        return <BasicInfo
                  handleChange={this.handleChange}
                  handleAddressChange={this.handleAddressChange}
                  handleSelect={this.handleAddressSelect}
                  propertyAddress={this.state.propertyAddress}
                  propertyType={this.state.propertyType}
                  listingType={this.state.listingType}/>
      case 1:
        return <h1>Detalles</h1>
      case 2:
        return <h1>Fotos</h1>
      case 3:
        return <h1>confirm</h1>
    }
  }

  render() {
    if(this.state.isLoading) {
      return <CircularProgressSpinner/>
    } else {
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
}


function insertScript() {
  const {head} = document
  const script = document.createElement('script')
  script.id = 'newListingTag'
  script.type = 'text/javascript'
  script.async = false
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places&language=es`
  head.appendChild(script)
}

export default ListingForm;