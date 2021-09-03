import React from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";

class Home extends React.Component {
  componentDidMount() {
    // Redirect
    if(this.props.location.pathname === '/') {
      this.props.history.replace({pathname: '/properties'})
    }
  }
  render() {
    return (
      <div>
        <Helmet>
          <meta property="og:title" content="Hauzzy: Innovadora plataforma inmobiliaria"/>
          <meta property="og:image" content="https://hauzzy-media-assets.s3.us-east-2.amazonaws.com/fb_post_tiny.png"/>
          <meta property="og:description" content="Busca propiedades en venta y en alquiler y conecta con profesionales."/>
          <meta property="og:url" content="https://www.hauzzy.com" />
          <meta property="og:type" content="website"/>
        </Helmet>
      </div>
    )
  }
}

export default Home;