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
          <title>Hauzzy: Innovadora plataforma inmobiliaria</title>
          <meta name="description" content="Busca propiedades en venta y en alquiler y conecta con profesionales."/>
          <meta property="og:title" content="Hauzzy: Innovadora plataforma inmobiliaria"/>
          <meta property="og:image" content="https://hauzzy-media-assets.s3.us-east-2.amazonaws.com/fb_post_tiny.png"/>
          <meta property="og:description" content="Busca propiedades en venta y en alquiler y conecta con profesionales."/>
          <meta property="og:url" content="https://www.hauzzy.com" />
          <meta property="og:type" content="website"/>

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@hauzzyrd" />
          <meta name="twitter:title" content="Hauzzy: Innovadora plataforma inmobiliaria" />
          <meta name="twitter:description" content="Busca propiedades en venta y en alquiler y conecta con profesionales." />
          <meta name="twitter:image" content="https://hauzzy-media-assets.s3.us-east-2.amazonaws.com/fb_post_tiny.png"/>
        </Helmet>
      </div>
    )
  }
}

export default Home;