import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// @material-ui/icons

// React icons
import { FaPlay } from 'react-icons/fa';

// Component Imports
import Layout from 'components/Layout/Layout.js';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import ParallaxLazy from 'components/Parallax/ParallaxLazy.jsx';
import SimplePagination from 'components/Pagination/SimplePagination.jsx';
import postsIndexPageStyle from 'assets/jss/material-kit-react/views/postsIndexPageStyle.jsx';

class EventIndexPage extends React.Component {
  render() {
    const { data, pageContext, classes, ...rest } = this.props;
    const { group, index, first, last, pageCount } = pageContext;

    const eventIndexParallax = this.props.data.eventIndexParallaxImg
      .edges[0].node.localFile.childImageSharp.fluid;
    const fallBackParallax = this.props.data.fallBackEventParallaxImg.fluid;
    const fluid = eventIndexParallax
      ? eventIndexParallax
      : fallBackParallax;

    const post = {
      title: 'Event',
      date: "See what we're all about 👍"
    };

    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRounded,
      classes.imgFluid
    );

    console.table({ group });

    return (
      <Layout>
        <ParallaxLazy small filter fluid={fluid} post={post}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={10} sm={10} md={6}>
                <h1 className={classes.title}>Events</h1>
              </GridItem>
            </GridContainer>
          </div>
        </ParallaxLazy>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <GridContainer justify="center">
            <GridItem xs={11} sm={11} md={8}>
              <br />
              <SimplePagination
                route="galleries"
                pageContext={pageContext}
                color="primary"
              />
            </GridItem>
          </GridContainer>
          <GridContainer justify="center">
            <GridItem xs={11} sm={11} md={8}>
              <Event
                images={group.map(({ node }) => ({
                  id: node.id,
                  ...node.localFile.childImageSharp.fluid,
                  //!! Figure out html entities decoding...
                  caption: `${node.title} – ${node.caption} - ${node.date}`
                }))}
                itemsPerRow={[2, 3]}
              />
            </GridItem>
          </GridContainer>

          <GridContainer justify="center">
            <GridItem xs={11} sm={11} md={8}>
              <br />
              <SimplePagination
                route="galleries"
                pageContext={pageContext}
                color="primary"
              />
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
    allWordpressWpMedia(filter: { mime_type: { regex: "/image/" } }) {
      edges {
        node {
          id
          title
          description
          mime_type
          media_type
          localFile {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
                originalImg
              }
            }
          }
        }
      }
    }
    eventIndexParallaxImg: allWordpressWpMedia(
      sort: { order: DESC, fields: date }
      filter: { mime_type: { regex: "/image/" } }
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
