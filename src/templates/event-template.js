/* eslint-disable no-unused-vars */
/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-props-no-spreading */
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
import Button from 'components/CustomButtons/Button.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import { DiscussionEmbed } from 'disqus-react';
import ParallaxLazy from 'components/Parallax/ParallaxLazy.jsx';
import Footer from 'components/Footer/Footer';

class EventTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: [39.9528, -75.1638],
    };
  }

  render() {
    const { classes, ...rest } = this.props;
    const event = this.props.data.currentEvent;
    const start = moment(event.acf.event_start).format('MM/DD/YYYY h:mm a');
    const address = this.props.data.currentEvent.acf.event_address;
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
      config: { identifier: event.id, title: event.title },
    };
    const banner = {
      title: event.title,
      subTitle: '',
      styledSubTitle: `${start}`,
    };

    // event.tags.map(({ name }) => console.log(name));

    return (
      <div>
        <ParallaxLazy small color banner={banner} fluid={fluid}>
          <GridItem xs={6} sm={6} md={6}>
            {event.tags &&
              event.tags.map(({ name }) => (
                <Button color="warning" size="sm" round>
                  {`#${name}`}
                </Button>
              ))}
            {/* {!event.tags && (
                <Button color="info" size="sm">
                  Empty
                </Button>
              )} */}
          </GridItem>
        </ParallaxLazy>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={5} style={{ marginTop: '10px' }}>
              <p>
                <strong>
                  <u>Social Links Place Holder</u>
                </strong>
              </p>
            </GridItem>
            <GridItem xs={12} sm={12} md={10}>
              {fluidContent && (
                <div>
                  <Img
                    alt="Screenshot of Project"
                    fluid={event.featured_media.localFile.childImageSharp.fluid}
                    className={imageClasses}
                    style={{
                      marginTop: '20px',
                      marginBottom: '20px',
                    }}
                  />
                  <figcaption
                    className="wp-caption-text"
                    dangerouslySetInnerHTML={{
                      __html: event.featured_media.caption,
                    }}
                  />
                </div>
              )}
              <div
                className={classes.content}
                dangerouslySetInnerHTML={{
                  __html: event.content,
                }}
              />
              <p dangerouslySetInnerHTML={{ __html: event.date }} />
              <p dangerouslySetInnerHTML={{ __html: event.slug }} />
            </GridItem>
          </GridContainer>
          <GridContainer justify="center">
            <GridItem xs={12} sm={5} md={5}>
              <h3>
                <strong>Event Details</strong>
              </h3>
              <dl>
                <dt>
                  <em>
                    <b>Start:</b>
                  </em>
                </dt>
                <dd>
                  <p title={start}>
                    <mark
                      dangerouslySetInnerHTML={{ __html: start.toString() }}
                    />
                  </p>
                </dd>

                <dt>
                  <em>
                    <b>End:</b>
                  </em>
                </dt>
                <dd>
                  <p title={end}>
                    <mark>{end.toString()}</mark>
                  </p>
                </dd>
              </dl>
            </GridItem>
            <GridItem xs={12} sm={5} md={5}>
              <h3>
                <strong>Venue Details</strong>
              </h3>
              <dl>
                <dt>
                  <em>
                    <b>Address:</b>
                  </em>
                </dt>
                <dd>
                  <p title={event.acf.event_address}>
                    <mark>{event.acf.event_address}</mark>
                  </p>
                </dd>
                <dt>
                  <em>
                    <b>Location:</b>
                  </em>
                </dt>
                <dd>
                  <p title={event.acf.event_location}>
                    <mark>{event.acf.event_location}</mark>
                  </p>
                </dd>
              </dl>
            </GridItem>
            <GridItem xs={12} sm={12} md={10}>
              <section style={{ height: '30vh' }}>
                <Map position={address} info={event} />
              </section>
              <br />
              <DiscussionEmbed {...disqusConfig} />
            </GridItem>
          </GridContainer>
        </div>
        <Footer />
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
