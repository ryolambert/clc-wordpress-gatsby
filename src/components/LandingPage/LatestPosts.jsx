// import React from 'react'
// import { Link } from 'gatsby'
// import Img from 'gatsby-image'
// // import PreviewCompatibleImage from './PreviewCompatibleImage'

// const LatestsPosts = ({ blogPosts }) => {

//     return (
//           <div className="latest-posts columns is-multiline">
//             {blogPosts
//               .map(({ node: post }) => (
//                 <div className="column is-one-third" key={post.id}>
//                   <div className="card">
//                     <div className="card-image">
//                       <Link className="" to={post.fields.slug}>
//                         <figure className="image">
//                           <Img fluid={ post.frontmatter.hero.childImageSharp.fluid } alt={post.frontmatter.title} />
//                             {/* <PreviewCompatibleImage imageInfo={
//                               post.frontmatter.hero ? post.frontmatter.hero.childImageSharp.fluid : "https://via.placeholder.com/640"}
//                               alt={post.frontmatter.title} /> */}
//                         </figure>
//                       </Link>
//                     </div>
//                     <div className="card-content">
//                       <p className="title is-4">
//                         <Link className="" to={post.fields.slug}>
//                           {post.frontmatter.title}
//                         </Link>
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//     )
// }

// export default LatestsPosts
