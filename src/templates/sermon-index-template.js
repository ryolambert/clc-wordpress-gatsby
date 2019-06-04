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
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import ParallaxLazy from 'components/Parallax/ParallaxLazy.jsx';
import SimplePagination from 'components/Pagination/SimplePagination.jsx';

import profilePageStyle from 'assets/jss/material-kit-react/views/profilePageStyle.jsx';

class SermonIndexPage extends React.Component {
  render() {
    const { data, pageContext, classes, ...rest } = this.props;
    const { group, index, first, last, pageCount } = pageContext;

    const sermonIndexParallax = this.props.data.sermonIndexParallaxImg.edges[0]
      .node.featured_media.localFile.childImageSharp.fluid;
    const fallBackParallax = this.props.data.fallBackSermonParallaxImg.fluid;
    const fluid = sermonIndexParallax ? sermonIndexParallax : fallBackParallax;

    const post = {
      title: 'Sermons',
      date: 'Take a listen 👂 to our latest Sermons⛪'
    };

    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRounded,
      classes.imgFluid
    );

    console.table(pageContext);
    // console.log('Dynamic Blog Object');
    // console.table(blogParallax);
    // console.log('Ternary Fallback Object');
    // console.table(fluid);
    // console.log('Fallback Object');
    // console.table(fallBackParallax);
    // Testing group is being grabbed
    // console.table({classes});

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
                  Sermons
                </h1>
                
              </GridItem>
            </GridContainer>
          </div>
        </ParallaxLazy>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <GridContainer justify="center">
            <GridItem xs={8} sm={8} md={8}>
              <br />
              <SimplePagination
                route="posts"
                pageContext={pageContext}
                color="primary"
              />
            </GridItem>
          </GridContainer>
          <GridContainer justify="center">
            <GridItem xs={10} sm={10} md={8}>
              {group.map(({ node }) => (
                <Card
                  key={node.slug}
                  className={classes.card}
                  style={{ marginBottom: 50 }}>
                  {node.featured_media &&
                    node.featured_media.localFile.childImageSharp.fluid && (
                      <CardHeader>
                        <Img
                          className={imageClasses}
                          fluid={
                            node.featured_media.localFile.childImageSharp.fluid
                          }
                        />
                      </CardHeader>
                    )}

                  <Link to={'/post/' + node.slug} className={classes.cardTitle}>
                    <h3>{node.title}</h3>
                  </Link>

                  <CardBody
                    className={classes.cardBody}
                    dangerouslySetInnerHTML={{ __html: node.excerpt }}
                  />
                  <CardFooter>{node.date}</CardFooter>
                </Card>
              ))}
            </GridItem>
          </GridContainer>

          <GridContainer justify="center">
            <GridItem xs={8} sm={8} md={8}>
              <br />
              <SimplePagination
                route="posts"
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

export default withStyles(profilePageStyle)(SermonIndexPage);

export const query = graphql`
  query allSermonsQuery {
    allWordpressPost(filter: { acf: { category: { eq: "Sermon" } } }) {
      edges {
        node {
          id
          slug
          status
          template
          format
          title
          date
          featured_media {
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
                  src
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
    sermonIndexParallaxImg: allWordpressPost(
      sort: { order: DESC, fields: date }
      filter: {
        featured_media: { id: { regex: "/./" } }
        acf: { category: { eq: "Sermon" } }
      }
    ) {
      edges {
        node {
          featured_media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    fallBackSermonParallaxImg: imageSharp(
      original: { src: { regex: "/sermons-background/" } }
    ) {
      fluid(maxWidth: 1200) {
        src
        ...GatsbyImageSharpFluid
      }
    }
  }
`;
