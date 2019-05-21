module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-resolve-src`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: 'src/assets/img/favicon.png' // This path is relative to the root of the site.
      }
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        // I have created a dummy site for us to use with the plugins we discussed
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
          replacementUrl: 'http://localhost:8000'
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
          '**/events'
        ],
        excludedRoutes: [],
        normalizer: function({ entities }) {
          return entities;
        }
      }
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ]
};
