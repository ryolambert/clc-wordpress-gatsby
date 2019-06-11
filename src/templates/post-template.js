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
import WPGBlocks from 'react-gutenberg';
// import { IWPGBlock } from 'react-gutenberg/src/types';

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

class PostTemplate extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    const post = this.props.data.post;
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

    // Testing if featured_media fluid works
    // console.log(fluid);
    // console.table(classes.container);

    return (
      <div>
        <Layout>
          <ParallaxLazy small filter fluid={fluid} post={post} />
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
                    {/* <article data-id={post.id}>
                      <h2 dangerouslySetInnerHTML={{ __html: post.title }} />
                      <WPGBlocks blocks={post.blocks} />
                    </article> */}
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
  fragment WPPost on wordpress__POST {
    wordpress_id
    id
    title
    content
    excerpt
    featured_media {
        localFile {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    slug
    type
    date(formatString: "MMMM DD, YYYY")
    categories {
      name
      slug
    }
  }

  fragment Blocks on wordpress__POSTBlocks {
    attrs {
      align
      ids
      level
      wordpress_id
    }
    innerBlocks {
      attrs {
        align
        placeholder
        fontSize
      }
      innerContent
      innerHTML
      blockName
    }
    blockName
    innerContent
    innerHTML
  }

  query currentPostQuery($id: String!) {
    post: wordpressPost(id: { eq: $id }) {
      ...WPPost
      blocks {
        ...Blocks
      }
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
