import React from 'react';
import { StaticQuery, graphql, navigate } from 'gatsby';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
const localizer = BigCalendar.momentLocalizer(moment);

const DisplayCalendar = ({ events }) => {
  // const { events } = data;
  {
    console.log(events);
  }

  events.forEach(function(event) {
    const startDate = moment(
      `${event.node.acf.event_start}`,
      'DD/MM/YYYY hh:mm a'
    ).format('MM/DD/YYYY, hh:mm a');
    console.log(startDate);
    const endDate = moment(
      `${event.node.acf.event_end}`,
      'DD/MM/YYYY hh:mm a'
    ).format('MM/DD/YYYY, hh:mm a');
    console.log(endDate);
    event.start = new Date(startDate);
    event.end = new Date(endDate);
    event.title = event.node.title;
    // console.table(event.start);
  });
  console.log(events);
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
        onSelectEvent={event => navigate(`/post/${event.node.slug}`)}
        formats={{ dayFormat: 'DD/MM/YYYY' }}
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
