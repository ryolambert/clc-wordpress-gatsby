/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// @material-ui/icons
// Component Imports
import ParallaxLazy from 'components/Parallax/ParallaxLazy';
import Calendar from 'components/Calendar/Calendar';
import Layout from 'components/Layout/Layout';
import postsIndexPageStyle from 'assets/jss/material-kit-react/views/postsIndexPageStyle';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

class EventIndexPage extends React.Component {
  render() {
    const { data, pageContext, classes, ...rest } = this.props;
    const events = this.props.data.eventsIndex.edges;

    const eventIndexParallax = this.props.data.eventIndexParallaxImg.edges[0]
      .node.localFile.childImageSharp.fluid;
    const fallBackParallax = this.props.data.fallBackEventParallaxImg.fluid;
    const fluid = eventIndexParallax || fallBackParallax;

    const banner = {
      title: 'Events',
      subTitle: 'See us at our next gathering!',
    };

    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRounded,
      classes.imgFluid
    );

    return (
      <Layout>
        <ParallaxLazy small filter banner={banner} fluid={fluid} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <GridContainer justify="center">
            <GridItem xs={11} sm={11} md={8}>
              <div className="calendarContainer">
                <Calendar events={events} />
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Layout>
    );
  }
}

export default withStyles(postsIndexPageStyle)(EventIndexPage);

export const query = graphql`
  query allEventsQuery {
    eventsIndex: allWordpressPost(
      sort: { order: DESC, fields: [acf___event_start] }
      filter: { categories: { elemMatch: { name: { eq: "Events" } } } }
    ) {
      edges {
        node {
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
      }
    }

    eventIndexParallaxImg: allWordpressWpMedia(
      sort: { order: ASC, fields: date }
      filter: { mime_type: { regex: "/image/" } }
      limit: 1
    ) {
      edges {
        node {
          title
          mime_type
          media_type
          localFile {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
    fallBackEventParallaxImg: imageSharp(
      original: { src: { regex: "/sermons-background/" } }
    ) {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;
