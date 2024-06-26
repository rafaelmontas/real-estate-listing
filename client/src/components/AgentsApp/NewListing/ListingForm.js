import React from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import CircularProgressSpinner from '../../CircularProgressSpinner'
import BasicInfo from './BasicInfo'
import Details from './Details'
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import Photos from './Photos'
import Confirm from './Confirm'
import {agentContext} from '../agentContext'
import axios from 'axios';
import LoadingBackdrop from './LoadingBackdrop'
import gtag, { gaInit } from '../../../utils/GaUtils';
import ReactPixel from 'react-facebook-pixel';
import publicIp from "public-ip";
import './ListingForm.css'


class ListingForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      submitLoading: false,
      status: null,
      activeStep: 0,
      // Step 0
      propertyProvince: '',
      propertySector: '',
      propertyAddress: '',
      lat: null,
      lng: null,
      streetNumber: '',
      hideAddress: true,
      propertyType: '',
      listingType: '',
      // Step 1
      bedrooms: null,
      bathrooms: null,
      halfBathrooms: 0,
      parking: null,
      mts: null,
      price: null,
      amenities: {
        halfBath: false,
        aC: false,
        gameZone: false,
        laundryRoom: false,
        socialArea: false,
        elevator: false,
        balcony: false,
        familyRoom: false,
        centralGas: false,
        gym: false,
        serviceRoom: false,
        jacuzzy: false,
        lobby: false,
        pool: false,
        floor: false,
        powerPlant: false,
        security: false,
        wiCloset: false,
        furnished: false,
        securitySystem: false,
        hardwoodFloor: false
      },
      description: '',
      // Step 2
      imageFiles: []
    }
    this.nextStep = this.nextStep.bind(this)
    this.prevStep = this.prevStep.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleAddressSelect = this.handleAddressSelect.bind(this)
    this.handleHideAddress = this.handleHideAddress.bind(this)
    // Step 1
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleChecks = this.handleChecks.bind(this)
    // Step 2
    this.onDrop = this.onDrop.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    // Handle submit
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    // if(!window.google) {
    //   insertScript()
    //   this.timer = setTimeout(() => {
    //     this.setState({isLoading: false})
    //     // console.log('places api mounted')
    //   }, 2000)
    // } else {
    //   this.timer = setTimeout(() => {
    //     this.setState({isLoading: false})
    //     // console.log('places api already mounted')
    //   }, 1000)
    // }
    this.timer = setTimeout(() => {
      this.setState({isLoading: false})
      // console.log('places api already mounted')
    }, 1000)
    // Track page views GA
    if(process.env.NODE_ENV === 'production') {
      gaInit('G-JQMJWEW91Q', { send_page_view: true, page_title: 'Agent New Listing Page', user_id: this.context.agent.id })
      gtag('config', 'G-JQMJWEW91Q', {
        page_title: 'Agent New Listing Page',
        page_path: '/account/new-listing',
        send_page_view: false,
        user_id: this.context.agent.id
      })
    } else {
      gaInit('G-WFH68VZSHT', { send_page_view: true, page_title: 'Agent New Listing Page', user_id: this.context.agent.id })
      gtag('config', 'G-WFH68VZSHT', {
        page_title: 'Agent New Listing Page',
        page_path: '/account/new-listing',
        send_page_view: false,
        user_id: this.context.agent.id
      })
    }
    // Init Facebook Pixel
    if(process.env.NODE_ENV === 'production') {
      ReactPixel.init('689804211678157')
    } else {
      ReactPixel.init('587601035409958')
    }
    ReactPixel.pageView(); // For tracking page view
  }

  // Proceed to next stap
  nextStep = () => {
    this.setState({activeStep: this.state.activeStep + 1})
  }

  // Go back to prev step
  prevStep = () => {
    this.setState({activeStep: this.state.activeStep - 1})
  }
  // Render next button
  renderNextButton() {
    switch(this.state.activeStep) {
      case 0:
        if(this.state.propertyProvince && this.state.propertySector && this.state.propertyType && this.state.listingType) {
          return (
            <Button variant="contained" color="primary" onClick={this.nextStep}>
              Siguiente
            </Button>
          )
        } else {
          return (
            <Button
              disabled={true}
              variant="contained" color="primary" onClick={this.nextStep}>
              Siguiente
            </Button>
          )
        }
      case 1:
        if(this.state.bedrooms && this.state.bathrooms && this.state.parking && this.state.mts && this.state.price) {
          return (
            <Button variant="contained" color="primary" onClick={this.nextStep}>
              Siguiente
            </Button>
          )
        } else {
          return (
            <Button
              disabled={true}
              variant="contained" color="primary" onClick={this.nextStep}>
              Siguiente
            </Button>
          )
        }
      case 2:
        if(this.state.imageFiles.length !== 0) {
          return (
            <Button variant="contained" type="submit" color="primary">
              Publicar
            </Button>
          )
        } else {
          return (
            <Button
              disabled={true}
              variant="contained" color="primary" onClick={this.nextStep}>
              Publicar
            </Button>
          )
        }
    }
  }
  
  // Handle fields change
  handleChange = input => e => {
    // console.log([input], e.target.value)
    if(input === 'mts' || input === 'price') {
      if(isNaN(parseInt(e.target.value))) {
        this.setState({[input]: null})    
      } else {
        this.setState({[input]: parseInt(e.target.value)})  
      }
    } else {
      this.setState({[input]: e.target.value})
    }
  }
  handleSelectChange = (optionSelected, value) => {
    // console.log(optionSelected, value)
    this.setState({[optionSelected]: parseInt(value)})
  }
  handleAddressChange = address => {
    this.setState({propertyAddress: address.replace(', República Dominicana', '')})
  }
  handleAddressSelect = async value => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    this.setState({propertyAddress: value.replace(', República Dominicana', ''),lat: latLng.lat, lng: latLng.lng})
    // console.log(value, latLng)
  }
  handleHideAddress(e) {
    this.setState({[e.target.name]: e.target.checked  })
  }
  handleChecks(e) {
    e.persist()
    this.setState(prevState => ({
      amenities: {
        ...prevState.amenities,
        [e.target.name]: e.target.checked  
      }
    }))
  }
  onDrop = (imageFiles) => {
    // console.log(imageFiles);
    this.setState({
      imageFiles: this.state.imageFiles.concat(imageFiles.map(file => Object.assign(file, {preview: URL.createObjectURL(file)})))
    })
  }
  handleRemove = imageName => e => {
    // find the image's index
    const imageIndex = this.state.imageFiles.findIndex(e => e.name === imageName)
    // console.log(imageIndex)
    // remove the item from array
    this.state.imageFiles.splice(imageIndex, 1)
    // update the array
    this.setState([...this.state.imageFiles])
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({submitLoading: true})
    // console.log('submitted')
    const body = {
      province: this.state.propertyProvince,
      sector: this.state.propertySector,
      // listing_address: this.state.propertyAddress,
      lat: this.state.lat,
      lng: this.state.lng,
      // street_number: parseInt(this.state.streetNumber),
      active_location: !this.state.hideAddress,
      property_type: this.state.propertyType,
      listing_type: this.state.listingType,
      bedrooms: this.state.bedrooms,
      bathrooms: this.state.bathrooms,
      half_bathrooms: this.state.halfBathrooms,
      parking_spaces: this.state.parking,
      square_meters: this.state.mts,
      listing_price: this.state.price,
      description: this.state.description,
      agent_id: this.context.agent.id
    }
    const formData = new FormData()
    for(let i = 0; i < this.state.imageFiles.length; i++) {
      formData.append('listing-pictures', this.state.imageFiles[i])
    }

    axios.post(`/agents/${this.context.agent.id}/properties`, body)
          .then(res => {
            // console.log(res.data.msg, res.data.listing_id)
            const amenitiesBody = this.state.amenities
            return axios.post(`/api/properties/${res.data.listing_id}/amenities`, amenitiesBody)
          })
          .then(res => {
            // console.log(res.data.msg, res.data.listing_id)
            return axios.post(`/api/properties/${res.data.listing_id}/pictures`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
          })
          .then(res => {
            // console.log(res.data.msg)
            this.setState({submitLoading: false, status: res.status})
            gtag('event', 'new_listing', {
              event_category: 'engagement',
              event_label: 'new_listing_submitted'
            })
            ReactPixel.trackCustom('NewListing', {content_name: '/account/new-listing'})
          })
          .catch(err => {
            console.log(err.response.data.msg, err.response.status)
          })
  }

  getStepContent() {
    switch(this.state.activeStep) {
      case 0:
        return <BasicInfo
                  handleChange={this.handleChange}
                  handleAddressChange={this.handleAddressChange}
                  handleSelect={this.handleAddressSelect}
                  onHide={this.handleHideAddress}
                  propertyProvince={this.state.propertyProvince}
                  propertySector={this.state.propertySector}
                  propertyAddress={this.state.propertyAddress}
                  streetNumber={this.state.streetNumber}
                  hideAddress={this.state.hideAddress}
                  propertyType={this.state.propertyType}
                  listingType={this.state.listingType}/>
      case 1:
        return <Details
                  bedrooms={this.state.bedrooms}
                  bathrooms={this.state.bathrooms}
                  halfBathrooms={this.state.halfBathrooms}
                  parking={this.state.parking}
                  handleChange={this.handleChange}
                  handleSelectChange={this.handleSelectChange}
                  listingMts={this.state.mts}
                  listingPrice={this.state.price}
                  amenities={this.state.amenities}
                  onChecks={this.handleChecks}
                  description={this.state.description}/>
      case 2:
        return <Photos
                 handleDrop={this.onDrop}
                 handleRemove={this.handleRemove}
                 imageFiles={this.state.imageFiles}/>
    }
  }

  render() {
    if(this.state.isLoading) {
      return <CircularProgressSpinner/>
    } else if(this.state.status === 200) {
      return <Confirm/>
    } else {
        return (
          <div className="new-listing-container">
            {this.state.submitLoading && <LoadingBackdrop backgroundColor={"rgba(0, 0, 0, 0.5)"}/>}
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
            </Stepper>
            <form onSubmit={this.handleSubmit} className="step-content">
              {this.getStepContent()}
              <div className="action-buttons">
                <Button
                  disabled={this.state.activeStep === 0}
                  onClick={this.prevStep}
                  className={'back-button'}>
                  Atras
                </Button>
                {this.renderNextButton()}
              </div>
            </form>
          </div>
        )
      }
  }
}


function insertScript() {
  let mapsApiKey;
  if(process.env.NODE_ENV === 'production') {
    mapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY_PROD
  } else {
    mapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY
  }

  const {head} = document
  const script = document.createElement('script')
  script.id = 'newListingTag'
  script.type = 'text/javascript'
  script.async = false
  script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&libraries=places&language=es&region=DR`
  head.appendChild(script)
}

ListingForm.contextType = agentContext;
export default ListingForm;