import React from 'react';
import './MapPropertyCard.css';


class MapPropertyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: {}
    }
  }

  componentDidMount() {
    const property = this.props.properties.find(property => property.id === this.props.identifier);
    this.setState({property}, () => console.log(this.state.property, this.props.identifier))
  }
  componentDidUpdate(prevProps) {
    if(prevProps.identifier !== this.props.identifier) {
      const property = this.props.properties.find(property => property.id === this.props.identifier);
      this.setState({property}, () => console.log(this.state.property, this.props.identifier))
    }
  }

  render() {
    return (
      <div className="map-property-card">
        <div className="map-property-card-content">
          <div className="map-property-card-img">
            hello
          </div>
          <div className="map-property-card-info">
            {`hello info ${this.state.property.id}`}
          </div>
        </div>
      </div>
    )
  }
}

export default MapPropertyCard;