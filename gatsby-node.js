/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

//TODO-
// 1️⃣: sermonTemplate
// 2️⃣: sermonsTemplate
// 3️⃣: albumTemplate
// 4️⃣: albumsTemplate
// 5️⃣: eventTemplate
// 6️⃣: eventsTemplate

const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);
const queryAll = require(`./src/queries/queryAll.js`);
const createPaginatedPages = require('gatsby-paginate');


exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    // Templates
    const pageTemplate = path.resolve('./src/templates/page-template.js');
    const postTemplate = path.resolve('./src/templates/post-template.js');
    const sermonTemplate = path.resolve('./src/templates/sermon-template.js');
    

    resolve(
      graphql(queryAll).then(result => {
        if (result.errors) reject(result.errors);

        // Pages detail
        const pages = result.data.allWordpressPage.edges;

        pages.forEach(edge => {
          createPage({
            path: `/${edge.node.slug}/`,
            component: slash(pageTemplate),
            context: {
              id: edge.node.id
            }
          });
        });

        // Posts detail
        const posts = result.data.allWordpressPost.edges;

        createPaginatedPages({
          edges: posts,
          createPage: createPage,
          pageTemplate: 'src/templates/post-index-template.js',
          pageLength: 10,
          pathPrefix: 'posts'
        });

        posts.forEach(edge => {
          createPage({
            path: `/post/${edge.node.slug}/`,
            component: slash(postTemplate),
            context: {
              id: edge.node.id
            }
          });
        });

        //Sermons detail
        const sermons = result.data.allSermonPost.edges;

        createPaginatedPages({
          edges: sermons,
          createPage: createPage,
          pageTemplate: 'src/templates/sermon-index-template.js',
          pageLength: 10,
          pathPrefix: 'sermons'
        });

        sermons.forEach(edge => {
          createPage({
            path: `/sermon/${edge.node.slug}/`,
            component: slash(sermonTemplate),
            context: {
              id: edge.node.id
            }
          });
        });
      })
    );
  });
};

// const path = require(`path`);
// const { createFilePath } = require(`gatsby-source-filesystem`);

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions;
//   const BlogPostTemplate = path.resolve('./src/templates/BlogPost.js');
//   const PageTemplate = path.resolve('./src/templates/Page.js');

//   return graphql(`
//     {
//       allWordpressPost {
//         edges {
//           node {
//             slug
//             wordpress_id
//           }
//         }
//       }
//       allWordpressPage {
//         edges {
//           node {
//             slug
//             wordpress_id
//           }
//         }
//       }
//     }
//   `).then(result => {
//     if (result.errors) {
//       throw result.errors;
//     }

//     const BlogPosts = result.data.allWordpressPost.edges;
//     BlogPosts.forEach(post => {
//       createPage({
//         path: `/post/${post.node.slug}`,
//         component: BlogPostTemplate,
//         context: {
//           id: post.node.wordpress_id
//         }
//       });

//       const Pages = result.data.allWordpressPage.edges;
//       Pages.forEach(page => {
//         createPage({
//           path: `/${page.node.slug}`,
//           component: PageTemplate,
//           context: {
//             id: page.node.wordpress_id
//           }
//         });
//       });
//     });
//   });
// };
