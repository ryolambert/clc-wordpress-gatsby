//GQL Page Templating Queries for WP Pages, Blog Posts, Sermons, Galleries, and Events
'use strict';

module.exports = `
    {
        allWordpressPage {
            edges {
                node {
                    id
                    featured_media {
                        localFile {
                            childImageSharp{
                                fluid (maxHeight:600, quality:75){
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
                    slug
                    status
                    template
                }
            }
        }

        allWordpressPost {
            edges {
                node {
                    id
                    slug
                    status
                    template
                    format
                    title
                    date(formatString: "MMMM DD, YYYY")
                    featured_media{
                        localFile {
                            childImageSharp{
                                fluid (maxHeight:600, quality:75){
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

        allEventPost: allWordpressPost( filter: { categories: {elemMatch: { name: { eq: "Events"}}}}) {
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
          ) {
            edges {
              node {
                id
                slug
                status
                template
                format
                title
                date(formatString: "MMMM DD, YYYY")
                featured_media {
                    localFile {
                        childImageSharp{
                            fluid (maxWidth: 200, quality:80){
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

        allGalleryMedia: allWordpressWpMedia(filter: {mime_type: {regex: "/image/"}}) {
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
                    fluid(maxWidth: 600) {
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
    }
`;
