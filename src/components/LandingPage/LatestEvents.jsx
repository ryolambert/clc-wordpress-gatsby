// import React from 'react'
// import { StaticQuery, graphql, Link } from "gatsby"

// const DisplayCalendar = ({ data }) => {
//     const { edges: events } = data.allMarkdownRemark

//     events.forEach(
//         function(event) {
//           event.start = new Date(event.node.frontmatter.start)
//           event.end = new Date(event.node.frontmatter.end)
//           event.title = event.node.frontmatter.title
//         }
//       )
//     return (
//         <div>
//         {
//             events.length
//             ? (
//             <ul className="latest-events">
//             {
//                 events.map((event) => (
//                 <li key={ event.title }>
//                     <Link to={ event.node.fields.slug }>
//                     { event.title }
//                     </Link>
//                     <p>{ new Date(event.start).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'}) }</p>
//                 </li>
//                 ))
//             }
//             </ul>
//             )
//             : "No upcoming events yet."
//         }
//         </div>
//     )
// }

// export default props => (
//     <StaticQuery
//         query={graphql`
//         query {
//             allMarkdownRemark(
//                 sort: { order: DESC, fields: [frontmatter___date] },
//                 filter: { frontmatter: { layout: { eq: "Event" } }}
//               ) {
//                 edges {
//                   node {
//                     id
//                     fields {
//                       slug
//                     }
//                     frontmatter {
//                       title
//                       layout
//                       date(formatString: "MMMM DD, YYYY")
//                       start
//                       end
//                       category
//                       teaching
//                     }
//                   }
//                 }
//               }
//         }
//         `}
//         render={data => <DisplayCalendar data={data} {...props} />}
//     />
// )
