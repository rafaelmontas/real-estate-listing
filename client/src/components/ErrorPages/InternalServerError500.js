import React from 'react';
import gtag, { gaInit } from '../../utils/GaUtils';
import ReactPixel from 'react-facebook-pixel';
import publicIp from "public-ip";

const divStyle = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}


class InternalServerError500 extends React.Component {
  componentDidMount() {
    // Track page views GA
    if(process.env.NODE_ENV === 'production') {
      gaInit('G-JQMJWEW91Q', { send_page_view: false })  
    } else {
      gaInit('G-WFH68VZSHT', { send_page_view: false })
    }
    gtag('event', 'page_view', {
      page_title: 'Server Error 500'
    })
    // Init Facebook Pixel
    if(process.env.NODE_ENV === 'production') {
      ReactPixel.init('689804211678157')
    } else {
      ReactPixel.init('587601035409958')
    }
    ReactPixel.pageView(); // For tracking page view
  }

  render() {
    return (
      <div style={divStyle}>
        <h1 style={{color: 'grey', fontSize: '70px'}}>500 
          <span style={{color: '#105dd2ba'}}> Server Error</span>
        </h1>
      </div>
    )
  }
}

export default InternalServerError500;