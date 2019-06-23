import React, { Component } from 'react';
import { render } from 'react-dom';
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
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

const mapStyle = {
  borderRadius: '10px',
  paddingBottom: '10px'
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
        pitch: 35
      },
      popupInfo: null
    };
  }

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _renderMarker = info => {
    const { position } = this.props;
    return (
      <Marker longitude={position[0]} latitude={position[1]}>
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
          longitude={position[0]}
          latitude={position[1]}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}>
          <Info info={info} />
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;
    const { position, info } = this.props;
    return (
      <section>
        <MapGL
          {...viewport}
          latitude={position[1]}
          longitude={position[0]}
          width="100%"
          height="30vh"
          mapStyle="mapbox://styles/citylightschurch/cjx13gc3r2uku1cphf8o9natk"
          onViewportChange={this._updateViewport}
          mapboxApiAccessToken={process.env.GATSBY_MAPBOX_TOKEN}>
          {/* <Marker longitude={position[0]} latitude={position[1]}>
            <Pin size={20} onClick={() => this.setState({ popupInfo: info })} />
          </Marker> */}
          {this._renderMarker(info)}
          {this._renderPopup()}

          <div className="fullscreen" style={fullscreenControlStyle}>
            <FullscreenControl />
          </div>
          <div className="nav" style={navStyle}>
            <NavigationControl />
          </div>
        </MapGL>
      </section>
    );
  }
}

export function renderToDom(container) {
  render(<Map />, container);
}
