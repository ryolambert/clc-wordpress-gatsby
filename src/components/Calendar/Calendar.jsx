import React from 'react';
import { StaticQuery, graphql, navigate } from 'gatsby';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
const localizer = BigCalendar.momentLocalizer(moment);

const DisplayCalendar = ({ events }) => {
  events.forEach(function(event) {
    event.start = new Date(event.node.acf.event_start);
    event.end = new Date(event.node.acf.event_end);
    event.title = event.node.title;
    // console.table(event.start);
  });
  return (
    <div className="calendar">
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
        onSelectEvent={event => navigate(`/event/${event.node.slug}`)}
        formats={{ dayFormat: 'MM/DD/YYYY' }}
      />
    </div>
  );
};

DisplayCalendar.propTypes = {
  events: PropTypes.object.isRequired,
  className: PropTypes.string
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
