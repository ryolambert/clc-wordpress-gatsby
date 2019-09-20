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

// React icons
import { FaPlay } from 'react-icons/fa';

// Component Imports
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from 'components/CustomButtons/Button';
import HeaderLinks from 'components/Header/HeaderLinks';
import ParallaxLazy from 'components/Parallax/ParallaxLazy';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import Footer from 'components/Footer/Footer';

import postPageStyle from 'assets/jss/material-kit-react/views/postPageStyle';

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
    const banner = {
      title: post.title,
      subTitle: post.date,
    };

    return (
      <div>
        <ParallaxLazy small color fluid={fluid} banner={banner} />
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
                      __html: post.content,
                    }}
                  />
                  <p dangerouslySetInnerHTML={{ __html: post.date }} />
                  <p dangerouslySetInnerHTML={{ __html: post.slug }} />
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
        <Footer />
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
    placeHolderImg: imageSharp(
      original: { src: { regex: "/sermons-background/" } }
    ) {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;

export default withStyles(postPageStyle)(SermonTemplate);
