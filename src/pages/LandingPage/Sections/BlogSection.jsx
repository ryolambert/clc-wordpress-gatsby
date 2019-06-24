import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Card from 'components/Card/Card.jsx';
import Img from 'gatsby-image';
import withStyles from '@material-ui/core/styles/withStyles';
import postsIndexPageStyle from 'assets/jss/material-kit-react/views/postsIndexPageStyle.jsx';

const BlogSection = ({ data, props }) => {
  const { edges: posts } = data.blogLatest;
  const { classes } = props;
  const fallBack = data.fallBackImg.fluid;

  posts.forEach(function(post) {
    post.start = post.node.date;
    post.title = post.node.title;
    post.excerpt = post.node.excerpt;
    post.img = post.node.featured_media;
    console.log(post.start);
  });
  return (
    <GridContainer justify="center">
      <h3 className="post-title">Latest Blog</h3>
      <GridItem>
        {posts.length ? (
          <GridItem>
            {posts.map(post => (
              <GridItem key={post.title}>
                <Link to={`/post/${post.node.slug}`}>
                  <Card className={classes.card} raised={true} carousel>
                    {post.node.featured_media && (
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
                          post.node.featured_media.localFile.childImageSharp
                            .fluid
                        }
                      />
                    )}
                    {!post.node.featured_media && (
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
                        fluid={fallBack}
                      />
                    )}
                    <p>
                      {new Date(post.start).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </Card>
                </Link>
              </GridItem>
            ))}
          </GridItem>
        ) : (
          'No upcoming posts yet.'
        )}
      </GridItem>
    </GridContainer>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        blogLatest: allWordpressPost(
          sort: { order: DESC, fields: [date] }
          limit: 3
          filter: { categories: { elemMatch: { name: { eq: "Blog" } } } }
        ) {
          edges {
            node {
              id
              slug
              date
              title
              excerpt
              tags {
                name
              }
              featured_media {
                id
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1200) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              categories {
                name
              }
              content
            }
          }
        }
        fallBackImg: imageSharp(original: { src: { regex: "/skyline/" } }) {
          fluid(maxWidth: 1200) {
            src
            ...GatsbyImageSharpFluid
          }
        }
      }
    `}
    render={data => <BlogSection data={data} {...props} />}
  />
);
