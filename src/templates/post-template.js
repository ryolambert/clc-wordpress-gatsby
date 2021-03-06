/* eslint-disable no-unused-vars */
/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-props-no-spreading */
//* Individual Post Template
// Core Imports
import React from 'react';
// import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// Component Imports
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import HeaderLinks from 'components/Header/HeaderLinks.jsx';
import ParallaxLazy from 'components/Parallax/ParallaxLazy.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import { DiscussionEmbed } from 'disqus-react';

import Image from 'components/image.js';
import postPageStyle from 'assets/jss/material-kit-react/views/postPageStyle.jsx';

class PostTemplate extends React.Component {
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
    const disqusConfig = {
      shortname: process.env.GATSBY_DISQUS_NAME,
      config: { identifier: post.id, title: post.title },
    };
    const banner = {
      title: post.title,
      subTitle: post.date,
    };

    return (
      <div>
        <div>
          <ParallaxLazy small color banner={banner} fluid={fluid} />
          <div className={classNames(classes.main, classes.mainRaised)}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={10}>
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
                    <figcaption
                      className="wp-caption-text"
                      dangerouslySetInnerHTML={{
                        __html: post.featured_media.caption,
                      }}
                    />
                  </div>
                )}
                <div
                  className={classes.content}
                  dangerouslySetInnerHTML={{
                    __html: post.content,
                  }}
                />
                <p dangerouslySetInnerHTML={{ __html: post.date }} />
                <p dangerouslySetInnerHTML={{ __html: post.slug }} />
                <DiscussionEmbed {...disqusConfig} />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export const query = graphql`
  query currentPostQuery($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      featured_media {
        caption
        localFile {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      slug
      id
      date(formatString: "MMMM DD, YYYY")
    }
    placeHolderImg: imageSharp(original: { src: { regex: "/skyline/" } }) {
      fluid(maxWidth: 1200) {
        src
        ...GatsbyImageSharpFluid
      }
    }
  }
`;

export default withStyles(postPageStyle)(PostTemplate);
