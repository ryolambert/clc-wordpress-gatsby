//GQL Page Templating Queries for WP Pages, Blog Posts, Sermons, Galleries, and Events
'use strict';

module.exports = `
    {
        allWordpressPage {
            edges {
                node {
                    id
                    slug
                    status
                    template
                }
            }
        }

        allBlogPost: allWordpressPost( filter: { categories: {elemMatch: { name: { eq: "Blog"}}}} limit: 24) {
            edges {
                node {
                    id
                    slug
                    status
                    excerpt
                    content
                    categories {
                      name
                    }
                    tags {
                      name
                    }
                    template
                    format
                    title
                    date(formatString: "MMMM DD, YYYY")
                    featured_media{
                        localFile {
                            childImageSharp{
                                fluid (maxWidth: 1200){
                                    src
                                    srcSet
                                    aspectRatio
                                    sizes
                                    base64
                                  }
                                }
                            }
                            source_url
                    }
                }
            }
        }

        allEventPost: allWordpressPost( filter: { categories: {elemMatch: { name: { eq: "Events"}}}} limit: 24) {
          edges {
            node {
              id
              slug
              status
              template
              format
              title
              date(formatString: "MMMM DD, YYYY")
            }
          }
        }

        allSermonPost:  allWordpressPost(
            filter: { categories: { elemMatch: { name: { eq: "Sermons" } } } }
            limit: 24
            ) {
            edges {
              node {
                id
                slug
                status
                template
                format
                title
                excerpt
                date(formatString: "MMMM DD, YYYY")
                featured_media {
                    localFile {
                        childImageSharp{
                            fluid (maxWidth: 1200){
                                src
                                srcSet
                                aspectRatio
                                sizes
                                base64
                              }
                            }
                        }
                }
              }
            }
          }

        allGalleryMedia: allWordpressWpMedia(filter: {mime_type: {regex: "/image/"}} limit: 48) {
            edges {
              node {
                id
                alt_text
                caption
                description
                date(formatString: "MMMM DD, YYYY")
                slug
                source_url
                title
                mime_type
                media_type
                localFile {
                    id
                  childImageSharp {
                    fluid(maxWidth: 1200) {
                        src
                        srcSet
                        aspectRatio
                        sizes
                        base64
                        originalImg
                    }
                  }
                }
              }
            }
          }
          siteSearchIndex{
            index
          }
          wpgraphql {
        pages {
          edges {
            node {
              id
              slug
          }
          }
        }
    }
`;
