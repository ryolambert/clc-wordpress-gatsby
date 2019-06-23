import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import GridContainer from 'components/Grid/GridContainer.jsx';

const DisplayCalendar = ({ data }) => {
  const { edges: posts } = data.blogLatest;

  posts.forEach(function(post) {
    post.start = post.node.date;
    post.title = post.node.title;
  });
  return (
    <GridContainer justify="center">
      <h3 className="post-title">Latest Events</h3>
      {posts.length ? (
        <ul className="latest-posts">
          {posts.map(post => (
            <li key={post.title}>
              <Link
                to={`/post/${post.node.slug}`}
                className="title"
                dangerouslySetInnerHTML={{ __html: post.title }}
              />
              <p>
                {new Date(post.start).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        'No upcoming posts yet.'
      )}
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
          filter: { categories: { elemMatch: { name: { eq: "Uncategorized" } } } }
        ) {
          edges {
            node {
              id
              slug
              title
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
      }
    `}
    render={data => <DisplayCalendar data={data} {...props} />}
  />
);
