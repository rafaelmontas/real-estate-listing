import React from 'react';
import NumberFormat from 'react-number-format';
import image from "../../../../demo_img/house1.png"
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import axios from 'axios';
import ListingEditForm from './ListingEditForm'
import ListingMap from './ListingMap'
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LoadingBackdrop from '../../../AgentsApp/NewListing/LoadingBackdrop'
// import Backdrop from '../../../Backdrop'
// import UpdateModal from '../../../AgentsApp/Listings/UpdateModal'
import './ReportEditListing.css'

class ReportEditListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      listing: {},
      imageToUpload: [],
      imageToDelete: [],
      alertOpen: false,
      successMsg: '',
      errMsg: '',
      status: null,
      updateLoading: false
    }
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleAddressSelect = this.handleAddressSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBedroomChange = this.handleBedroomChange.bind(this)
    this.handleBathroomChange = this.handleBathroomChange.bind(this)
    this.handleHalfBathroomChange = this.handleHalfBathroomChange.bind(this)
    this.handleParkingChange = this.handleParkingChange.bind(this)
    this.handleChecks = this.handleChecks.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    // this.handleUpdateClick = this.handleUpdateClick.bind(this)
    // this.handleBackdropClick = this.handleBackdropClick.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    axios.get(`/agents/${this.props.id}/properties/${this.props.match.params.id}`)
    .then(listing => {
      console.log(listing)
      this.setState({listing: listing.data.listing});
    })
    .catch(err => {
      console.log(err.response.data, err.response.status)
    })
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

  handleAddressChange = address => {
    this.setState(prevState => {
      let listing = {...prevState.listing}
      listing.listing_address = address
      return {listing}
    })
  }
  handleAddressSelect = async value => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    this.setState(prevState => {
      let listing = {...prevState.listing}
      listing.listing_address = value
      listing.lat = latLng.lat
      listing.lng = latLng.lng
      return {listing}
    })
    console.log(value, latLng)
  }
  handleChange = input => e => {
    e.persist()
    console.log([input], e.target.value)
    if(input === 'square_meters' || input === 'listing_price') {
      if(isNaN(parseInt(e.target.value))) {
        // this.setState({[input]: null})
        this.setState(prevState => {
          let listing = {...prevState.listing}
          listing[input] = null
          return {listing}
        })    
      } else {
        // this.setState({[input]: parseInt(e.target.value)})
        this.setState(prevState => {
          let listing = {...prevState.listing}
          listing[input] = parseInt(e.target.value)
          return {listing}
        })
      }
    } else {
      this.setState(prevState => {
        let listing = {...prevState.listing}
        listing[input] = e.target.value
        return {listing}
      })
    }
  }
  handleBedroomChange = (optionSelected) => {
    // this.setState({bedrooms: parseInt(optionSelected.value)})
    this.setState(prevState => {
      let listing = {...prevState.listing}
      listing.bedrooms = parseInt(optionSelected.value)
      return {listing}
    })
  }
  handleBathroomChange = (optionSelected) => {
    // this.setState({bathrooms: parseInt(optionSelected.value)})
    this.setState(prevState => {
      let listing = {...prevState.listing}
      listing.bathrooms = parseInt(optionSelected.value)
      return {listing}
    })
  }
  handleHalfBathroomChange = (optionSelected) => {
    // this.setState({halfBathrooms: parseInt(optionSelected.value)})
    this.setState(prevState => {
      let listing = {...prevState.listing}
      listing.half_bathrooms = parseInt(optionSelected.value)
      return {listing}
    })
  }
  handleParkingChange = (optionSelected) => {
    // this.setState({parking: parseInt(optionSelected.value)})
    this.setState(prevState => {
      let listing = {...prevState.listing}
      listing.parking_spaces = parseInt(optionSelected.value)
      return {listing}
    })
  }
  handleChecks(e) {
    e.persist()
    this.setState(prevState => {
      let listing = {...prevState.listing}
      listing['PropertyAmenity'][e.target.name] = e.target.checked
      return {listing}
    })
  }
  handleDrop = (imageFiles) => {
    console.log(imageFiles);
    this.setState(prevState => {
      let listing = {...prevState.listing}
      listing['PropertyPictures'] = listing['PropertyPictures'].concat(imageFiles.map(file => Object.assign(file, {location: URL.createObjectURL(file)})))
      return {listing}
    })
    this.setState({imageToUpload: this.state.imageToUpload.concat(imageFiles)})
  }
  handleRemove = imageName => e => {
    // find the image's index
    let imageIndex;
    if(this.state.listing['PropertyPictures'].findIndex(e => e.original_name === imageName) === -1) {
      imageIndex = this.state.listing['PropertyPictures'].findIndex(e => e.name === imageName)
    } else {
      imageIndex = this.state.listing['PropertyPictures'].findIndex(e => e.original_name === imageName)
    }
    console.log(imageIndex)
    // Add to array of images to delete if image in db
    if(this.state.listing['PropertyPictures'][imageIndex].id) {
      console.log(this.state.listing['PropertyPictures'][imageIndex].id)
      this.setState({
        imageToDelete: this.state.imageToDelete.concat([this.state.listing['PropertyPictures'][imageIndex].id])
      })
    }

    // remove the item from array
    this.state.listing['PropertyPictures'].splice(imageIndex, 1)
    // update the array
    this.setState(prevState => {
      let listing = {...prevState.listing}
      listing['PropertyPictures'] = this.state.listing['PropertyPictures']
      return {listing}
    })
    
    // Remove image to upload
    if(this.state.imageToUpload.findIndex(e => e.name === imageName) !== -1) {
      const uploadIndex = this.state.imageToUpload.findIndex(e => e.name === imageName)
      this.state.imageToUpload.splice(uploadIndex, 1)
      this.setState(prevState => {
        let imageToUpload = {...prevState.imageToUpload}
        imageToUpload = this.state.imageToUpload
        return {imageToUpload}
      })
    }
  }
  // Form Submit
  // handleUpdateClick() {
  //   this.setState({updateOpen: true})
  // }
  // handleBackdropClick() {
  //   this.setState({
  //     updateOpen: false
  //   });
  // }
  handleUpdate(e) {
    e.preventDefault()
    const body = this.state.listing
    console.log(body, 'update...')
    this.setState({updateLoading: true})
    
    const amenities = body['PropertyAmenity']
    axios.put(`/api/properties/${this.props.match.params.id}/amenities/${this.state.listing['PropertyAmenity'].id}`, amenities)
      .then(res => {
        console.log(res.data.msg)
        if(this.state.imageToUpload.length > 0) {
          const formData = new FormData()
          for(let i = 0; i < this.state.imageToUpload.length; i++) {
            formData.append('listing-pictures', this.state.imageToUpload[i])
          }
          return axios.post(`/api/properties/${this.props.match.params.id}/pictures`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
        }
      })
      .then(res => {
        this.state.imageToUpload.length > 0 && console.log(res.data.msg)
        if(this.state.imageToDelete.length > 0) {
          return axios({
            method: 'delete',
            url: `/api/properties/${this.props.match.params.id}/pictures`,
            data: {
              ids: this.state.imageToDelete
            }
          })
        }
      })
      .then(res => {
        this.state.imageToDelete.length > 0 && console.log(res.data.msg)
        return axios.put(`/agents/${this.props.id}/properties/${this.props.match.params.id}`, body)
      })
      .then(res => {
        console.log(res.data.msg)
        this.setState({
          listing: res.data.updatedListing,
          successMsg: res.data.msg,
          status: res.status,
          errMsg: '',
          alertOpen: true,
          imageToDelete: [],
          imageToUpload: [],
          updateLoading: false
        })
      })
      .catch(err => {
        console.log(err.response.data.msg)
        this.setState({
          successMsg: '',
          errMsg: err.response.data.msg,
          status: err.response.status,
          alertOpen: true
        })
      })
  }

  // Alert
  handleClose() {
    this.setState({alertOpen: false})
  }
  renderAlert() {
    if(this.state.status === 200) {
      return <MuiAlert elevation={6} variant="filled" severity="success">{this.state.successMsg}</MuiAlert>
    } else {
      return <MuiAlert elevation={6} variant="filled" severity="error">{this.state.errMsg}</MuiAlert>
    }
  }


  render() {
    return (
      <div className="report-edit-container">
        {this.state.updateLoading && <LoadingBackdrop backgroundColor={"rgba(0, 0, 0, 0.5)"}/>}
        <Snackbar open={this.state.alertOpen}
                      autoHideDuration={4000}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      onClose={this.handleClose}
                      style={{top: '92px'}}>
              {this.renderAlert()}
            </Snackbar>
        {/* {this.state.updateOpen && <Backdrop onBackdropClick={this.handleBackdropClick} backgroundColor={"rgba(0, 0, 0, 0.5)"}/>}
        {this.state.updateOpen && <UpdateModal onCancelClick={this.handleBackdropClick} onUpdateConfirm={this.handleUpdate}/>} */}
        <div className="re-header">
          <div className="back-button">
            <Link to={this.props.linkTo}><i className="fas fa-angle-left"></i>Lista de propiedades</Link>
          </div>
          {/* <div className="share-button">
            <span><i className="far fa-share-square"></i>Compartir</span>
          </div> */}
        </div>
        <div className="re-listing-container">
          <div className="listing-left">
            <div className="listing-info">
              <div className="listing-photo">
                <img src={!this.state.isLoading && this.state.listing['PropertyPictures'][0].location}/>
                <div className="listing-details-over">
                  <div className="listing-details-top">
                    <span className="street-info">{this.state.listing.listing_address}</span>
                    {/* <span className="sector-province">{`${this.state.listing.sector}, ${this.state.listing.province}`}</span> */}
                  </div>
                  <div className="listing-details-bottom">
                    <span className="price-info listing-stats">
                      <NumberFormat value={this.state.listing.listing_price} displayType={'text'} thousandSeparator={true} prefix={'US$'} />
                    </span>
                    <div className="stats-wrapper">
                      <span className="listing-stats">{`${this.state.listing.bedrooms} hab`}</span>
                      <span className="listing-stats">{`${this.state.listing.bathrooms} ${this.state.listing.bathrooms > 1 ? 'baños' : 'baño'}`}</span>
                      <span className="listing-stats">{`${this.state.listing.parking_spaces} parq`}</span>
                      <span className="listing-stats">{`${this.state.listing.square_meters} Mts2`}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="performance-preview">
                <div className="performance">
                  <span>Visitas<i className="far fa-eye"></i></span>
                  <span>0</span>
                </div>
                <div className="preview">
                  <span>Estatus: {this.state.listing.listing_active ? "Active" : "Pendiente"}</span>
                </div>
              </div>
              {!this.state.isLoading && <ListingMap latLng={{lat: this.state.listing.lat, lng: this.state.listing.lng}}/>}
            </div>
          </div>
          <div className="listing-right">
            {!this.state.isLoading && <ListingEditForm
                                            listing={this.state.listing}
                                            isLoading={this.state.isLoading}
                                            listingAddress={this.state.listing.listing_address}
                                            handleAddressChange={this.handleAddressChange}
                                            handleAddressSelect={this.handleAddressSelect}
                                            propertyType={this.state.listing.property_type}
                                            handleChange={this.handleChange}
                                            listingType={this.state.listing.listing_type}
                                            bedrooms={this.state.listing.bedrooms}
                                            handleBedroomChange={this.handleBedroomChange}
                                            bathrooms={this.state.listing.bathrooms}
                                            handleBathroomChange={this.handleBathroomChange}
                                            halfBathrooms={this.state.listing.half_bathrooms}
                                            handleHalfBathroomChange={this.handleHalfBathroomChange}
                                            parking={this.state.listing.parking_spaces}
                                            handleParkingChange={this.handleParkingChange}
                                            mts={this.state.listing.square_meters}
                                            price={this.state.listing.listing_price}
                                            amenities={this.state.listing['PropertyAmenity']}
                                            handleChecks={this.handleChecks}
                                            imageFiles={this.state.listing['PropertyPictures']}
                                            handleDrop={this.handleDrop}
                                            handleRemove={this.handleRemove}
                                            onUpdateClick={this.handleUpdateClick}
                                            onUpdate={this.handleUpdate}/>}
          </div>
        </div>
      </div>
    )
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

export default withRouter(ReportEditListing);