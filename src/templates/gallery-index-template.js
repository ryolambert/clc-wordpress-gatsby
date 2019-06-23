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
import Gallery from 'components/Gallery/Gallery.jsx';
import postsIndexPageStyle from 'assets/jss/material-kit-react/views/postsIndexPageStyle.jsx';

class GalleryIndexPage extends React.Component {
  render() {
    const { data, pageContext, classes, ...rest } = this.props;
    const { group, index, first, last, pageCount } = pageContext;

    const galleryIndexParallax = this.props.data.galleryIndexParallaxImg
      .edges[0].node.localFile.childImageSharp.fluid;
    const fallBackParallax = this.props.data.fallBackGalleryParallaxImg.fluid;
    const fluid = galleryIndexParallax
      ? galleryIndexParallax
      : fallBackParallax;

    const post = {
      title: 'Gallery',
      date: "See what we're all about 👍"
    };

    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRounded,
      classes.imgFluid
    );
    
    return (
      <Layout>
        <ParallaxLazy small filter fluid={fluid} post={post}>
          <div className={classes.parallaxContainer}>
            <GridContainer justify="center" className={classes.parallaxWrapper}>
              <GridItem xs={10} sm={10} md={6}>
                <h1 className={classes.parallaxTitle}>
                  <strong>Gallery</strong>
                </h1>
                <h5 className={classes.parallaxSubtitle}>
                  <strong>{post.date}</strong>
                </h5>
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
              <Gallery
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

export default withStyles(postsIndexPageStyle)(GalleryIndexPage);

export const query = graphql`
  query allGalleriesQuery {
    # allWordpressWpMedia(filter: { mime_type: { regex: "/image/" } }) {
    #   edges {
    #     node {
    #       id
    #       title
    #       description
    #       mime_type
    #       media_type
    #       # localFile {
    #       #   childImageSharp {
    #       #     fluid(maxWidth: 1200) {
    #       #       ...GatsbyImageSharpFluid_withWebp
    #       #       originalImg
    #       #     }
    #       #   }
    #       # }
    #     }
    #   }
    # }
    galleryIndexParallaxImg: allWordpressWpMedia(
      sort: { order: DESC, fields: date }
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
    fallBackGalleryParallaxImg: imageSharp(
      original: { src: { regex: "/sermons-background/" } }
    ) {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;
