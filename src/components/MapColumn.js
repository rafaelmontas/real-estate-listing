import React from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


const mapStyles = {
  width: '100%',
  height: 'calc(100% - 66px)'
};


class MapColumn extends React.Component {
	render() {
		return (
			<div id="map-column-right" className="search-results-columns">
				<div className="save-search"><i className="fas fa-bell"></i>Guardar Busqueda</div>
				<div id="map-div">
					<Map
						google={this.props.google}
						zoom={14}
						mapTypeControl= {false}
						streetViewControl= {false}
						style={mapStyles}
						initialCenter={{
						lat: 18.472233,
						lng: -69.922225
						}}>
							<Marker position={{ lat: 18.472233, lng: -69.922225}} />
					</Map>
				</div>
			</div>
		)
	}
}


export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapColumn);
