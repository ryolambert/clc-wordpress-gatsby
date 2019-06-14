import React from 'react';
import { StaticQuery, graphql, navigate } from 'gatsby';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
const localizer = BigCalendar.momentLocalizer(moment);

const DisplayCalendar = ({ events }) => {
  // const { events } = data;

  events.forEach(function(event) {
    event.start = new Date(event.node.acf.event_start);
    event.end = new Date(event.node.acf.event_end);
    event.title = event.node.title;
  });
  return (
    <div className="calendar">
      {/* { console.log(events) } */}
      <BigCalendar
        // eventPropGetter={event => ({
        //   className: [
        //     'cat-' + event.node.category.toLowerCase(),
        //     event.node.teaching ? '' : ''
        //   ]
        // })}
        localizer={localizer}
        selectable
        events={events}
        timeslots={1}
        step={60}
        onSelectEvent={event => navigate(`/post/${event.node.slug}`)}
        formats={{ dayFormat: 'MMMM DD, YYYY' }}
      />
    </div>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressPost(
          sort: { order: DESC, fields: [acf___event_start] }
          filter: { categories: { elemMatch: { name: { eq: "Events" } } } }
        ) {
          edges {
            node {
              id
              slug
              title
              acf {
                event_start
                event_end
                event_description
                event_location
                event_title
                event_image {
                  id
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 1200) {
                        ...GatsbyImageSharpFluid
                      }
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
