//* Individual Event Template
// Core Imports
import React from 'react';
import { graphql } from 'gatsby';
import moment from 'moment';
import axios from 'axios';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import postPageStyle from 'assets/jss/material-kit-react/views/postPageStyle.jsx';
// nodejs library that concatenates classes
import classNames from 'classnames';
// Component Imports
import Img from 'gatsby-image';
import Map from 'components/Map/Map.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Layout from 'components/Layout/Layout.js';
import ParallaxLazy from 'components/Parallax/ParallaxLazy.jsx';

class EventTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: [39.9528, -75.1638]
    };
  }
  async componentDidMount() {
    const encodedQuery = encodeURIComponent(
      this.props.data.currentEvent.acf.event_address
    );
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedQuery}.json?access_token=${process.env.GATSBY_MAPBOX_TOKEN}`
    );
    if (response.data.features.length > 0) {
      this.setState({
        coords: [
          response.data.features[0].center[0],
          response.data.features[0].center[1]
        ]
      });
    }
  }
  render() {
    const { classes, ...rest } = this.props;
    const event = this.props.data.currentEvent;
    const start = moment(event.acf.event_start).format('MM/DD/YYYY h:mm a');
    const end = moment(event.acf.event_end).format('MM/DD/YYYY h:mm a');
    const eventHolder = this.props.data.eventHolderImg.fluid;
    const fluid = event.featured_media
      ? event.featured_media.localFile.childImageSharp.fluid
      : eventHolder;
    const fluidContent = event.featured_media
      ? event.featured_media.localFile.childImageSharp.fluid
      : null;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRounded,
      classes.imgFluid
    );
    console.log(event.acf.event_location);

    console.log(this.state.coords);

    return (
      <div>
        <Layout>
          <ParallaxLazy small filter fluid={fluid} post={event} />
          <div className={classNames(classes.main, classes.mainRaised)}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={10} style={{ marginTop: '10px' }}>
                {fluidContent && (
                  <div>
                    <Img
                      alt="Screenshot of Project"
                      fluid={
                        event.featured_media.localFile.childImageSharp.fluid
                      }
                      className={imageClasses}
                      style={{
                        marginTop: '20px',
                        marginBottom: '20px'
                      }}
                    />
                  </div>
                )}
                <div
                  className={classes.content}
                  dangerouslySetInnerHTML={{
                    __html: event.content
                  }}
                />
                <p dangerouslySetInnerHTML={{ __html: event.date }} />
                <p dangerouslySetInnerHTML={{ __html: event.slug }} />
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={5} md={5}>
                <h3>Event Details</h3>
                <dl>
                  <dt> Start: </dt>
                  <dd>
                    <abbr title={start}>{start.toString()}</abbr>
                  </dd>

                  <dt> End: </dt>
                  <dd>
                    <abbr title={end}> {end.toString()} </abbr>
                  </dd>

                  <dt>Category:</dt>
                  <dd>{event.categories.name}</dd>
                </dl>
              </GridItem>
              <GridItem xs={12} sm={5} md={5}>
                <h3>Venue Details</h3>
                <dl>
                  <dt> Address: </dt>
                  <dd>
                    <abbr title="2017-01-01"> {event.acf.event_address} </abbr>
                  </dd>
                  <dt> Location: </dt>
                  <dd>
                    <abbr title="2017-01-01"> {event.acf.event_location} </abbr>
                  </dd>
                </dl>
              </GridItem>
              <GridItem xs={12}></GridItem>
            </GridContainer>
            <Map
              className="leaflet-container"
              position={this.state.coords}
              info={event}
            />
          </div>
        </Layout>
      </div>
    );
  }
}

export const query = graphql`
  query currentEventsQuery($id: String!) {
    currentEvent: wordpressPost(id: { eq: $id }) {
      id
      slug
      title
      tags {
        name
      }
      featured_media {
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      acf {
        event_address
        event_start
        event_end
        event_location
      }
      categories {
        name
      }
      content
      excerpt
    }
    eventHolderImg: imageSharp(original: { src: { regex: "/skyline/" } }) {
      fluid(maxWidth: 1200) {
        src
        ...GatsbyImageSharpFluid
      }
    }
  }
`;

export default withStyles(postPageStyle)(EventTemplate);
