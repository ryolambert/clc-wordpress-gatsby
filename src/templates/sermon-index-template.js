import React, { Component } from 'react';
import { graphql } from 'gatsby';
// import AniLink fade  from 'gatsby-link';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
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
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardFooter from 'components/Card/CardFooter.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import ParallaxLazy from 'components/Parallax/ParallaxLazy.jsx';
import SimplePagination from 'components/Pagination/SimplePagination.jsx';
import Footer from 'components/Footer/Footer';

import postsIndexPageStyle from 'assets/jss/material-kit-react/views/postsIndexPageStyle.jsx';

class SermonIndexPage extends React.Component {
  render() {
    const { data, pageContext, classes, ...rest } = this.props;
    const { group, index, first, last, pageCount } = pageContext;

    const sermonIndexParallax = this.props.data.sermonIndexParallaxImg.edges[0]
      .node.featured_media.localFile.childImageSharp.fluid;
    const fallBackParallax = this.props.data.fallBackSermonParallaxImg.fluid;
    const fluid = sermonIndexParallax || fallBackParallax;
    // const fluidCardImage = this.props.group.node.featured_media
    //   ? this.props.group.node.featured_media.localFile.childImageSharp.fluid
    //   : null;

    const banner = {
      title: 'Sermons',
      subTitle: 'Take a listen 👂 to our latest Sermons⛪',
    };

    return (
      <div>
        <ParallaxLazy small filter fluid={fluid} banner={banner} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <GridContainer justify="center">
            <GridItem xs={11} sm={10} md={8}>
              <br />
              <SimplePagination
                route="sermons"
                pageContext={pageContext}
                color="primary"
              />
            </GridItem>
          </GridContainer>
          <GridContainer justify="center">
            {group.map(({ node }) => (
              <GridItem xs={11} sm={5} md={3} key={node.id}>
                <AniLink
                  fade
                  to={`/post/${node.slug}`}
                  className={classes.cardTitle}
                  key={node.id}
                >
                  <Card
                    key={node.id}
                    className={classes.card}
                    style={{ marginBottom: 50, display: 'flex' }}
                  >
                    {node.featured_media && (
                      <Img
                        className={classes.imgCardTop}
                        style={{
                          height: '200px',
                          maxHeight: '25%',
                          overflow: 'hidden',
                          marginRight: 20,
                        }}
                        objectFit="cover"
                        objectPosition="50% 50%"
                        fluid={
                          node.featured_media.localFile.childImageSharp.fluid
                        }
                      />
                    )}
                    {!node.featured_media && (
                      <Img
                        className={classes.imgCardTop}
                        style={{
                          height: '200px',
                          maxHeight: '25%',
                          overflow: 'hidden',
                          marginRight: 20,
                        }}
                        objectFit="cover"
                        objectPosition="50% 50%"
                        fluid={fallBackParallax}
                      />
                    )}
                    <CardBody>
                      <h4 className={classes.cardTitle}>
                        {/* <h4> */}
                        <strong
                          dangerouslySetInnerHTML={{ __html: node.title }}
                        />
                      </h4>
                      <p
                        className={classes.excerpt}
                        dangerouslySetInnerHTML={{ __html: node.excerpt }}
                      />
                    </CardBody>
                    <CardFooter className={classes.details}>
                      <p>
                        <small
                          className={classes.textMuted}
                          dangerouslySetInnerHTML={{ __html: node.date }}
                        />
                      </p>
                    </CardFooter>
                  </Card>
                </AniLink>
              </GridItem>
            ))}
          </GridContainer>
          <GridContainer justify="center">
            <GridItem xs={11} sm={10} md={8}>
              <br />
              <SimplePagination
                route="posts"
                pageContext={pageContext}
                color="primary"
              />
            </GridItem>
          </GridContainer>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(postsIndexPageStyle)(SermonIndexPage);

export const query = graphql`
  query allSermonsQuery {
    allWordpressPost(
      filter: { categories: { elemMatch: { name: { eq: "Sermons" } } } }
      limit: 12
    ) {
      edges {
        node {
          id
          slug
          status
          template
          format
          title
          excerpt
          date(formatString: "MMMM DD, YYYY")
          # featured_media {
          #   localFile {
          #     childImageSharp {
          #       fluid(maxWidth: 1200) {
          #         ...GatsbyImageSharpFluid_withWebp
          #       }
          #     }
          #   }
          # }
        }
      }
    }
    sermonIndexParallaxImg: allWordpressPost(
      sort: { order: DESC, fields: date }
      filter: {
        categories: { elemMatch: { name: { eq: "Sermons" } } }
        featured_media: { status: { ne: null } }
      }
      limit: 1
    ) {
      edges {
        node {
          featured_media {
            id
            localFile {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  src
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
        ...GatsbyImageSharpFluid
      }
    }
  }
`;
