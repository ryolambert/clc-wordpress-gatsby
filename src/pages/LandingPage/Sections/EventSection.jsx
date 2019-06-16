import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

const DisplayCalendar = ({ data }) => {
  const { edges: events } = data.eventsLatest;

  events.forEach(function(event) {
    event.start = new Date(event.node.acf.event_start);
    event.end = new Date(event.node.acf.event_end);
    event.title = event.node.title;
  });
  return (
    <div>
      <h3>Latest Events</h3>
      {events.length ? (
        <ul className="latest-events">
          {events.map(event => (
            <li key={event.title}>
              <Link
                to={`/post/${event.node.slug}`}
                className="title"
                dangerouslySetInnerHTML={{ __html: event.title }}
              />
              <p>
                {new Date(event.start).toLocaleDateString('en-US', {
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
        'No upcoming events yet.'
      )}
    </div>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        eventsLatest: allWordpressPost(
          sort: { order: DESC, fields: [acf___event_start] }
          limit: 3
          filter: { categories: { elemMatch: { name: { eq: "Events" } } } }
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
              acf {
                event_start
                event_end
                event_location
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
