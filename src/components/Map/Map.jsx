import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import MapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl
} from 'react-map-gl';

import Info from './Info';
import Pin from './Pin';

const fullscreenControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px',
  zIndex: '150'
};

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px',
  zIndex: '150'
};

const panelStyle = {
  position: 'absolute',
  minWidth: '35%',
  minHeight: '50%',
  maxHeight: '95%',
  background: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
  top: 0,
  right: 0,
  padding: '10px',
  margin: '10px',
  borderRadius: '4px',
  zIndex: '150'
};

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 33.777603,
        longitude: -118.1856821,
        zoom: 14,
        bearing: 0,
        pitch: 45
      },
      coords: [39.9528, -75.1638],
      mapLat: 39.9528,
      mapLng: -75.1638,
      popupInfo: null
    };
  }

  async componentDidMount() {
    const address = this.props.position;
    const encodedQuery = encodeURIComponent(address);
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedQuery}.json?access_token=${process.env.GATSBY_MAPBOX_TOKEN}`
    );
    if (response.data.features.length > 0) {
      this.setState({
        viewport: {
          latitude: response.data.features[0].center[1],
          longitude: response.data.features[0].center[0],
          zoom: 14,
          bearing: 0,
          pitch: 45
        },
        coords: response.data.features[0].center,
        mapLat: response.data.features[0].center[1],
        mapLng: response.data.features[0].center[0]
      });
    }
  }

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _renderMarker = info => {
    return (
      <Marker longitude={this.state.mapLng} latitude={this.state.mapLat}>
        <Pin size={25} onClick={() => this.setState({ popupInfo: info })} />
      </Marker>
    );
  };

  _renderPopup() {
    const { popupInfo } = this.state;
    if (popupInfo === null) {
      return null;
    }
    const { position } = this.props;
    const info = { position, popupInfo };

    return (
      popupInfo && (
        <Popup
          tipSize={3}
          anchor="top"
          longitude={this.state.mapLng}
          latitude={this.state.mapLat}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}>
          <Info infoPanel={info} position={position} />
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;
    const { position, info } = this.props;
    const infoPanel = { position, info };
    return (
      <div style={{ height: '100%', minHeight: '20vh', maxHeight: '1000px' }}>
        <MapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/citylightschurch/cjx13gc3r2uku1cphf8o9natk"
          onViewportChange={this._updateViewport}
          mapboxApiAccessToken={process.env.GATSBY_MAPBOX_TOKEN}>
          {/* <Marker longitude={position[0]} latitude={position[1]}>
            <Pin size={20} onClick={() => this.setState({ popupInfo: info })} />
          </Marker> */}
          {this._renderMarker(info)}
          {/* {this._renderPopup()} */}

          <div className="fullscreen" style={fullscreenControlStyle}>
            <FullscreenControl />
          </div>
          <div className="nav" style={navStyle}>
            <NavigationControl />
          </div>
          <div style={panelStyle}>
            <Info infoPanel={infoPanel} />
          </div>
        </MapGL>
      </div>
    );
  }
}

Map.propTypes = {
  position: PropTypes.string.isRequired,
  infoPanel: PropTypes.object.isRequired
};

export function renderToDom(container) {
  render(<Map />, container);
}
