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
      page_title: 'Terms & Conditions'
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
          <h1>Términos &amp; Condiciones</h1>
          <div className="terms-body">
            <h3>Introducción</h3>
            <p>Bienvenido y gracias por su interés en Hauzzy (Hauzzy, S.R.L. y sus marcas afiliadas, colectivamente, "Hauzzy", "nuestro" o "nosotros"). Al hacer clic en un botón de registro o al utilizar nuestros sitios web, redes, aplicaciones móviles u otros servicios proporcionados por Hauzzy (colectivamente, los "Servicios"), o acceder a cualquier contenido proporcionado por nosotros a través de los Servicios, acepta estar sujeto a los siguientes términos de uso, los cuales se actualizan periódicamente (los "Términos de uso").</p>
            <h3>1. Elegibilidad, Cuentas y Registro</h3>
            <p>Debe tener al menos 18 años para utilizar los Servicios. Al aceptar estos Términos de uso, usted declara y garantiza que: (a) tiene al menos 18 años de edad; (b) no ha sido previamente suspendido o eliminado de los Servicios; y (c) su registro y uso de los Servicios cumple con todas las leyes y regulaciones aplicables. Para acceder a algunas funciones de los Servicios, es posible que se le solicite que se registre para obtener una cuenta y que acepte los Términos de un Producto. Cuando se registre para obtener una cuenta, se le pedirá que nos proporcione cierta información sobre usted, como dirección de correo electrónico, número de teléfono u otra información de contacto. Usted acepta que la información que proporciona es precisa y que la mantendrá precisa y actualizada en todo momento. Cuando se registre, se le pedirá que proporcione una contraseña. Usted es el único responsable de mantener la confidencialidad de su cuenta y contraseña, y es responsable de todas las acciones realizadas a través de su cuenta. No puede compartir su (s) cuenta (s) de usuario con otros.</p>
            <h3>2. Condiciones de uso del sitio web y los servicios</h3>
            <p>El sitio web y los servicios brindan solo un lugar neutral en línea que los propietarios, representantes de propietarios, corredores, administradores de propiedades, subarrendadores y posibles inquilinos pueden usar para encontrar e intercambiar información en relación con transacciones potenciales que involucren bienes raíces. patrimonio y, si así lo desean, concertar transacciones entre ellos. Hauzzy no asesora a las partes en transacciones de bienes raíces, no evalúa las calificaciones de los inquilinos potenciales, no muestra propiedades ni negocia contratos de alquiler o venta a través del sitio web o los servicios. Se aconseja a los usuarios que busquen la ayuda de un profesional de bienes raíces con licencia y/o un abogado de bienes raíces para ayudar en la negociación y finalización de cualquier transacción de bienes raíces.</p>
            <h3>3. Derechos de propiedad; Restricciones de uso</h3>
            <p>Todo el software utilizado en el sitio web es de nuestra propiedad o de terceros, y salvo que sea necesario para ejercer la concesión de licencia anterior, cualquier uso, redistribución, venta, descompilación, ingeniería inversa, desmontaje o traducción de dicho software está prohibida.</p>
            <p>El nombre de Hauzzy, el logotipo de Hauzzy y todos los nombres, logotipos, nombres de productos y servicios, diseños y eslóganes relacionados son marcas comerciales registradas o no registradas de Hauzzy o sus afiliados o licenciatarios, y no se pueden utilizar en relación con ningún servicio o producto que no sea los proporcionados por Hauzzy, de cualquier manera que pueda causar confusión entre los clientes, o de cualquier manera que desacredite a Hauzzy.</p>
            <p>El sitio web y los servicios son propiedad de Hauzzy. Salvo como se indica expresamente a continuación en el caso de los Datos del usuario, todos los datos, información, texto, imágenes, videos, diseños, sonido, música, marcas, logotipos, compilaciones (es decir, la recopilación, disposición y montaje de información) y otro contenido en o disponible a través del sitio web, y cualquiera de los anteriores enviados a usted por correo electrónico u otros medios (colectivamente, el "Contenido del sitio") son propiedad de Hauzzy, sus licenciantes u otros proveedores de tales material y están protegidos por derechos de autor, marcas registradas, patentes, secretos comerciales y otras leyes de propiedad intelectual o derechos de propiedad.</p>
            <p>La modificación, reproducción, redistribución, reedición, carga, publicación, transmisión, distribución o explotación de cualquier forma de los Servicios, el Contenido del sitio o cualquier parte del Contenido del sitio, está estrictamente prohibida sin el permiso previo por escrito de Hauzzy. Si viola cualquiera de las condiciones anteriores, su derecho a utilizar los Servicios y el Contenido del sitio cesará de inmediato y deberá, a nuestra discreción, devolver o destruir cualquier copia de los materiales que haya realizado. No se le transfiere ningún derecho, título o interés sobre los Servicios o el Contenido del sitio, y Hauzzy se reserva todos los derechos no otorgados expresamente. Usted acepta, declara y garantiza que su uso de los Servicios, el Sitio web y el Contenido del sitio, o cualquier parte de los mismos, será coherente con la licencia, los convenios y las restricciones anteriores y no infringirá ni violará los derechos de ninguna otra parte. Además, acepta que cumplirá con todas las leyes, regulaciones y ordenanzas aplicables relacionadas con los Servicios, el Sitio web, el Contenido del sitio o el uso que haga de ellos, y será el único responsable de sus propias violaciones individuales de cualquiera de ellos.</p>
            <h3>4. Consentimiento para las comunicaciones</h3>
            <p>Cuando le proporciona a Hauzzy su dirección de correo electrónico, le está dando a Hauzzy su consentimiento expreso para enviarle correos electrónicos, incluidos correos electrónicos de marketing. Puede optar por no recibir correos electrónicos de marketing en cualquier momento haciendo clic en el enlace de exclusión voluntaria en la parte inferior de un correo electrónico, o comunicándose con nosotros en soporte@hauzzy.com y especificando que le gustaría optar por no recibir correos electrónicos de marketing.</p>
            <h3>5. Recopilación de datos</h3>
            <p>Usted es el único responsable de todos los datos que cargue o transmita con nosotros a través del sitio web o los Servicios (en conjunto, los "Datos del usuario"). Al proporcionarnos datos de usuario, usted:</p>
            <p>- Acepta proporcionar solo información verdadera, precisa, actual y completa sobre usted y no tergiversar su identidad o la información de su cuenta de Hauzzy.</p>
            <p>- Nos autoriza a realizar copias que consideremos necesarias para poder brindar los Servicios.</p>
            <p>- Reconoce y acepta que todos los Datos de usuario enviados a través del sitio web se utilizarán de acuerdo con la Política de privacidad.</p>
            <p>- Declara y garantiza que posee todos los derechos de propiedad sobre sus Datos de usuario o, con respecto a los Datos de usuario que no posee, tiene la autoridad y los derechos plenos para transmitir los Datos de usuario y otorgar las licencias otorgadas a continuación, y que el ejercicio por Hauzzy de los derechos de licencia otorgados por usted no infringirá ningún derecho de propiedad intelectual de terceros, ni violará ningún derecho de privacidad o publicidad, ni será difamatorio, calumnioso u obsceno, ni violará ningún otro derecho, privilegio o interés de ningún tercero.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default TermsAndConditions