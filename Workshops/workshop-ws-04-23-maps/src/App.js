import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker, Polygon } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};
const triangleCoords = [
  {lat: 43.7046, lng: -72.2943}, 
  {lat: 43.7034, lng: -72.2886}, 
  {lat: 43.705962,lng: -72.282779},
  {lat: 43.7091, lng: -72.2839}, 
  {lat: 43.7046, lng: -72.2943},
];

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showingInfoWindow: false, //Hides or the shows the infoWindow
        activeMarker: {}, //Shows the active marker upon click
        selectedPlace: {} //Shows the infoWindow to the selected place upon a marker
    }; 
  } 
    onMarkerClick = (props, marker, e) =>
      this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    onClose = props => {
      if (this.state.showingInfoWindow) {
          this.setState({
          showingInfoWindow: false,
          activeMarker: null
          });
      }
    };

  render() {
    return (
      <div>
        <h1>Hello Google Maps</h1>
        <Map 
          google={this.props.google} 
          initialCenter={{
          lat: 43.7044,
          lng: -72.2887
          }}
          zoom={16}
          >
            <Marker onClick={this.onMarkerClick} 
                    name={'This is a marker we just made yay!'} 
                    position={{lat: 43.7089586, lng: -72.2842342}}/>
            <InfoWindow marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
            >
              <div>
                <h2>{this.state.selectedPlace.name}</h2>
              </div>
            </InfoWindow>
            <Marker onClick={this.onMarkerClick} 
                    name={'This is another marker we just made yay!'} 
                    position={{lat: 43.705814, lng: -72.287819}}/>
            <InfoWindow marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
            >
              <div>
                <h2>{this.state.selectedPlace.name}</h2>
              </div>
            </InfoWindow>
            <Polygon
              paths={triangleCoords}
              strokeColor="#a442f4"
              strokeOpacity={0.8}
              strokeWeight={2}
              fillColor="#009373"
              fillOpacity={0.35} 
            />
          </Map>
      </div>
    ) 
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAdjs1_kZ4Sw4NMYT8LwgwBjKU-zpcKgBk'
})(MapContainer);