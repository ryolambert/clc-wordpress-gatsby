module.exports = {
  siteMetadata: {
    title: `Longbeach City Lights Church Website`,
    description: `🙏Community through faith! Techstack: Wordpress Headless CMS data source, Decoupled Gatsby frontend, Custom Material UI theme with fully editable graphQL queries connected to the WP REST API, and utilizes Netlify build triggers after every WP update.`,
    author: `@ryolambert`,
    siteUrl: `https://gifted-minsky-8fe3ce.netlify.com`
  },
  plugins: [
    `gatsby-plugin-top-layout`,
    {
      resolve: 'gatsby-plugin-material-ui',
      // If you want to use styled components you should change the injection order.
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
    },
    // {
    //   resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
    //   options: {
    //     // Fields to index
    //     fields: [`title`, `excerpt`, `content`],
    //     // How to resolve each field's value for a supported node type
    //     resolvers: {
    //       // For any node of type wordPressPost, 
    //       wordPressPost: {
    //         title: node => node.title,
    //         excerpt: node => node.excerpt,
    //       },
    //     }
    //   }
    },
    // If you want to use styled components you should add the plugin here.
    // 'gatsby-plugin-styled-components',
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-resolve-src`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/img`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: 'src/assets/img/favicon.png' // This path is relative to the root of the site.
      }
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        // Longbeach City Lights Church WP Demo from Matt
        // baseUrl: 'localhost:8080',
        baseUrl: 'longbeach.citylightschurch.org',
        protocol: 'http',
        hostingWPCOM: false,
        // We will be using some advanced custom fields
        useACF: true,
        acfOptionPageIds: [],
        verboseOutput: true,
        perPage: 100,
        searchAndReplaceContentUrls: {
          // sourceUrl: 'http://localhost:8080/',
          sourceURL: 'http://longbeach.citylightschurch.org',
          replacementUrl: 'https://gifted-minsky-8fe3ce.netlify.com'
        },
        // Set how many simultaneous requests are sent at once.
        concurrentRequests: 10,
        includedRoutes: [
          '**/categories',
          '**/posts',
          '**/pages',
          '**/media',
          '**/tags',
          '**/taxonomies',
          '**/users',
          '**/events',
          '**/menus'
        ],
        excludedRoutes: [
          '**/wordpress__tribe',
          // May remove later
          '**/wordpress__acf_block',
          // No tags currently
          '**/wordpress__acf_tags',
          // No tribe event tags
          '**/wordpress__acf_tribe_events_cat',
          // Only 1 user atm
          '**/wordpress__wp_users',

        ],
        normalizer: function({ entities }) {
          return entities;
        }
      }
    },
    `gatsby-plugin-sitemap`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
  ]
};
