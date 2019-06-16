//* Individual Event Template
// Core Imports
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons

// React icons
import { FaPlay } from 'react-icons/fa';

// Component Imports
import Layout from 'components/Layout/Layout.js';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import HeaderLinks from 'components/Header/HeaderLinks.jsx';
import ParallaxLazy from 'components/Parallax/ParallaxLazy.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';

import Image from 'components/image.js';
import postPageStyle from 'assets/jss/material-kit-react/views/postPageStyle.jsx';

class EventTemplate extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    const event = this.props.data.currentEvent;
    const start = new Date(event.acf.event_start);
    const end = new Date(event.acf.event_end);
    const location = event.acf.event_location;
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

    console.table(eventHolder);
    // Testing if featured_media fluid works
    // console.log(fluid);
    // console.table(classes.container);

    return (
      <div>
        <Layout>
          <ParallaxLazy small filter fluid={fluid} post={event} />
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div>
              <div className={classes.container}>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={10}>
                    {fluidContent && (
                      <div>
                        <Img
                          alt="Screenshot of Project"
                          fluid={
                            event.featured_media.localFile.childImageSharp.fluid
                          }
                          className={imageClasses}
                          style={{ marginTop: '20px', marginBottom: '20px' }}
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
                  <GridItem xs={6}>
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
                  <GridItem xs={6}>
                    <h3>Venue Details</h3>
                    <dl>
                      <dt> Location: </dt>
                      <dd>
                        <abbr title="2016-12-30" >
                          {location}
                        </abbr>
                      </dd>

                      {/* <dt> Address: </dt>
                      <dd>
                        <abbr title="2017-01-01"> {address} </abbr>
                      </dd> */}
                    </dl>
                  </GridItem>
                </GridContainer>
              </div>
            </div>
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
