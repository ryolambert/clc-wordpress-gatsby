import React, { Component } from 'react';
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

import profilePageStyle from 'assets/jss/material-kit-react/views/profilePageStyle.jsx';

//todo: Add SEO

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

//todo: Fix component formatting fo

class IndexPage extends React.Component {
  render() {
    const { data, pageContext, classes, ...rest } = this.props;
    const { group, index, first, last, pageCount } = pageContext;

    // const currentUrl = index.toString();
    const previousUrl = index - 1 == 1 ? '' : (index - 1).toString();
    const nextUrl = (index + 1).toString();

    const blogParallax = this.props.data.blogParallaxImg.edges[0].node
      .featured_media.localFile.childImageSharp.fluid;
    const fallBackParallax = this.props.data.fallBackParallaxImg.fluid;
    const fluid = blogParallax ? blogParallax : fallBackParallax;

    const post = {
      title: 'Blog',
      date: 'Bless Yourself Up 🙏 Read or Listen to our latest! 🙌'
    };

    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRounded,
      classes.imgFluid
    );

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
                  Blog
                </h1>
                <h4>Take a read or a listen!</h4>
              </GridItem>
            </GridContainer>
          </div>
        </ParallaxLazy>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <GridContainer justify="center">
            <GridItem xs={10} sm={10} md={10} justify="center">
              <h4 style={{ textAlign: 'center' }}>{pageCount} Pages</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button color="warning">
                  <NavLink
                    style={{
                      color: '#fff',
                      textShadow: '0.05em 0.08em 0.2em rgba(0,0,0,.85)'
                    }}
                    test={first}
                    url={'/posts/' + previousUrl}
                    text="⬅"
                  />
                </Button>
                <Button color="warning">
                  <NavLink test={last} url={'/posts/' + nextUrl} text="➡" />
                </Button>
              </div>
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
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button color="warning">
                  <NavLink
                    style={{
                      color: '#fff',
                      textShadow: '0.05em 0.08em 0.2em rgba(0,0,0,.85)'
                    }}
                    test={first}
                    url={'/posts/' + previousUrl}
                    text="⬅"
                  />
                </Button>
                <Button color="warning">
                  <NavLink test={last} url={'/posts/' + nextUrl} text="➡" />
                </Button>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Layout>
    );
  }
}

export default withStyles(profilePageStyle)(IndexPage);

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
          date
          featured_media {
            localFile {
              childImageSharp {
                fluid(
                  maxWidth: 1200
                  traceSVG: {
                    color: "lightgray"
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
    # blogOne: {

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
