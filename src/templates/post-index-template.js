import React, { Component } from 'react';
import Link from 'gatsby-link';
import { graphql } from 'gatsby';
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
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import ParallaxLazy from 'components/Parallax/ParallaxLazy.jsx';
import SimplePagination from 'components/Pagination/SimplePagination.jsx';

import postsIndexPageStyle from 'assets/jss/material-kit-react/views/postsIndexPageStyle.jsx';
import { Grid } from '@material-ui/core';

const NavLink = props => {
  if (!props.test) {
    return (
      <Link
        style={{
          color: '#fff',
          textShadow: '0.05em 0.08em 0.2em rgba(0,0,0,.85)'
        }}
        to={props.url}>
        {props.text}
      </Link>
    );
  } else {
    return <span>{props.text}</span>;
  }
};

class PostIndexPage extends React.Component {
  render() {
    const { data, pageContext, classes, ...rest } = this.props;
    const { group, index, first, last, pageCount } = pageContext;

    const previousUrl = index - 1 == 1 ? '' : (index - 1).toString();
    const nextUrl = (index + 1).toString();

    const blogParallax = this.props.data.blogParallaxImg.edges[0].node
      .featured_media.localFile.childImageSharp.fluid;
    const fallBackParallax = this.props.data.fallBackParallaxImg.fluid;
    const fluid = blogParallax ? blogParallax : fallBackParallax;

    const post = {
      title: 'Blog',
      date: 'Bless Up 🙏 Read or Listen to our latest! 🙌'
    };

    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRounded,
      classes.imgFluid,
      classes.cover
    );

    // console.log(last);

    // console.log('Dynamic Blog Object');
    // console.table(blogParallax);
    // console.log('Ternary Fallback Object');
    // console.table(fluid);
    // console.log('Fallback Object');
    // console.table(fallBackParallax);
    // Testing group is being grabbed
    // console.table({classes});
    console.table({ group });

    return (
      <Layout>
        <ParallaxLazy small filter fluid={fluid} post={post}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
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
                  Blog
                </h1>
                <h4>Take a read or a listen!</h4>
              </GridItem>
            </GridContainer>
          </div>
        </ParallaxLazy>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <GridContainer justify="center">
            <GridItem xs={11} sm={11} md={8}>
              <br />
              <SimplePagination
                route="posts"
                pageContext={pageContext}
                color="primary"
              />
            </GridItem>
          </GridContainer>
          <GridContainer justify="center">
            <GridItem xs={11} sm={11} md={6}>
              {group.map(({ node }) => (
                <Link to={'/post/' + node.slug} className={classes.cardTitle}>
                  <Card
                    key={node.id}
                    className={classes.card}
                    style={{ marginBottom: 50, display: 'flex' }}>
                    {node.featured_media &&
                      node.featured_media.localFile.childImageSharp.fluid && (
                        <Img
                          className={classes.imgCardTop}
                          style={{ height: '25%', marginRight: 20 }}
                          objectFit="cover"
                          objectPosition="50% 50%"
                          fluid={
                            node.featured_media.localFile.childImageSharp.fluid
                          }
                        />
                      )}
                    <CardBody>
                      <h4 className={classes.cardTitle}>
                      {/* <h4> */}
                        <strong
                          dangerouslySetInnerHTML={{ __html: node.title }}
                        />
                      </h4>
                      <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                      <p>
                        <small
                          className={classes.textMuted}
                          dangerouslySetInnerHTML={{ __html: node.date }}
                        />
                      </p>
                    </CardBody>
                    {/* <CardFooter className={classes.details}>
                      {node.date}
                    </CardFooter> */}
                  </Card>
                </Link>
              ))}
            </GridItem>
            <GridItem xs={11} sm={11} md={8}>
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

export default withStyles(postsIndexPageStyle)(PostIndexPage);

export const query = graphql`
  query allPostsQuery {
    allWordpressPost {
      edges {
        node {
          id
          slug
          status
          template
          format
          title
          tags {
            name
          }
          date(formatString: "MMMM DD, YYYY")
          featured_media {
            localFile {
              childImageSharp {
                fluid(
                  maxWidth: 1200
                  traceSVG: {
                    color: "lightgray"
                    optTolerance: 0.4
                    turdSize: 120
                    turnPolicy: TURNPOLICY_MAJORITY
                  }
                ) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    blogParallaxImg: allWordpressPost(
      sort: { order: DESC, fields: date }
      filter: { featured_media: { id: { regex: "/./" } } }
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
    # }
    # blogParallaxImg: allWordpressWpMedia(sort: {fields: date, order: DESC}, limit: 1) {
    #   edges {
    #     node {
    #       localFile {
    #         childImageSharp {
    #           fluid(maxWidth: 1200) {
    #             src
    #             ...GatsbyImageSharpFluid
    #           }
    #         }
    #       }
    #     }
    #   }
    # }
    fallBackParallaxImg: imageSharp(original: { src: { regex: "/skyline/" } }) {
      fluid(maxWidth: 1200) {
        src
        ...GatsbyImageSharpFluid
      }
    }
  }
`;
