/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Component Imports
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

class PostIndexPage extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state= {
  //     search: '',
  //     pickedFilter: 'all',
  //     allPosts: [...this.props.posts]
  //   };
  // }

  render() {
    const { data, pageContext, classes, ...rest } = this.props;
    const { group, index } = pageContext;

    const blogParallax = this.props.data.blogParallaxImg.edges[0].node
      .featured_media.localFile.childImageSharp.fluid;
    const fallBackParallax = this.props.data.fallBackParallaxImg.fluid;
    const fluid = blogParallax || fallBackParallax;

    const banner = {
      title: 'Blog',
      subTitle: 'Bless Up 🙏 Read or Listen to our latest! 🙌',
    };

    return (
      <div>
        <ParallaxLazy small filter fluid={fluid} banner={banner} />
        <div className={classNames(classes.main, classes.mainRaised)}>
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
          <GridContainer justify="center">
            {group.map(({ node }) => (
              <GridItem xs={11} sm={5} md={3} key={node.id}>
                <Link
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
                </Link>
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
      </div>
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
          excerpt
          template
          format
          title
          categories {
            name
          }
          tags {
            name
          }
          date(formatString: "MMMM DD, YYYY")
          # featured_media {
          #   localFile {
          #     childImageSharp {
          #       fluid(maxWidth: 1200) {
          #         ...GatsbyImageSharpFluid
          #       }
          #     }
          #   }
          # }
        }
      }
    }
    blogParallaxImg: allWordpressPost(
      sort: { order: DESC, fields: date }
      filter: {
        featured_media: { id: { regex: "/./" } }
        categories: { elemMatch: { name: { eq: "Blog" } } }
      }
      limit: 1
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
    fallBackParallaxImg: imageSharp(original: { src: { regex: "/skyline/" } }) {
      fluid(maxWidth: 1200) {
        src
        ...GatsbyImageSharpFluid
      }
    }
  }
`;
