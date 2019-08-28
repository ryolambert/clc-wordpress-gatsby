import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import MapGL, {
  Marker,
  StaticMap,
  NavigationControl,
  FullscreenControl,
} from 'react-map-gl';
import withStyles from '@material-ui/core/styles/withStyles';
import mapStyle from 'assets/jss/material-kit-react/components/mapStyle.jsx';
import InfoPanel from './InfoPanel';
import Pin from './Pin';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 33.777603,
        longitude: -118.1856821,
        zoom: 14,
        bearing: 0,
        pitch: 45,
      },
      coords: [39.9528, -75.1638],
      mapLat: 39.9528,
      mapLng: -75.1638,
      popupInfo: null,
    };
  }

  async componentDidMount() {
    const address = this.props.position;
    const encodedQuery = encodeURIComponent(address);
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedQuery}.json?access_token=${process.env.GATSBY_MAPBOX_TOKEN}`,
    );
    console.log(this.props);
    // console.log(response);
    if (response.data.features.length > 0) {
      this.setState({
        viewport: {
          latitude: response.data.features[0].center[1],
          longitude: response.data.features[0].center[0],
          zoom: 14,
          bearing: 0,
          pitch: 35,
        },
        coords: response.data.features[0].center,
        mapLat: response.data.features[0].center[1],
        mapLng: response.data.features[0].center[0],
      });
    }
  }

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _renderMarker = info => (
    <Marker longitude={this.state.mapLng} latitude={this.state.mapLat}>
      <Pin size={25} />
    </Marker>
  );

  render() {
    const { viewport } = this.state;
    const { classes, position, info } = this.props;
    return (
      <div className={classes.mapContainer}>
        <StaticMap
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/citylightschurch/cjx13gc3r2uku1cphf8o9natk"
          onViewportChange={this._updateViewport}
          mapboxApiAccessToken={process.env.GATSBY_MAPBOX_TOKEN}
        >
          {this._renderMarker(info)}
          <div className="fullscreen" className={classes.fullscreenControl}>
            <FullscreenControl />
          </div>
          <div className="nav" className={classes.navControl}>
            <NavigationControl />
          </div>
          <div className={classes.infoPanel}>
            <InfoPanel info={info} position={position} />
          </div>
        </StaticMap>
      </div>
    );
  }
}

Map.propTypes = {
  position: PropTypes.string.isRequired,
  info: PropTypes.object.isRequired,
};

export default withStyles(mapStyle)(Map);

export function renderToDom(container) {
  render(<Map />, container);
}
