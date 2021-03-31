import React from 'react'
import gtag, { gaInit } from '../utils/GaUtils';
import ReactPixel from 'react-facebook-pixel';
import publicIp from "public-ip";
import './TermsAndConditions.css'

class TermsAndConditions extends React.Component {
  async componentDidMount() {
    // Track page views GA
    if(process.env.NODE_ENV === 'production') {
      gaInit('G-JQMJWEW91Q', { send_page_view: false })  
    } else {
      gaInit('G-WFH68VZSHT', { send_page_view: false })
    }
    gtag('event', 'page_view', {
      page_title: 'Privacy Policy'
    })
    try {
      // Init Facebook Pixel
      if(await publicIp.v4() === '186.150.167.185' && process.env.NODE_ENV === 'production') {
        console.log('Internal IP')
        return null
      } else if(await publicIp.v4() !== '186.150.167.185' && process.env.NODE_ENV === 'production') {
        ReactPixel.init('689804211678157')
      } else {
        ReactPixel.init('587601035409958')
      }
      ReactPixel.pageView(); // For tracking page view
    } catch(err) {
      console.log(err)
      this.props.history.replace({pathname: '/error/500'})
    }
  }

  render() {
    return (
      <div className="terms-container">
        <div className="terms-info">
          <h1>Política de Pivacidad</h1>
          <div className="terms-body">
            <h3>Introducción</h3>
            <p>Esta política de privacidad (la "Política de privacidad") está diseñada para informar a los usuarios del sitio web de Hauzzy, S.R.L. y cualquier teléfono inteligente o aplicación móvil relacionada (colectivamente, el "Sitio web"), sobre cómo Hauzzy, S.R.L. (" Hauzzy " o " nosotros ") recopila y utiliza la información personal enviada a Hauzzy a través del sitio web. Hauzzy tomará las medidas razonables para proteger la privacidad del usuario de acuerdo con las pautas establecidas en esta Política de privacidad. En esta Política de privacidad, "usuario" o "usted" significa cualquier persona que vea el sitio web o envíe información personal a Hauzzy en relación con el uso del sitio web. El término "Arrendador" significa cualquier usuario que sea arrendador, representante del arrendador, corredor, administrador de propiedad o subarrendador que enumere una propiedad en alquiler en el sitio web. El término "Inquilino" significa personas que buscan, solicitan, contactan o revisan propiedades en alquiler en el sitio web.</p>
            <p>Al utilizar el sitio web, está indicando su consentimiento a esta Política de privacidad. SI NO ESTÁ DE ACUERDO CON ESTA POLÍTICA DE PRIVACIDAD, NO DEBE UTILIZAR EL SITIO WEB.</p>
            <h3>1. Información recopilada por Hauzzy</h3>
            <p>Cuando utiliza nuestros servicios, recopilamos una variedad de información sobre usted y sus dispositivos. Parte de esta información lo identifica directamente (como una dirección de correo electrónico), mientras que parte de ella está asociada con usted a través de su cuenta, perfil o dispositivo (como las propiedades que elige guardar o los datos de su ubicación).</p>
            <p>El tipo de datos que recopilamos sobre usted depende de cómo utilice Hauzzy. Incluso si no tiene una cuenta con nosotros, es posible que aún recopilemos algunos datos sobre usted, como su dirección de correo electrónico y número de teléfono si elige comunicarse con un agente de bienes raíces a través de nuestra plataforma, o su dirección IP y otra información del dispositivo cuando navega por nuestros sitios o utiliza nuestras aplicaciones.</p>
            <h3>2. Información que recopilamos cuando utiliza nuestros servicios</h3>
            <p>Junto con la información que nos proporciona directamente, recopilamos una variedad de información automáticamente a medida que utiliza los servicios de Hauzzy.</p>
            <h4>Información de la actividad</h4>
            <p>Recopilamos información sobre cómo usa Hauzzy. Esto incluye cosas como el historial de búsqueda, las propiedades que ve, en qué ha hecho clic y otros usos de nuestras funciones, y la cantidad de tiempo que pasa mirando diferentes partes de nuestros sitios web.</p>
            <h4>Información del dispositivo</h4>
            <p>Al igual que otros sitios web y aplicaciones, recopilamos datos sobre los navegadores y dispositivos que utiliza para acceder a Hauzzy. Los datos que recopilamos incluyen el modelo y la configuración del navegador o dispositivo, el sistema operativo, los identificadores únicos y la versión de la aplicación que está utilizando. También recopilamos datos sobre cómo interactúan sus navegadores y dispositivos con nuestros servicios, incluida la dirección IP, los informes de fallos, la actividad del sistema y la fecha, la hora y la URL del sitio que visitó antes de Hauzzy.</p>
            <h4>Cookies, etiquetas de píxeles y otras tecnologías</h4>
            <p>Nosotros y nuestros socios utilizamos varias herramientas para recopilar datos cuando visita nuestros sitios y aplicaciones, incluidas cookies, etiquetas de píxeles y otras tecnologías similares. Las cookies son fragmentos de datos electrónicos que se pueden transferir a su computadora u otro dispositivo para identificar su navegador.</p>
            <p>Cuando usa Hauzzy, nosotros y nuestros socios podemos usar cookies y otras herramientas para recopilar información sobre cómo ve y usa nuestros servicios y contenido, y para conectar su actividad con otros datos que almacenamos sobre usted.</p>
            <h3>3. Seguridad de la información</h3>
            <p>Usamos precauciones de seguridad razonables para proteger la seguridad e integridad de su Información personal, tanto durante la transmisión como una vez que la recibimos, de acuerdo con esta Política de privacidad y la ley aplicable. Encriptamos las transmisiones de información personal a través del sitio web utilizando tecnología de capa de conexión segura (SSL). Sin embargo, ningún método de almacenamiento electrónico o transmisión por Internet es completamente seguro y no podemos garantizar que no se produzcan violaciones de seguridad. Sin limitación de lo anterior, no somos responsables de las acciones de piratas informáticos y otros terceros no autorizados que violen nuestros procedimientos de seguridad razonables.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default TermsAndConditions