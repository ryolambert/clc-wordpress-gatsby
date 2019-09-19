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
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import ParallaxLazy from 'components/Parallax/ParallaxLazy.jsx';
import SimplePagination from 'components/Pagination/SimplePagination.jsx';
import Gallery from 'components/Gallery/Gallery.jsx';
import postsIndexPageStyle from 'assets/jss/material-kit-react/views/postsIndexPageStyle.jsx';

class GalleryIndexPage extends React.Component {
  render() {
    const { data, pageContext, classes } = this.props;
    const { group } = pageContext;

    const galleryIndexParallax =
      data.galleryIndexParallaxImg.edges[0].node.localFile.childImageSharp
        .fluid;
    const fallBackParallax = data.fallBackGalleryParallaxImg.fluid;
    const fluid = galleryIndexParallax || fallBackParallax;

    const banner = {
      title: 'Gallery',
      subTitle: "See what we're all about 👍",
    };

    const galleryImageInfo = group.map(({ node }) => ({
      id: node.id,
      title: node.title,
      caption: `${node.title} – ${node.caption} - ${node.date}`,
    }));
    const galleryFluid = group.map(({ node }) => ({
      ...node.localFile.childImageSharp.fluid,
    }));
    const galleryTotal = group.map(({ node }) => ({
      ...node.localFile.childImageSharp.fluid,
      id: node.id,
      title: node.title,
      caption: `${node.title} – ${node.caption} - ${node.date}`,
    }));

    // console.log(fluid);
    // console.log(group[0].node.localFile.childImageSharp.fluid);

    return (
      <div>
        <ParallaxLazy small filter fluid={fluid} banner={banner} />
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
                info={galleryImageInfo}
                fluid={galleryFluid}
                images={galleryTotal}
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
      </div>
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
