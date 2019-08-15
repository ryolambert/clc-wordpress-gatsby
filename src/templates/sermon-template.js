//* Individual Post Template
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

class SermonTemplate extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    const post = this.props.data.wordpressPost;
    const placeHolder = this.props.data.placeHolderImg.fluid;
    const fluid = post.featured_media
      ? post.featured_media.localFile.childImageSharp.fluid
      : placeHolder;
    const fluidContent = post.featured_media
      ? post.featured_media.localFile.childImageSharp.fluid
      : null;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRounded,
      classes.imgFluid
    );

    return (
      <div>
        <Layout>
          <ParallaxLazy small color fluid={fluid}>
            <div className={classes.parallaxContainer}>
              <GridContainer
                justify="center"
                className={classes.parallaxWrapper}>
                <GridItem xs={10} sm={10} md={6}>
                  <h1 className={classes.parallaxTitle}>
                    <strong dangerouslySetInnerHTML={{ __html: post.title }} />
                  </h1>
                  <h5 className={classes.parallaxSubtitle}>
                    <strong dangerouslySetInnerHTML={{ __html: post.date }} />
                  </h5>
                </GridItem>
              </GridContainer>
            </div>
          </ParallaxLazy>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div>
              <div className={classes.container}>
                <GridContainer justify="center">
                  <GridItem xs={11} sm={11} md={10}>
                    {fluidContent && (
                      <div>
                        <Img
                          alt="Screenshot of Project"
                          fluid={
                            post.featured_media.localFile.childImageSharp.fluid
                          }
                          className={imageClasses}
                          style={{ marginTop: '20px', marginBottom: '20px' }}
                        />
                      </div>
                    )}
                    <div
                      className={classes.content}
                      dangerouslySetInnerHTML={{
                        __html: post.content
                      }}
                    />
                    <p dangerouslySetInnerHTML={{ __html: post.date }} />
                    <p dangerouslySetInnerHTML={{ __html: post.slug }} />
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
  query currentSermonQuery($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      featured_media {
        localFile {
          childImageSharp {
            fluid(maxWidth: 1100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      slug
      id
      date(formatString: "MMMM DD, YYYY")
    }
    placeHolderImg: imageSharp(
      original: { src: { regex: "/sermons-background/" } }
    ) {
      fluid(maxWidth: 1100) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;

export default withStyles(postPageStyle)(SermonTemplate);
