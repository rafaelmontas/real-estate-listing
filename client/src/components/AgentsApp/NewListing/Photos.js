import React from 'react'
import Dropzone from 'react-dropzone'

class Photos extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }


  render() {
    return (
      <div className="photos-container">
        <div className="listing-photos listing-container">
          <h3>Fotos de la Propiedad</h3>
          <p>Subir imagenes en formato: jpg, png o jpeg. Propiedades con fotos de calidad llaman más la atención</p>
          <div className="upload-container">
            <Dropzone onDrop={this.props.handleDrop} accept="image/*" multiple>
              {({getRootProps, getInputProps}) => (
                <div {...getRootProps()} className="upload-component">
                  <input {...getInputProps()}/>
                  <span><i className="far fa-images"></i></span>
                  <p>Arrastrar fotos o haz click para seleccionar.</p>
                </div>
              )}
            </Dropzone>
            <div className="image-preview">
              {this.props.imageFiles.map(image => (
                <div className="thumb" key={image.name}>
                  <div className="thumb-inner">
                    <img src={image.preview}/>
                    <span className="remove-image">
                      <i className="fas fa-trash-alt" onClick={this.props.handleRemove(image.name)}></i>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Photos