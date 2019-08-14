//* Individual Event Template
// Core Imports
import React from 'react';
import { graphql } from 'gatsby';
import moment from 'moment';

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
import { DiscussionEmbed } from 'disqus-react';

class EventTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: [39.9528, -75.1638]
    };
  }

  render() {
    const { classes, ...rest } = this.props;
    const event = this.props.data.currentEvent;
    const address = this.props.data.currentEvent.acf.event_address;
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
    const disqusConfig = {
      shortname: process.env.GATSBY_DISQUS_NAME,
      config: { identifier: event.id, title: event.title }
    };

    return (
      <div>
        <Layout>
          <ParallaxLazy small filter fluid={fluid}>
            <div className={classes.parallaxContainer}>
              <GridContainer
                justify="center"
                className={classes.parallaxWrapper}>
                <GridItem xs={10} sm={10} md={6}>
                  <h1 className={classes.parallaxTitle}>
                    <strong dangerouslySetInnerHTML={{ __html: event.title }} />
                  </h1>
                  <h5 className={classes.parallaxSubtitle}>
                    <strong>@ {start}</strong>
                  </h5>
                </GridItem>
              </GridContainer>
            </div>
          </ParallaxLazy>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={10} style={{ marginTop: '10px' }}>
                {fluidContent && (
                  <div className="wpg-blocks">
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
                    <figcaption
                      className="wp-caption-text"
                      dangerouslySetInnerHTML={{
                        __html: event.featured_media.caption
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
              <GridItem xs={12} sm={12} md={10}>
                <section style={{ height: '300px' }}>
                  <Map position={address} info={event} />
                </section>
                <br />
                <DiscussionEmbed {...disqusConfig} />
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
        caption
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
        event_location_description
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
