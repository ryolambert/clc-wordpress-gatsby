//* Individual Event Template
// Core Imports
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import postPageStyle from 'assets/jss/material-kit-react/views/postPageStyle.jsx';
// nodejs library that concatenates classes
import classNames from 'classnames';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
// Component Imports
import Layout from 'components/Layout/Layout.js';
import ParallaxLazy from 'components/Parallax/ParallaxLazy.jsx';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import moment from 'moment';
import React from 'react';
import geocode from '../utils/geocode';

class EventTemplate extends React.Component {
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
      classes.imgFluid,
    );

    // const geocoding = geocode(event.acf.event_location).then(
    //   function(result) {
    //     return result;
    //   },
    //   function(err) {
    //     return err;
    //   }
    // );

    const geocoding = geocode(event.acf.event_location);
    // const locationData = geoData;

    console.log(geocoding);
    return (
      <div>
        <Layout>
          <ParallaxLazy small filter fluid={fluid} post={event} />
          <div className={classNames(classes.main, classes.mainRaised)}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={10} style={{marginTop: '10px'}}>
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
            <GridContainer justify="center" >
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
                  <dt> Location: </dt>
                  <dd>
                    <abbr title="2016-12-30">{event.acf.event_location}</abbr>
                  </dd>

                  {/* <dt> Address: </dt>
                      <dd>
                        <abbr title="2017-01-01"> {address} </abbr>
                      </dd> */}
                </dl>
              </GridItem>
            </GridContainer>
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
        event_start
        event_end
        event_location
      }
      categories {
        name
      }
      content
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
