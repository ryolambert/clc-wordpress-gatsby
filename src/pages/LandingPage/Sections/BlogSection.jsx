import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Card from 'components/Card/Card.jsx';
import Img from 'gatsby-image';
import { makeStyles } from '@material-ui/styles';
import imagesStyle from 'assets/jss/material-kit-react/imagesStyles.jsx';
import { cardTitle, container } from 'assets/jss/material-kit-react.jsx';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  cardTitle,
  textMuted: {
    color: '#6c757d',
  },
  container,
  description: {
    margin: '1.071rem auto 0',
    maxWidth: '600px',
    color: '#999',
    textAlign: 'center !important',
  },
  name: {
    marginTop: '-80px',
  },
  ...imagesStyle,
  card: {
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: '200px',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: '100%',
    paddingLeft: '20px',
    paddingBottom: '10px',
    minWidth: '400px',
    flexGrow: 3,
    flexBasis: '400px',
  },
  cover: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    maxHeight: '250px',
  },
  coverImg: {
    height: '100%',
    maxHeight: '250px',
  },
  excerpt: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    webkitBoxOrient: 'vertical',
    webkitLineClamp: '3',
    lineHeight: '1rem',
    maxHeight: '3rem',
    fontSize: '1rem',
  },
});

const BlogSection = ({ data }) => {
  const { edges: posts } = data.blogLatest;
  const classes = useStyles();
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
                <AniLink fade to={`/post/${post.node.slug}`}>
                  <Card className={classes.card} raised="true" carousel>
                    {post.node.featured_media && (
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
                          marginRight: 20,
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
                        year: 'numeric',
                      })}
                    </p>
                  </Card>
                </AniLink>
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
