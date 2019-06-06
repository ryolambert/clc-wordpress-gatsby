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
import Lightbox from "react-images";
import ParallaxLazy from 'components/Parallax/ParallaxLazy.jsx';
import SimplePagination from 'components/Pagination/SimplePagination.jsx';
import Gallery from 'components/Gallery/Gallery.jsx';
import postsIndexPageStyle from 'assets/jss/material-kit-react/views/postsIndexPageStyle.jsx';

class GalleryIndexPage extends React.Component {
  // constructor() {
  //   super();
  //   this.state = { currentImage: 0 };
  //   this.closeLightbox = this.closeLightbox.bind(this);
  //   this.openLightbox = this.openLightbox.bind(this);
  //   this.gotoNext = this.gotoNext.bind(this);
  //   this.gotoPrevious = this.gotoPrevious.bind(this);
  // }
  // openLightbox(event, obj) {
  //   this.setState({
  //     currentImage: obj.index,
  //     lightboxIsOpen: true
  //   });
  // }
  // closeLightbox() {
  //   this.setState({
  //     currentImage: 0,
  //     lightboxIsOpen: false
  //   });
  // }
  // gotoPrevious() {
  //   this.setState({
  //     currentImage: this.state.currentImage - 1
  //   });
  // }
  // gotoNext() {
  //   this.setState({
  //     currentImage: this.state.currentImage + 1
  //   });
  // }
  render() {
    const { data, pageContext, classes, ...rest } = this.props;
    const { group, index, first, last, pageCount } = pageContext;

    const galleryIndexParallax = this.props.data.galleryIndexParallaxImg
      .edges[0].node.localFile.childImageSharp.fluid;
    const fallBackParallax = this.props.data.fallBackGalleryParallaxImg.fluid;
    const fluid = galleryIndexParallax
      ? galleryIndexParallax
      : fallBackParallax;

    console.table(galleryIndexParallax);
    const post = {
      title: 'Galleries',
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
                <h1
                  style={{
                    display: 'inline-block',
                    position: 'relative',
                    marginTop: '30px',
                    minHeight: '32px',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    zIndex: '12',
                    fontFamily: 'Roboto Slab',
                    fontWeight: '700'
                  }}
                  className={classes.title}>
                  Galleries
                </h1>
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
                  caption: `${node.title} – ${node.description}`
                }))}
                
                itemsPerRow={[2, 3]}
              />
              {/* <Lightbox
                images={group.map(({ node }) => ({
                  id: node.id,
                  ...node.localFile.childImageSharp.fluid,
                  caption: `${node.title} – ${node.description}`
                }))}
                onClose={this.closeLightbox}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                currentImage={this.state.currentImage}
                isOpen={this.state.lightboxIsOpen}
              /> */}
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
              fluid(
                maxWidth: 1200
                traceSVG: {
                  color: "#fd9551"
                  optTolerance: 0.4
                  turdSize: 100
                  turnPolicy: TURNPOLICY_MAJORITY
                }
              ) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
                originalImg
              }
            }
          }
        }
      }
    }
    galleryIndexParallaxImg: allWordpressWpMedia(
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
              fluid(
                maxWidth: 1200
                traceSVG: {
                  color: "#fd9551"
                  optTolerance: 0.4
                  turdSize: 100
                  turnPolicy: TURNPOLICY_MAJORITY
                }
              ) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
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
