import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
// Component Imports
import Layout from 'components/Layout/Layout';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import Button from 'components/CustomButtons/Button';
import ParallaxLazy from 'components/Parallax/ParallaxLazy';
import SimplePagination from 'components/Pagination/SimplePagination';

import postsIndexPageStyle from 'assets/jss/material-kit-react/views/postsIndexPageStyle';

class PostIndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      search: '',
      pickedFilter: 'all',
      allPosts: [...this.props.posts]
    };
  }



  render() {
    const { data, pageContext, classes, ...rest } = this.props;
    const { group, index, first, last, pageCount } = pageContext;

    const previousUrl = index - 1 == 1 ? '' : (index - 1).toString();
    const nextUrl = (index + 1).toString();

    const blogParallax = this.props.data.blogParallaxImg.edges[0].node
      .featured_media.localFile.childImageSharp.fluid;
    const fallBackParallax = this.props.data.fallBackParallaxImg.fluid;
    const fluid = blogParallax ? blogParallax : fallBackParallax;

    const banner = {
      title: 'Blog',
      subTitle: 'Bless Up 🙏 Read or Listen to our latest! 🙌'
    };

    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRounded,
      classes.imgFluid,
      classes.cover
    );

    return (
      <Layout>
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
                  to={`/post/${  node.slug}`}
                  className={classes.cardTitle}
                  key={node.id}>
                  <Card
                    key={node.id}
                    className={classes.card}
                    style={{ marginBottom: 50, display: 'flex' }}>
                    {node.featured_media && (
                      <Img
                        className={classes.imgCardTop}
                        style={{
                          height: '200px',
                          maxHeight: '25%',
                          overflow: 'hidden',
                          marginRight: 20
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
                          marginRight: 20
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
